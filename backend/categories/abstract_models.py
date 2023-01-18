from django.contrib.sites.models import Site
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from parler.fields import TranslatedField
from parler.models import TranslatableModel, TranslatedFieldsModel
from parler.utils.context import switch_language

from .managers import CategoryManager


def _get_current_site():
    return Site.objects.get_current().pk


class AbstractCategory(MPTTModel, TranslatableModel):
    """
    Base class for categories.
    """
    title = TranslatedField(any_language=True)
    slug = TranslatedField()  # Explicitly added, but not needed

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

    objects = CategoryManager()

    class Meta:
        abstract = True
        ordering = ("tree_id", "lft")

    def __str__(self):
        return self.safe_translation_getter("title", any_language=True)

    def get_absolute_url(self):
        # Make sure i18n_patterns() generate the proper URL, when used.
        with switch_language(self):
            return reverse("main:category_detail", kwargs={"slug": self.slug})


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
    image = models.ImageField(_("image"), upload_to='category_images', blank=True)
    icon = models.CharField(_("icon"), max_length=50, blank=True)
    order_number = models.IntegerField(_("order_number"), default=0)
    url = models.CharField(_("url"), max_length=120, blank=True, null=True)
    status = models.BooleanField(_("status"), default=True)
    active_url = models.BooleanField(_("active_url"), default=True)
    created = models.DateTimeField(_("created"), auto_now_add=True)
    updated = models.DateTimeField(_("updated"), auto_now=True)

    # The ForeignKey to the shared model. Needs to be defined in the concrete class.
    master = None

    class Meta:
        abstract = True
        unique_together = [("language_code", "slug")]