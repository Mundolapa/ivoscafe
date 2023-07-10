from rest_framework import viewsets
from .models import GlobalSettings, ThirdPartyApiKeys
from .serializers import GlobalSettingsSerializer, ThirdPartyApiKeysSerializer

class GlobalSettingsViewSet(viewsets.ModelViewSet):
    queryset = GlobalSettings.objects.all()
    serializer_class = GlobalSettingsSerializer
    pagination_class = None # Disable pagination for this viewset

class ThirdPartyApiKeysViewSet(viewsets.ModelViewSet):
    queryset = ThirdPartyApiKeys.objects.all()
    serializer_class = ThirdPartyApiKeysSerializer
    pagination_class = None # Disable pagination for this viewset
