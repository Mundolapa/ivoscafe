import base64
import time
import uuid
from decimal import Decimal

from PIL import Image as PilImage
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from parler.fields import TranslatedField
from parler.models import TranslatableModel, TranslatedFieldsModel

from navsite.models import Category

User = settings.AUTH_USER_MODEL  # auth.User

# TAGS_MODEL_VALUES = ['electronics', 'cars', 'boats', 'movies', 'cameras']


# class ProductQuerySet(models.QuerySet):
#     def is_public(self):
#         return self.filter(public=True)
#
#     def search(self, query, user=None):
#         lookup = models.Q(title__icontains=query) | models.Q(content__icontains=query)
#         qs = self.is_public().filter(lookup)
#         if user is not None:
#             qs2 = self.filter(user=user).filter(lookup)
#             qs = (qs | qs2).distinct()
#         return qs
#
#
# class ProductManager(models.Manager):
#     def get_queryset(self, *args, **kwargs):
#         return ProductQuerySet(self.model, using=self._db)
#
#     def search(self, query, user=None):
#         return self.get_queryset().search(query, user=user)

# def get_catalog_categories():
#     return Category.objects.filter(is_catalog=True)

def generate_sku():
    # Generate a UUID
    original_uuid = uuid.uuid4()
    # Convert the UUID to bytes
    uuid_bytes = original_uuid.bytes
    # Encode the bytes in base64 and remove the trailing ==
    short_uuid = base64.urlsafe_b64encode(uuid_bytes).rstrip(b'=').decode('utf-8')
    # Add "PROD_" before the short UUID
    sku = "PROD_" + short_uuid
    return sku

class Product(TranslatableModel):
    title = TranslatedField(any_language=True)

    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(Category, on_delete=models.CASCADE) #many to one relation with Category
    stock = models.PositiveIntegerField(_("Stock"), default=0)
    new = models.BooleanField(_("New"), default=False)
    available = models.BooleanField(_("Available"), default=True)
    price = models.DecimalField(_("Price"), max_digits=15, decimal_places=2, default=99.99)
    discount = models.PositiveIntegerField(_("Discount"), default=0)
    public = models.BooleanField(_("Public"), default=True)
    sku = models.CharField(_("Sku"), max_length=30, default=generate_sku, unique=True)
    rating = models.DecimalField(_("Rating"), max_digits=3, decimal_places=2, default=0.00)
    offer_end = models.DateTimeField(_("Offer end"), null=True, blank=True)
    affiliate_link = models.URLField(_("Affiliate link"), null=True, blank=True)
    sale_count = models.PositiveIntegerField(_("Sale count"), default=0)
    created = models.DateTimeField(_("Created"), auto_now_add=True)
    updated = models.DateTimeField(_("Updated"), auto_now=True)

    # objects = ProductManager()

    class Meta:
        ordering = ('translations__title',)
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True)

    def get_absolute_url(self):
        return f"/api/products/{self.pk}/"

    # def get_absolute_url(self):
    #     return reverse('catalog:product_detail',
    #                    args=[self.id, self.slug])

    @property
    def endpoint(self):
        return self.get_absolute_url()

    @property
    def path(self):
        return f"/products/{self.pk}/"


    def is_public(self) -> models.BooleanField:
        return self.public  # True or False

    # @property
    # def get_tags_list(self):
    #     return [random.choice(TAGS_MODEL_VALUES)]
    #
    @property
    def get_discount(self):
        return Decimal(self.price) * Decimal(self.discount) / 100

    #
    # def get_discount(self):
    #     return "122"

class ProductTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='translations')
    title = models.CharField(_("Title"), max_length=120)
    slug = models.SlugField(_("Slug"), max_length=200, db_index=True)
    keywords = models.CharField(_("Keywords"), max_length=255, blank=True)
    short_description = models.CharField(_("Short Description"), max_length=200, blank=True)
    description = RichTextUploadingField(_("Description"), blank=True, default='')
    additional_info = RichTextUploadingField(_("Additional information"), blank=True, default='')

    class Meta:
        unique_together = [('language_code', 'master', 'slug')]
        indexes = [models.Index(fields=['slug', 'language_code'])]

    def __str__(self):
        return self.title

    @property
    def body(self):
        return self.description

def resize_and_center_image(image, target_width=600, target_height=800, quality=60):
    img = PilImage.open(image.path)

    # Resize the image while maintaining aspect ratio
    if img.width < img.height:
        baseheight = target_height
        hpercent = baseheight / float(img.height)
        wsize = int((float(img.width) * float(hpercent)))
        img = img.resize((wsize, baseheight), PilImage.ANTIALIAS)
    else:
        basewidth = target_width
        wpercent = basewidth / float(img.width)
        hsize = int((float(img.height) * float(wpercent)))
        img = img.resize((basewidth, hsize), PilImage.ANTIALIAS)

    # Create a new image with white background
    new_img = PilImage.new("RGB", (target_width, target_height), "white")

    # Paste the resized image into the center of this new image
    new_img.paste(img, ((target_width - img.width) // 2, (target_height - img.height) // 2))

    # Save the modified image to the path of the uploaded image with reduced quality
    new_img.save(image.path, quality=quality)

def product_image_path(instance, filename):
    return f"images/products/{instance.product.id}/{filename}"

class Image(models.Model):
    product = models.ForeignKey(Product,
                                default=None,
                                related_name='images',
                                on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_path,
                              blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            resize_and_center_image(self.image)

    def __str__(self):
        return self.image.url


def attribute_image_path(instance, filename):
    timestamp = int(time.time())
    return f"images/products/{instance.product.id}/attributes/{timestamp}/{filename}"


class ProductAttribute(TranslatableModel):
    name = TranslatedField(any_language=True)
    product = models.ForeignKey(Product, related_name='attributes', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=attribute_image_path, null=True, blank=True)  # The attribute image

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            resize_and_center_image(self.image)

    def __str__(self):
        return self.safe_translation_getter("name", any_language=True)


class ProductAttributeTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE, related_name='translations')
    name = models.CharField(max_length=255)

    class Meta:
        unique_together = [('language_code', 'master')]

    def __str__(self):
        return self.name


class ProductVariation(TranslatableModel):
    value = TranslatedField(any_language=True)
    product = models.ForeignKey(Product, related_name='variations', on_delete=models.CASCADE)
    attribute = models.ForeignKey(ProductAttribute, related_name='variations', on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)  # The stock of this specific variation

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Call the "real" save() method.
        self.product.stock = sum(
            variation.stock for variation in self.product.variations.all()
        )
        self.product.save()

    def __str__(self):
        return self.safe_translation_getter("value", any_language=True)


class ProductVariationTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(ProductVariation, on_delete=models.CASCADE, related_name='translations')
    value = models.CharField(max_length=255)

    class Meta:
        unique_together = [('language_code', 'master', 'value')]
