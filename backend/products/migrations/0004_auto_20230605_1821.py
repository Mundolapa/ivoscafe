# Generated by Django 4.1.5 on 2023-06-06 00:21
import base64
import uuid
from django.db import migrations

def generate_sku(apps, schema_editor):
    Product = apps.get_model('products', 'Product')
    for product in Product._default_manager.all():
        # Generate a UUID
        original_uuid = uuid.uuid4()
        # Convert the UUID to bytes
        uuid_bytes = original_uuid.bytes
        # Encode the bytes in base64 and remove the trailing ==
        short_uuid = base64.urlsafe_b64encode(uuid_bytes).rstrip(b'=').decode('utf-8')
        # Add "PROD_" before the short UUID
        sku = "PROD_" + short_uuid
        product.sku = sku
        product.save()



class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_product_affiliate_link_product_new_product_offer_end_and_more'),
    ]

    operations = [
        # migrations.RunPython(generate_sku, reverse_code=migrations.RunPython.noop),
    ]
