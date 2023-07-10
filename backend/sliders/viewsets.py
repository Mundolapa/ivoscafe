from rest_framework import viewsets
from sliders.models import Slider
from sliders.serializers import SliderSerializer

class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all().order_by('order')
    serializer_class = SliderSerializer
    pagination_class = None # Disable pagination for this viewset
