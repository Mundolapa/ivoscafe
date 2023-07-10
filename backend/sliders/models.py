import os
import time

from PIL import Image, ImageOps
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from ordered_model.models import OrderedModel
from parler.fields import TranslatedField
from parler.models import TranslatableModel, TranslatedFieldsModel

from base.managers import OrderedTranslatableManager
from base.models import GlobalSettings


def get_slider_width_height():
    settings = GlobalSettings.load()
    slider_width = int(settings.slider_width)
    slider_height = int(settings.slider_height)
    return slider_width, slider_height

def slider_image_path(instance, filename):
    timestamp = int(time.time())
    return f"images/sliders/{timestamp}/{filename}"

def get_max_order_value():
    return Slider.objects.count()

class Slider(OrderedModel, TranslatableModel):
    IMAGE_POSITION_CHOICES = [
        ('center', _('Center')),
        ('left', _('Left')),
        ('right', _('Right')),
        ('full', _('Full Image')),
    ]
    title = TranslatedField(any_language=True)

    url = models.CharField(_("url"), max_length=120, blank=True, null=True)
    image = models.ImageField(_("image"), upload_to=slider_image_path, blank=True)
    image_position = models.CharField(_("image position"), max_length=6, choices=IMAGE_POSITION_CHOICES,
                                      default='center')
    public = models.BooleanField(_("public"), default=True)
    created = models.DateTimeField(_("created"), auto_now_add=True)
    updated = models.DateTimeField(_("updated"), auto_now=True)
    order = models.PositiveIntegerField(editable=False, db_index=True)

    objects = OrderedTranslatableManager()

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True) or "Untitled Slider"

    def is_public(self) -> models.BooleanField:
        return self.public  # True or False

class SliderTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(Slider, on_delete=models.CASCADE, related_name='translations')
    title = models.CharField(_("title"), max_length=60, blank=True, null=True)
    subtitle = models.CharField(_("subtitle"), max_length=120, blank=True, null=True)
    button_text = models.CharField(_("button_text"), max_length=24, blank=True, null=True)

    class Meta:
        unique_together = [('language_code', 'master', 'id')]
        indexes = [models.Index(fields=['id', 'language_code'])]

    def __str__(self):
        return self.title

@receiver(post_save, sender=Slider)
def resize_image(sender, instance, **kwargs):

    if instance.image:
        img = Image.open(instance.image.path)
        width, height = get_slider_width_height()

        # Check if the image is wider than the global width or if the position is 'full'
        if img.width > width or instance.image_position == 'full':
            img = img.resize((width, int(img.height * (width / img.width))), Image.ANTIALIAS)

            # If the height exceeds global height, crop from the center.
            if img.height > height:
                top = (img.height - height) // 2
                bottom = top + height
                img = img.crop((0, top, width, bottom))

        elif img.width <= width and img.height <= height:
            # Create a new canvas if the image is smaller than the global width and height
            canvas = Image.new('RGBA', (width, height), (255, 255, 255, 0))

            # Adjust x based on image position
            if instance.image_position == 'center':
                x = (width - img.width) // 2
            elif instance.image_position == 'left':
                x = 0
            else:  # 'right'
                x = width - img.width

            y = (height - img.height) // 2
            canvas.paste(img, (x, y))
            img = canvas

        else:
            # For all other cases, resize and fit the image to the global width and height
            img = img.resize((width, height), Image.ANTIALIAS)
            img = ImageOps.fit(img, (width, height), Image.ANTIALIAS)

        img.save(instance.image.path, quality=60)

@receiver(post_delete, sender=Slider)
def delete_image(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)
