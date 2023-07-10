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
