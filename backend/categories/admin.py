from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin, MPTTModelAdmin
from mptt.forms import MPTTAdminForm
from parler.admin import TranslatableAdmin
from parler.forms import TranslatableModelForm
from . import models

class CategoryAdminForm(MPTTAdminForm, TranslatableModelForm):
    """
    Form for categories, both MPTT + translatable.
    """
    pass


class CategoryAdmin(DraggableMPTTAdmin, TranslatableAdmin):
    """
    Admin page for categories.
    """
    # list_display = ("title", "slug", "keywords")
    mptt_indent_field = "title"  # be explicit for MPTT
    list_display = ('tree_actions', 'indented_title')
    list_display_links = ('indented_title',)
    search_fields = ("translations__title", "translations__slug")
    form = CategoryAdminForm

    fieldsets = [
        ('Main fields', {
            'fields': (
                "title",
                "slug",
                "parent",)
        }),
        ('Description', {
            'fields': (
                "keywords",
                "description",
                "image",
                "icon",)
        }),
        ('Display', {
            'fields': (
                "order_number",
                ("url", "active_url"),
                "status",)
         }),
    ]

    def get_prepopulated_fields(self, request, obj=None):
        # Needed for django-parler
        return {"slug": ("title",)}

admin.site.register(models.Category, CategoryAdmin)
