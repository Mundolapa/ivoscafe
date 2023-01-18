from django.urls import path, re_path
# from .views import SliderListView
from . import views
#
app_name = 'main'

urlpatterns = [
    path('tree/', views.CategoryListView.as_view(), name="category_list"),
    re_path(
        r"^(?P<slug>[-_\w]+)/$",
        views.CategoryDetailView.as_view(),
        name="category_detail",
    ),
]