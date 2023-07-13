# Generated by Django 4.1.5 on 2023-07-13 01:13

from django.db import migrations, models
import timer.models


class Migration(migrations.Migration):

    dependencies = [
        ('timer', '0003_countdown'),
    ]

    operations = [
        migrations.AlterField(
            model_name='countdown',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=timer.models.cd_image_path),
        ),
        migrations.AlterField(
            model_name='countdown',
            name='title',
            field=models.CharField(max_length=120),
        ),
    ]
