from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from . import viewsets

# router = DefaultRouter()
# router.register(r'sliders', SliderViewSet)

urlpatterns = [
    # ... other urlpatterns ...
    # path('', include(router.urls)),
    path('', viewsets.SliderViewSet.as_view({'get': 'list'})),
]
