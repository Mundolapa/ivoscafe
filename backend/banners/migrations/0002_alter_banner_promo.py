# Generated by Django 4.1.5 on 2023-04-29 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('banners', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='promo',
            field=models.BooleanField(default=False, verbose_name='promo'),
        ),
    ]
