from rest_framework import viewsets, permissions, authentication
from .models import GlobalSettings, ThirdPartyApiKeys
from .serializers import GlobalSettingsSerializer, ThirdPartyApiKeysSerializer

class GlobalSettingsViewSet(viewsets.ModelViewSet):
    queryset = GlobalSettings.objects.all()
    serializer_class = GlobalSettingsSerializer
    pagination_class = None # Disable pagination for this viewset
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ThirdPartyApiKeysViewSet(viewsets.ModelViewSet):
    queryset = ThirdPartyApiKeys.objects.all()
    serializer_class = ThirdPartyApiKeysSerializer
    pagination_class = None # Disable pagination for this viewset
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
