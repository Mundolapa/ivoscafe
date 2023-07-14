from django.contrib import admin
from django.utils.translation import gettext_lazy as _, get_language
from ordered_model.admin import OrderedModelAdmin
from parler.admin import TranslatableAdmin

from sliders.models import Slider


@admin.register(Slider)
class SliderAdmin(OrderedModelAdmin, TranslatableAdmin):
    list_display = ['title_current_language', 'url', 'image', 'public', 'created', 'updated', 'move_up_down_links']
    list_filter = ['public']
    list_editable = ['public']

    def title_current_language(self, obj):
        return obj.safe_translation_getter("title", language_code=get_language())

    title_current_language.short_description = _("Title")
