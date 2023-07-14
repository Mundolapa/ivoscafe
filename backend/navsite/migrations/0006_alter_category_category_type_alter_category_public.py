# Generated by Django 4.1.5 on 2023-06-12 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('navsite', '0005_rename_status_category_public'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='category_type',
            field=models.CharField(choices=[('container', 'Container'), ('shop_grid', 'Shop Grid'), ('shop_list', 'Shop List'), ('external_link', 'External Link')], default='shop_grid', max_length=50, verbose_name='category type'),
        ),
        migrations.AlterField(
            model_name='category',
            name='public',
            field=models.BooleanField(default=True, verbose_name='public'),
        ),
    ]
