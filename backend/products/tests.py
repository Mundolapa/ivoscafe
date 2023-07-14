from django.test import TestCase
from django.contrib.auth.models import User
from navsite.models import Category
from .models import Product, ProductTranslation, Image

class ProductModelTest(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.category = Category.objects.create(name='TestCategory')

        self.product = Product.objects.create(
            user=self.user,
            category=self.category,
            stock=10,
            available=True,
            price=99.99,
            public=True
        )

    def test_product_creation(self):
        self.assertEqual(self.product.user, self.user)
        self.assertEqual(self.product.category, self.category)
        self.assertEqual(self.product.stock, 10)
        self.assertEqual(self.product.available, True)
        self.assertEqual(self.product.price, 99.99)
        self.assertEqual(self.product.public, True)

    def test_product_translation_creation(self):
        product_translation = ProductTranslation.objects.create(
            master=self.product,
            language_code='en',
            title='Test Product',
            slug='test-product',
            keywords='test, product',
            short_description='A test product.',
            description='This is a test product for demonstration purposes.'
        )

        self.assertEqual(product_translation.master, self.product)
        self.assertEqual(product_translation.language_code, 'en')
        self.assertEqual(product_translation.title, 'Test Product')
        self.assertEqual(product_translation.slug, 'test-product')
        self.assertEqual(product_translation.keywords, 'test, product')
        self.assertEqual(product_translation.short_description, 'A test product.')
        self.assertEqual(product_translation.description, 'This is a test product for demonstration purposes.')

    def test_image_creation(self):
        image = Image.objects.create(
            product=self.product,
            image='images/products/1/test.jpg'
        )

        self.assertEqual(image.product, self.product)
        self.assertEqual(image.image, 'images/products/1/test.jpg')

