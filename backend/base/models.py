from django.contrib.sites.models import Site
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models
# from parler.fields import TranslatedField
from django.utils.translation import gettext_lazy as _
from parler.models import TranslatableModel, TranslatedFieldsModel


class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def set_cache(self):
        cache.set(self.__class__.__name__, self)

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)
        self.set_cache()

    def delete(self, *args, **kwargs):
        pass


class GlobalSettings(SingletonModel, TranslatableModel):
    BANNER_TYPE_CHOICES = (
        ('Three', 'Two Banners'),
        ('Eleven', 'Two Attached Mirror Banners'),
        ('Seventeen', 'Two Separated Mirror Banners'),
        ('Four', 'Three Small Banners'),
        ('Fifteen', 'Three Big Banners'),
        ('Ten', 'Four Banners'),
        ('Six', 'Three Banners with Promo'),
        ('Five', 'Five Banners with Promo'),
    )
    CURRENCY_CHOICES = (
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('HNL', 'Lempira'),
    )
    website_logo = models.ImageField(upload_to='images/logo/', blank=True)
    website_favicon = models.FileField(upload_to='images/favicon/', blank=True)
    website_email = models.EmailField(max_length=120, blank=True, null=True)
    website_phone = models.CharField(max_length=120, blank=True, null=True)
    website_address = models.CharField(max_length=120, blank=True, null=True)
    website_facebook = models.CharField(max_length=120, blank=True, null=True)
    website_twitter = models.CharField(max_length=120, blank=True, null=True)
    website_instagram = models.CharField(max_length=120, blank=True, null=True)
    website_youtube = models.CharField(max_length=120, blank=True, null=True)
    website_whatsapp = models.CharField(max_length=120, blank=True, null=True)
    website_tripadvisor = models.CharField(max_length=120, blank=True, null=True)
    website_ioverlander = models.CharField(max_length=120, blank=True, null=True)
    website_linkedin = models.CharField(max_length=120, blank=True, null=True)
    website_telegram = models.CharField(max_length=120, blank=True, null=True)
    website_pinterest = models.CharField(max_length=120, blank=True, null=True)
    website_tiktok = models.CharField(max_length=120, blank=True, null=True)
    website_vimeo = models.CharField(max_length=120, blank=True, null=True)
    banner_type = models.CharField(max_length=16, choices=BANNER_TYPE_CHOICES, default='Four')
    slider_width = models.CharField(max_length=6, blank=True, null=True, default='1780')
    slider_height = models.CharField(max_length=6, blank=True, null=True, default='750')
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    zoom = models.IntegerField(blank=True, null=True, default='12')
    default_currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    free_delivery = models.BooleanField(default=False)
    free_delivery_amount = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    site = models.ForeignKey(Site, on_delete=models.CASCADE, default=1)

    @classmethod
    def load(cls):
        if cache.get(cls.__name__) is None:
            obj, created = cls.objects.get_or_create(pk=1)
            if not created:
                obj.set_cache()
        return cache.get(cls.__name__)

    def save(self, *args, **kwargs):
        # Define the maximum size in bytes
        max_logo_size = 500 * 1024  # 500KB
        max_favicon_size = 50 * 1024  # 50KB

        if self.website_logo:
            if self.website_logo.file.size > max_logo_size:
                raise ValidationError("The logo file is too large ( > 500KB)")

        if self.website_favicon:
            if self.website_favicon.file.size > max_favicon_size:
                raise ValidationError("The favicon file is too large ( > 50KB)")

        super().save(*args, **kwargs)

    def __str__(self):
        return "Global Settings"

    class Meta:
        verbose_name = _("Global Settings")
        verbose_name_plural = _("Global Settings")

class GlobalSettingsTranslation(TranslatedFieldsModel):
    master = models.ForeignKey(GlobalSettings, related_name='translations', on_delete=models.CASCADE)
    website_title = models.CharField(max_length=120, blank=True, null=True)
    website_description = models.TextField(blank=True, null=True)
    website_keywords = models.CharField(max_length=255, blank=True, null=True)
    website_copyright = models.CharField(max_length=120, blank=True, null=True)
    website_footer_text = models.TextField(blank=True, null=True)
    website_about_us = models.TextField(blank=True, null=True)
    website_terms_and_conditions = models.TextField(blank=True, null=True)
    website_privacy_policy = models.TextField(blank=True, null=True)
    website_our_vision = models.TextField(blank=True, null=True)
    website_our_mission = models.TextField(blank=True, null=True)
    website_our_goals = models.TextField(blank=True, null=True)


    class Meta:
        unique_together = [('language_code', 'master', 'id')]
        indexes = [models.Index(fields=['id', 'language_code'])]


class ThirdPartyApiKeys(SingletonModel):
    google_maps_api_key = models.CharField(max_length=120, blank=True, null=True)
    google_analytics_api_key = models.CharField(max_length=120, blank=True, null=True)
    twilio_sendgrid_api_key = models.CharField(max_length=120, blank=True, null=True)
    twilio_sendgrid_sender_email = models.CharField(max_length=120, blank=True, null=True)
    twilio_sendgrid_sender_name = models.CharField(max_length=120, blank=True, null=True)
    twilio_account_sid = models.CharField(max_length=120, blank=True, null=True)
    twilio_auth_token = models.CharField(max_length=120, blank=True, null=True)
    exchange_rate_api_key = models.CharField(max_length=120, blank=True, null=True)

    @classmethod
    def load(cls):
        if cache.get(cls.__name__) is None:
            obj, created = cls.objects.get_or_create(pk=1)
            if not created:
                obj.set_cache()
        return cache.get(cls.__name__)

    def __str__(self):
        return "Third Party Api Keys"

    class Meta:
        verbose_name = _("Third Party Api Keys")
        verbose_name_plural = _("Third Party Api Keys")