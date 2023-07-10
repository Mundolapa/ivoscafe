from rest_framework import serializers
from banners.models import Banner, BannerTranslation

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('id', 'title', 'link', 'image', 'price', 'promo', 'discount', 'public', 'banner_text', 'button_text')