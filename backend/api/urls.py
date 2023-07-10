from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from . import views

app_name = "api"

urlpatterns = [
    path('auth/', obtain_auth_token),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('dj-auth/', include('dj_rest_auth.urls')),
    path('dj-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('categories/', include('navsite.urls')),
    path('products/', include('products.urls')),
    path('sliders/', include('sliders.urls')),
    path('banners/', include('banners.urls')),
    path('globals/', include('base.urls')),
    path('accounts/', include('accounts.urls')),
    path('', views.api_home)
]