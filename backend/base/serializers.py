from rest_framework import serializers
from .models import GlobalSettings, GlobalSettingsTranslation, ThirdPartyApiKeys
from django.utils.translation import get_language
from rest_framework.fields import SerializerMethodField
from django.contrib.sites.models import Site

current_language = get_language()
print(current_language)

class GlobalSettingsSerializer(serializers.ModelSerializer):
    third_party_api_keys = SerializerMethodField()
    site = serializers.SerializerMethodField()

    class Meta:
        model = GlobalSettings
        fields = (
            'website_title',
            'website_description',
            'website_keywords',
            'website_copyright',
            'website_footer_text',
            'website_about_us',
            'website_terms_and_conditions',
            'website_privacy_policy',
            'website_our_vision',
            'website_our_mission',
            'website_our_goals',
            'website_logo',
            'website_favicon',
            'website_email',
            'website_phone',
            'website_address',
            'website_facebook',
            'website_twitter',
            'website_instagram',
            'website_youtube',
            'website_whatsapp',
            'website_tripadvisor',
            'website_ioverlander',
            'website_linkedin',
            'website_telegram',
            'website_pinterest',
            'website_tiktok',
            'website_vimeo',
            'banner_type',
            'slider_width',
            'slider_height',
            'latitude',
            'longitude',
            'zoom',
            'default_currency',
            'free_delivery',
            'free_delivery_amount',
            'site',
            'third_party_api_keys',
        )

    def get_site(self, obj):
        return obj.site.name

    def get_third_party_api_keys(self, obj):
        third_party_api_keys = ThirdPartyApiKeys.load()
        return ThirdPartyApiKeysSerializer(third_party_api_keys).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        third_party_api_keys = representation.pop('third_party_api_keys', {})

        for key, value in third_party_api_keys.items():
            representation[key] = value

        return representation

class ThirdPartyApiKeysSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThirdPartyApiKeys
        fields = (
            'google_maps_api_key',
            'google_analytics_api_key',
            'twilio_sendgrid_api_key',
            'twilio_sendgrid_sender_email',
            'twilio_sendgrid_sender_name',
            'twilio_account_sid',
            'twilio_auth_token',
            'exchange_rate_api_key',
        )
