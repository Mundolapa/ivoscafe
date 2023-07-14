from rest_framework import viewsets, permissions, authentication
from sliders.models import Slider
from sliders.serializers import SliderSerializer

class SliderViewSet(viewsets.ModelViewSet):
    queryset = Slider.objects.all().order_by('order')
    serializer_class = SliderSerializer
    pagination_class = None # Disable pagination for this viewset
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
