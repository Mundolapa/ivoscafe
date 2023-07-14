from django.core.management.base import BaseCommand
from django.conf import settings
import os

from sliders.models import Slider


class Command(BaseCommand):
    help = "Delete unused slider images"

    def handle(self, *args, **kwargs):
        # Get all image paths in the database
        used_images = set()
        for slider in Slider.objects.all():
            if slider.image:
                used_images.add(os.path.join(settings.MEDIA_ROOT, slider.image.name))

        # Get all image paths in the media folder
        root_dir = os.path.join(settings.MEDIA_ROOT, 'images', 'sliders')
        for dirpath, dirnames, filenames in os.walk(root_dir):
            for filename in filenames:
                file_path = os.path.join(dirpath, filename)
                if file_path not in used_images:
                    print(f"Deleting unused image file: {file_path}")
                    os.remove(file_path)

        # Remove empty directories
        for dirpath, dirnames, filenames in os.walk(root_dir, topdown=False):
            if dirpath != root_dir and not dirnames and not filenames:
                print(f"Removing empty directory: {dirpath}")
                os.rmdir(dirpath)
