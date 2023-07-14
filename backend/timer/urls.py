from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import TimerDetail, TimerUpdate

urlpatterns = [
    path('<int:pk>/', TimerDetail.as_view()),
    path('<int:pk>/update/', TimerUpdate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
