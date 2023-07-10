from django.urls import path, re_path
# from .views import SliderListView
from . import viewsets
#
app_name = 'main'

urlpatterns = [
    path('', viewsets.CategoryViewSet.as_view({'get': 'list'})),
    path('routes/', viewsets.CategoryNameViewSet.as_view({'get': 'list'})),
    # re_path(
    #     r"^(?P<slug>[-_\w]+)/$",
    #     views.CategoryDetailView.as_view(),
    #     name="category_detail",
    # ),
]