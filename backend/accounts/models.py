from io import BytesIO

from PIL import Image
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage as storage
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/images/profile_pics/user_<id>/<filename>
    return f"images/avatars/user_{instance.user.id}/{filename}"

class Profile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('NS', 'Not Specified'),
        ('P', 'Prefer not to say'),
    ]
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=user_directory_path, default='images/avatars/default.png')
    mobile = models.CharField(max_length=15, blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES, default='NS')

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        update_image_field = kwargs.pop('update_image_field', True)
        super().save(*args, **kwargs)
        # Check if an image is present, if it has been resized, and whether we are updating the image field
        if self.image and '_thumbnail' not in self.image.name and update_image_field:
            # Store the original image name
            original_image_name = self.image.name
            # img = Image.open(self.image.path)
            # Open the image file as a PIL image object
            img = Image.open(self.image.open(mode='rb'))

            # Check if the image is larger than 300x300
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size, Image.LANCZOS)

            img = img.convert('RGB')
            # img.save(self.image.path)
            img_io = BytesIO()
            img.save(img_io, format='JPEG', quality=60)
            img_content = ContentFile(img_io.getvalue())

            # Create a new name for the resized image
            # This name includes '_resized' and the '.jpeg' extension
            new_image_name = f"{self.image.name.rsplit('.', 1)[0]}_thumbnail.jpeg"

            # Save the new image to the storage
            storage.save(new_image_name, img_content)

            # Delete the original image file
            if storage.exists(original_image_name):
                storage.delete(original_image_name)

            # Update the image field's name attribute in the database
            self.image.name = new_image_name
            # Pass update_image_field=True to avoid recursive call
            self.save(update_image_field=False, update_fields=['image'])


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Address(models.Model):
    COUNTRY = (
        ('BZ', 'Belize'),
        ('GT', 'Guatemala'),
        ('ES', 'El Salvador'),
        ('HN', 'Honduras'),
        ('NI', 'Nicaragua'),
        ('CR', 'Costa Rica'),
        ('PA', 'Panamá'),
        ('RD', 'República Dominicana')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    street2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state_province = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    country = models.CharField(max_length=4, choices=COUNTRY, default='HN')

    def __str__(self):
        return f'{self.street}, {self.city}, {self.state_province}, {self.zip_code}, {self.get_country_display()}'

    class Meta:
        verbose_name_plural = "Addresses"



class PaymentOption(models.Model):
    PAYMENT_CHOICES = (
        ('Credit Card', 'Credit Card'),
        ('PixelPay', 'PixelPay'),
        ('Paypal', 'Paypal'),
        ('Stripe', 'Stripe'),
        ('Cash', 'Cash'),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    preferred_payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='Credit Card')
    billing_address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.user.username} - {self.preferred_payment_method}'


class StripeCustomer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stripeCustomerId = models.CharField(max_length=255)
    defaultPaymentMethod = models.CharField(max_length=255)


class PayPalUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payerId = models.CharField(max_length=255)
