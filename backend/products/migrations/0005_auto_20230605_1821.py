# Generated by Django 4.1.5 on 2023-06-06 00:21

from django.db import migrations, models
import products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20230605_1821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='sku',
            field=models.CharField(default=products.models.generate_sku, max_length=30, unique=True,
                                   verbose_name='Sku'),
        ),
    ]