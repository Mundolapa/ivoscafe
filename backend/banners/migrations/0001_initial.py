# Generated by Django 4.1.5 on 2023-04-25 01:08

from django.db import migrations, models
import django.db.models.deletion
import parler.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('base', '0013_alter_globalsettingstranslation_website_about_us_and_more')
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(blank=True, max_length=120, null=True)),
                ('image', models.ImageField(blank=True, upload_to='images/banners/')),
                ('price', models.DecimalField(decimal_places=2, default=99.99, max_digits=15, verbose_name='price')),
                ('promo', models.BooleanField(default=True, verbose_name='is_promo')),
                ('discount', models.DecimalField(decimal_places=2, default=0.05, max_digits=15, verbose_name='discount')),
                ('public', models.BooleanField(default=True, verbose_name='public')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(parler.models.TranslatableModelMixin, models.Model),
        ),
        migrations.CreateModel(
            name='BannerTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('title', models.CharField(blank=True, max_length=60, null=True, verbose_name='title')),
                ('promo_text', models.CharField(blank=True, max_length=60, null=True, verbose_name='promo_text')),
                ('button_text', models.CharField(blank=True, max_length=24, null=True, verbose_name='button_text')),
                ('master', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='banners.banner')),
            ],
            bases=(parler.models.TranslatedFieldsModelMixin, models.Model),
        ),
        migrations.AddIndex(
            model_name='bannertranslation',
            index=models.Index(fields=['id', 'language_code'], name='banners_ban_id_9834b8_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='bannertranslation',
            unique_together={('language_code', 'master', 'id')},
        ),
    ]