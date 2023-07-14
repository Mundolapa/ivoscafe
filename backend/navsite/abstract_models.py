from django.contrib.sites.models import Site
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from mptt.managers import TreeManager
from parler.fields import TranslatedField
from parler.models import TranslatableModel, TranslatedFieldsModel
from parler.utils.context import switch_language

from .managers import CategoryAdminManager


def _get_current_site():
    return Site.objects.get_current().pk


class CategoryManager(TreeManager):
    def viewable(self):
        queryset = self.get_queryset().filter(level=0)
        return queryset

def category_image_path(instance, filename):
    return f"images/categories/{instance.category.id}/{filename}"

CATEGORY_TYPES = [
    ('container', _('Container')),
    # ('blog', 'Blog'),
    ('shop_grid', _('Shop Grid')),
    ('shop_list', _('Shop List')),
    ('external_link', _('External Link')),
    # ('image_gallery', 'Image Gallery'),
    # add more types as needed
]

class AbstractCategory(MPTTModel, TranslatableModel):
    """
    Base class for navsite.
    """
    title = TranslatedField(any_language=True)
    slug = TranslatedField()  # Explicitly added, but not needed
    image = models.ImageField(_("image"), upload_to=category_image_path, blank=True)
    icon = models.CharField(_("icon"), max_length=50, blank=True)
    url = models.CharField(_("url"), max_length=120, blank=True, null=True)
    public = models.BooleanField(_("public"), default=True)
    created = models.DateTimeField(_("created"), auto_now_add=True)
    updated = models.DateTimeField(_("updated"), auto_now=True)
    category_type = models.CharField(_("category type"), max_length=50, choices=CATEGORY_TYPES, default='shop_grid')

    parent = TreeForeignKey(
        "self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="children",
        verbose_name=_("Parent"),
    )
    site = models.ForeignKey(
        Site,
        on_delete=models.CASCADE,
        editable=False,
        blank=True,
        null=True,
        default=_get_current_site,
    )

    objects = CategoryAdminManager()
    parents = CategoryManager()


    class Meta:
        abstract = True
        ordering = ("tree_id", "lft")

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True)

    def get_absolute_url(self):
        # Make sure i18n_patterns() generate the proper URL, when used.
        with switch_language(self):
            return reverse("navsite:category_detail", kwargs={"slug": self.slug})


class AbstractCategoryTranslation(TranslatedFieldsModel):
    """
    Base class for translated fields.
    """

    title = models.CharField(_("title"), max_length=255)
    slug = models.SlugField(
        _("slug"),
        max_length=100,
        help_text=_("The slug is used in the URL of the page"),
    )
    keywords = models.CharField(_("keywords"), max_length=255, blank=True)
    description = models.CharField(_("description"), max_length=255, blank=True)

    # The ForeignKey to the shared model. Needs to be defined in the concrete class.
    master = None

    class Meta:
        abstract = True
        unique_together = [("language_code", "slug")]

    def __str__(self):
        return self.title
