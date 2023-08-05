import os
from uuid import uuid4
from io import BytesIO

from PIL import Image
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage as storage
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from ordered_model.models import OrderedModel
from parler.fields import TranslatedField
from parler.models import TranslatableModel, TranslatedFieldsModel

from base.managers import OrderedTranslatableManager
from base.models import GlobalSettings


def get_banner_type():
    settings = GlobalSettings.objects.first()
    return settings.banner_type if settings else None

def banner_directory_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    new_filename = f"B_{instance.banner_type}_{uuid4()}{extension}"
    return f'images/banners/{new_filename}'

BANNER_WIDTHS = {
        'Three': 570,
        'Eleven': 960,
        'Seventeen': 875,
        'Four': 362,
        'Fifteen': 626,
        'Ten': 373,
        'Six': 575,
        'Five': 580,
    }

BANNER_HEIGHTS = {
        'Three': 347,
        'Eleven': 300,
        'Seventeen': 300,
        'Four': 207,
        'Fifteen': 310,
        'Ten': 215,
        'Six': 295,
        'Five': 295,
    }

BANNER_HEIGHTS_PROMO = {
    'Five': 610,  # Your desired promo height for 'Five'
    'Six': 610,  # Your desired promo height for 'Six'
}

class Banner(OrderedModel, TranslatableModel):
    title = TranslatedField(any_language=True)

    link = models.CharField(max_length=120, blank=True, null=True)
    image = models.ImageField(upload_to=banner_directory_path, blank=True)
    price = models.DecimalField(_("price"), max_digits=15, decimal_places=2, default=99.99)
    promo = models.BooleanField(_("promo"), default=False)
    discount = models.DecimalField(_("discount"), max_digits=15, decimal_places=2, default=0.05)
    public = models.BooleanField(_("public"), default=True)
    banner_type = models.CharField(_("banner_type"), max_length=16, default=get_banner_type)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    order = models.PositiveIntegerField(editable=False, db_index=True)

    objects = OrderedTranslatableManager()

    def save(self, *args, **kwargs):
        update_image_field = kwargs.pop('update_image_field', True)
        super().save(*args, **kwargs)  # First save the model to get an image
        # Check if an image is present, if it has been resized, and whether we are updating the image field
        if self.image and '_resized' not in self.image.name and update_image_field:
            # Store the original image name
            original_image_name = self.image.name
            # img = Image.open(self.image.path)
            # Open the image file as a PIL image object
            img = Image.open(self.image.open(mode='rb'))

            if self.banner_type in ['Five', 'Six'] and self.promo:
                desired_height = BANNER_HEIGHTS_PROMO.get(self.banner_type, 610)  # Adjust this according to your needs
                aspect_ratio = img.width / img.height
                new_width = int(desired_height * aspect_ratio)
                img = img.resize((new_width, desired_height), Image.LANCZOS)

                desired_width = BANNER_WIDTHS.get(self.banner_type, 570)  # Default to 570 if banner_type is not found

                # If the width is larger than the desired width, crop to center
                if new_width > desired_width:
                    left = (new_width - desired_width) / 2
                    right = (new_width + desired_width) / 2
                    img = img.crop((left, 0, right, desired_height))
            else:
                desired_width = BANNER_WIDTHS.get(self.banner_type, 570)  # Default to 570 if banner_type is not found
                aspect_ratio = img.height / img.width

                new_height = int(desired_width * aspect_ratio)
                img = img.resize((desired_width, new_height), Image.LANCZOS)

                desired_height = BANNER_HEIGHTS.get(self.banner_type, 347)  # Default to 347 if banner_type is not found

                # If the height is larger than the desired height, crop to center
                if new_height > desired_height:
                    top = (new_height - desired_height) / 2
                    bottom = (new_height + desired_height) / 2
                    img = img.crop((0, top, desired_width, bottom))

            img = img.convert('RGB')
            # img.save(self.image.path)
            img_io = BytesIO()
            img.save(img_io, format='JPEG', quality=60)
            img_content = ContentFile(img_io.getvalue())

            # Create a new name for the resized image
            # This name includes '_resized' and the '.jpeg' extension
            new_image_name = f"{self.image.name.rsplit('.', 1)[0]}_resized.jpeg"

            # Save the new image to the storage
            storage.save(new_image_name, img_content)

            # Delete the original image file
            if storage.exists(original_image_name):
                storage.delete(original_image_name)

            # Update the image field's name attribute in the database
            self.image.name = new_image_name
            # Pass update_image_field=True to avoid recursive call
            self.save(update_image_field=False, update_fields=['image'])


    def __str__(self):
        return self.safe_translation_getter("title", any_language=True) or "Untitled Banner"

    def is_public(self) -> models.BooleanField:
        return self.public  # True or False

    def is_promo(self) -> models.BooleanField:
        return self.promo  # True or False


class BannerTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(Banner, on_delete=models.CASCADE, related_name='translations')
    title = models.CharField(_("title"), max_length=60, blank=True, null=True)
    banner_text = models.CharField(_("promo_text"), max_length=60, blank=True, null=True)
    button_text = models.CharField(_("button_text"), max_length=24, blank=True, null=True)

    class Meta:
        unique_together = [('language_code', 'master', 'id')]
        indexes = [models.Index(fields=['id', 'language_code'])]

    def __str__(self):
        return self.title

@receiver(post_delete, sender=Banner)
def delete_banner_image(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)