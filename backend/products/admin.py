from django.conf import settings
from django.contrib import admin
from django.contrib.admin import SimpleListFilter
from parler.admin import TranslatableAdmin, TranslatableTabularInline
from parler.utils.context import switch_language

from navsite.models import Category
# Register your models here.
from .models import Product, Image, ProductAttribute, ProductVariation


# class ProductAdminForm(TranslatableModelForm):
#     """
#     Form for product translatable.
#     """
#     pass

class CategoryListFilter(SimpleListFilter):
    title = 'Category'  # A label for our filter
    parameter_name = 'category'  # You can choose any name

    def lookups(self, request, model_admin):
        # Get the active language from Parler
        active_language = request.GET.get('language', request.LANGUAGE_CODE)
        # Return a list of tuples, filtered by active language and is_catalog=True
        return [(category.id, category.get_translation(active_language).title) for category in Category.objects.filter(
            translations__language_code=active_language,
            category_type__in=['shop_grid', 'shop_list']
        )]

    def queryset(self, request, queryset):
        # Compare the requested value to decide how to filter the queryset.
        if self.value():
            return queryset.filter(category__id=self.value())

class ProductImagesInline(admin.StackedInline):
    model = Image

class ProductAttributeInline(TranslatableTabularInline):
    model = ProductAttribute
    fields = ('name', 'image')
    extra = 1

class ProductVariationInline(TranslatableTabularInline):
    model = ProductVariation
    fields = ('attribute', 'value', 'stock')
    def get_extra(self, request, obj=None, **kwargs):
        if obj:
            return 3 if obj.attributes.exists() else 0
        return 0

    def formfield_for_foreignkey(self, db_field, request=None, **kwargs):
        if db_field.name == "attribute":
            # Get the active language from Parler
            active_language = request.GET.get('language', request.LANGUAGE_CODE)

            # Prefetch related translations for better performance
            kwargs["queryset"] = ProductAttribute.objects.all().prefetch_related('translations')

            # Loop over the queryset, set the language for each object and replace
            # the string representation of each object with its translated name
            for obj in kwargs["queryset"]:
                with switch_language(obj, active_language):
                    obj.name = obj.safe_translation_getter('name', any_language=True)

        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Product)
class ProductAdmin(TranslatableAdmin):
    list_display = ['title', 'price', 'stock', 'new',
                    'available', 'sku', 'user']
    list_filter = ['available', 'user', 'new', CategoryListFilter]
    # list_editable = ['price', 'stock', 'available']
    exclude = ['user', 'rating', 'sku', 'sale_count']
    inlines = [ProductImagesInline, ProductAttributeInline, ProductVariationInline]
    # form = ProductAdminForms

    def get_queryset(self, request):
        qs = super().get_queryset(request)

        # Filter the queryset to only include products with the default language translation
        default_language = settings.LANGUAGE_CODE
        qs = qs.filter(translations__language_code=default_language).distinct()

        return qs

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # Get the active language from Parler
        active_language = request.GET.get('language', request.LANGUAGE_CODE)

        if db_field.name == "category":
            kwargs["queryset"] = Category.objects.filter(translations__language_code=active_language,
                                                         category_type__in=['shop_grid', 'shop_list']
                                                         )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_prepopulated_fields(self, request, obj=None):
        # Needed for django-parler
        return {"slug": ("title",)}

    def get_formsets_with_inlines(self, request, obj=None):
        for inline in self.get_inline_instances(request, obj):
            yield inline.get_formset(request, obj), inline

    def save_model(self, request, obj, form, change):
        if not change:
            # Set the active user as the user associated with the product
            obj.user = request.user
        super().save_model(request, obj, form, change)
