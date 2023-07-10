from django.contrib import admin
from .models import Banner, GlobalSettings
from ordered_model.admin import OrderedModelAdmin
from parler.admin import TranslatableAdmin
from django.utils.translation import gettext_lazy as _, get_language


@admin.register(Banner)
class BannerAdmin(OrderedModelAdmin, TranslatableAdmin):
    list_display = ['title_current_language', 'public', 'banner_type_display', 'created', 'updated',
                    'move_up_down_links']
    list_filter = ['public', 'promo', 'banner_type']
    list_editable = ['public']
    exclude = ['banner_type']

    def title_current_language(self, obj):
        return obj.safe_translation_getter("title", language_code=get_language())

    def banner_type_display(self, obj):
        # Create a dictionary from BANNER_TYPE_CHOICES
        choices_dict = dict(GlobalSettings.BANNER_TYPE_CHOICES)
        return choices_dict.get(obj.banner_type, '')

    title_current_language.short_description = _("Title")
    banner_type_display.short_description = _("Banner Type")  # Set column name
