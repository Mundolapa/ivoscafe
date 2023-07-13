# Generated by Django 4.1.5 on 2023-04-21 18:16

from django.db import migrations, models
import django.db.models.deletion
import parler.models
import sliders.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('base', '0013_alter_globalsettingstranslation_website_about_us_and_more')
    ]

    operations = [
        migrations.CreateModel(
            name='Slider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(blank=True, max_length=120, null=True, verbose_name='url')),
                ('image', models.ImageField(blank=True, upload_to=sliders.models.slider_image_path, verbose_name='image')),
                ('public', models.BooleanField(default=True, verbose_name='Public')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'abstract': False,
            },
            bases=(parler.models.TranslatableModelMixin, models.Model),
        ),
        migrations.CreateModel(
            name='SliderTranslation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(db_index=True, max_length=15, verbose_name='Language')),
                ('title', models.CharField(blank=True, max_length=60, null=True, verbose_name='title')),
                ('subtitle', models.CharField(blank=True, max_length=120, null=True, verbose_name='subtitle')),
                ('master', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='sliders.slider')),
            ],
            bases=(parler.models.TranslatedFieldsModelMixin, models.Model),
        ),
        migrations.AddIndex(
            model_name='slidertranslation',
            index=models.Index(fields=['id', 'language_code'], name='sliders_sli_id_d120a9_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='slidertranslation',
            unique_together={('language_code', 'master', 'id')},
        ),
    ]
