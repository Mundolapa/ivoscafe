from django.urls import path, include
from . import viewsets

urlpatterns = [
    path('', viewsets.BannerViewSet.as_view({'get': 'list'})),
]