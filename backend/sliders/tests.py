from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from sliders.models import Slider, SliderTranslation
import os

class SliderModelTest(TestCase):
    def setUp(self):
        # Create a dummy image file
        self.dummy_image = SimpleUploadedFile(
            name='test_image.jpg',
            content=open('path_to_some_dummy_image.jpg', 'rb').read(),
            content_type='image/jpeg'
        )

    def test_slider_creation(self):
        slider = Slider.objects.create(
            url='test-url',
            image=self.dummy_image,
            image_position='center',
            public=True,
        )
        self.assertEqual(slider.url, 'test-url')
        self.assertEqual(slider.image_position, 'center')
        self.assertEqual(slider.public, True)

    def test_image_resizing(self):
        slider = Slider.objects.create(
            url='test-url',
            image=self.dummy_image,
            image_position='center',
            public=True,
        )
        # Here you can test whether image resizing happens as expected
        # However, this will require having a real image file and checking its dimensions after save

    def test_image_deletion(self):
        slider = Slider.objects.create(
            url='test-url',
            image=self.dummy_image,
            image_position='center',
            public=True,
        )
        image_path = slider.image.path
        slider.delete()
        self.assertFalse(os.path.isfile(image_path))

class SliderTranslationModelTest(TestCase):
    def test_slider_translation_creation(self):
        slider = Slider.objects.create(
            url='test-url',
            image_position='center',
            public=True,
        )
        slider_translation = SliderTranslation.objects.create(
            master=slider,
            title='Test Title',
            subtitle='Test Subtitle',
            button_text='Test Button Text',
        )
        self.assertEqual(slider_translation.title, 'Test Title')
        self.assertEqual(slider_translation.subtitle, 'Test Subtitle')
        self.assertEqual(slider_translation.button_text, 'Test Button Text')
