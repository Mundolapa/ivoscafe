from rest_framework import serializers
# from django.conf import settings
from sliders.models import Slider, SliderTranslation
from django.utils.translation import get_language

current_language = get_language()
print(current_language)

class SliderSerializer(serializers.ModelSerializer):
    # absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Slider
        fields = ('id', 'title', 'subtitle', 'url', 'image', 'public', 'button_text')

    # def get_current_language(self):
    #     request = self.context.get('request')
    #     if request:
    #         return get_language()
    #     return settings.LANGUAGE_CODE
    #
    # def get_absolute_url(self, obj):
    #     if obj.url:
    #         return f"{settings.BASE_URL}{get_language()}/{obj.url}"
    #     return None
