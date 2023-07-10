from django.db import models

class ManagedFile(models.Model):
    file_name = models.CharField(max_length=255)
    original_location = models.CharField(max_length=255)
    current_location = models.CharField(max_length=255)
    app_name = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    is_in_trash = models.BooleanField(default=False)

    def __str__(self):
        return self.file_name

    def move_to_trash(self):
        # Include the logic to move the file to the trash folder here
        pass

    def restore_from_trash(self):
        # Include the logic to restore the file from the trash folder here
        pass
