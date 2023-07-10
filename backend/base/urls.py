from django.urls import path, include
from .viewsets import GlobalSettingsViewSet, ThirdPartyApiKeysViewSet

urlpatterns = [
    path('', GlobalSettingsViewSet.as_view({'get': 'list'})),
    path('api-keys/', ThirdPartyApiKeysViewSet.as_view({'get': 'list'})),
]