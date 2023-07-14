import time
from PIL import Image
from django.db import models

class Timer(models.Model):
    title = models.CharField(max_length=120, blank=True, null=True)
    days = models.PositiveIntegerField(default=0)
    hours = models.PositiveIntegerField(default=0)
    minutes = models.PositiveIntegerField(default=0)
    seconds = models.PositiveIntegerField(default=0)
    active = models.BooleanField(default=False)

    def is_active(self) -> models.BooleanField:
        return self.active  # True or False

    def time_left(self):
        return self.days * 24 * 60 * 60 + self.hours * 60 * 60 + self.minutes * 60 + self.seconds

    def set_time_left(self, seconds):
        self.days = seconds // (24 * 60 * 60)
        seconds %= 24 * 60 * 60
        self.hours = seconds // (60 * 60)
        seconds %= 60 * 60
        self.minutes = seconds // 60
        self.seconds = seconds % 60
        self.save()


def cd_image_path(instance, filename):
    timestamp = int(time.time())
    return f"images/countdowns/{timestamp}/{filename}"

class Countdown(models.Model):
    title = models.CharField(max_length=120)
    datetime = models.DateTimeField()
    url = models.CharField(max_length=150)
    image = models.ImageField(blank=True, null=True, upload_to=cd_image_path) # Needs a method to modify the width and height
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        img = Image.open(self.image.path)
        if img.height > 372 or img.width > 372:
            output_size = (372, 372)
            img.thumbnail(output_size)
            img.save(self.image.path)

    def is_active(self) -> models.BooleanField:
        return self.active  # True or False
