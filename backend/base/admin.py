from django.contrib import admin
from parler.admin import TranslatableAdmin
from django.urls import path
from django.shortcuts import redirect
from .models import GlobalSettings, ThirdPartyApiKeys

@admin.register(GlobalSettings)
class GlobalSettingsAdmin(TranslatableAdmin):
    fieldsets = [
        ('Multi-language fields', {
            'fields': (
                "website_title",
                "website_description",
                "website_keywords",
                "website_copy_right",
                "website_footer_text",
            )
        }),
        ('Website elements', {
            'fields': (
                "website_logo",
                "website_favicon",
                "website_email",
                "website_phone",
                "website_address",
                "banner_type",
                "slider_width",
                "slider_height",
                "latitude",
                "longitude",
                "zoom",
                "default_currency",
                "free_delivery",
                "free_delivery_amount",
            )
        }),
        ('Social networks', {
            'fields': (
                "website_facebook",
                "website_twitter",
                "website_instagram",
                "website_youtube",
                "website_whatsapp",
                "website_tripadvisor",
                "website_ioverlander",
                "website_linkedin",
                "website_telegram",
                "website_pinterest",
                "website_tiktok",
                "website_vimeo",
            )
        }),
    ]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('', self.admin_site.admin_view(self.redirect_to_edit_global_settings), name='globalsettings_redirect'),
        ]
        return custom_urls + urls

    def redirect_to_edit_global_settings(self, request):
        settings = GlobalSettings.load()
        return redirect(f'../globalsettings/{settings.id}/change')

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(GlobalSettingsAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

@admin.register(ThirdPartyApiKeys)
class ThirdPartyApiKeysAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Google Maps', {
            'fields': (
                "google_maps_api_key",
                "google_analytics_api_key",
            )
        }),
        ('Twilio', {
            'fields': (
                "twilio_sendgrid_api_key",
                "twilio_sendgrid_sender_email",
                "twilio_sendgrid_sender_name",
                "twilio_account_sid",
                "twilio_auth_token",
            )
        }),
        ('Exchange Rates', {
            'fields': (
                "exchange_rate_api_key",
            )
        })
    ]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('', self.admin_site.admin_view(self.redirect_to_edit_third_party_api_keys), name='thirdpartyapikeys_redirect'),
        ]
        return custom_urls + urls

    def redirect_to_edit_third_party_api_keys(self, request):
        settings = ThirdPartyApiKeys.load()
        return redirect(f'../thirdpartyapikeys/{settings.id}/change')

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super(ThirdPartyApiKeysAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
