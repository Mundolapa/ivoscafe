from django.contrib.sites.models import Site
from django.test import TestCase
from django.urls import reverse
from mptt.models import TreeForeignKey
from navsite.models import AbstractCategory


class TestAbstractCategory(TestCase):
    def setUp(self):
        self.category = AbstractCategory.objects.create(
            title="Test Category",
            slug="test-category",
            parent=None,
            site=Site.objects.get_current(),
        )

    def test_str(self):
        self.assertEqual(str(self.category), "Test Category")

    def test_get_absolute_url(self):
        url = reverse("navsite:category_detail", kwargs={"slug": "test-category"})
        self.assertEqual(self.category.get_absolute_url(), url)

    def test_parent(self):
        parent = AbstractCategory.objects.create(
            title="Parent Category",
            slug="parent-category",
            parent=None,
            site=Site.objects.get_current(),
        )
        self.category.parent = parent
        self.category.save()
        self.assertEqual(self.category.parent, parent)

    def test_site(self):
        self.assertEqual(self.category.site, Site.objects.get_current())

    def test_parent_relation(self):
        parent = AbstractCategory.objects.create(
            title="Parent Category",
            slug="parent-category",
            parent=None,
            site=Site.objects.get_current(),
        )
        child = AbstractCategory.objects.create(
            title="Child Category",
            slug="child-category",
            parent=parent,
            site=Site.objects.get_current(),
        )
        self.assertIn(child, parent.children.all())
        self.assertEqual(child.parent, parent)
