# Generated by Django 4.1.5 on 2023-06-06 00:19

from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_discount'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='affiliate_link',
            field=models.URLField(blank=True, null=True, verbose_name='Affiliate link'),
        ),
        migrations.AddField(
            model_name='product',
            name='new',
            field=models.BooleanField(default=False, verbose_name='New'),
        ),
        migrations.AddField(
            model_name='product',
            name='offer_end',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Offer end'),
        ),
        migrations.AddField(
            model_name='product',
            name='rating',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=3, verbose_name='Rating'),
        ),
        migrations.AddField(
            model_name='product',
            name='sale_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Sale count'),
        ),
        migrations.AddField(
            model_name='product',
            name='sku',
            field=models.CharField(default=products.models.generate_sku, max_length=30, null=True, verbose_name='Sku'),
        ),
        migrations.CreateModel(
            name='ProductAttribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(blank=True, null=True, upload_to=products.models.attribute_image_path)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attributes', to='products.product')),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=255)),
                ('stock', models.PositiveIntegerField(default=0)),
                ('attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variations', to='products.productattribute')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variations', to='products.product')),
            ],
            options={
                'unique_together': {('product', 'attribute', 'value')},
            },
        ),
    ]