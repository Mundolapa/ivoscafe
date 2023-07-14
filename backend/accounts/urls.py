from django.urls import path, re_path
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from .views import (
    check_email,
    CustomRegisterView,
    AddressListCreateAPIView,
    AddressRetrieveUpdateDestroyAPIView,
    ProfileRetrieveUpdateAPIView
)

urlpatterns = [
    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('check-email/<str:email>/', check_email, name='check_email'),
    path('login/', LoginView.as_view(), name='account_login'),
    path('logout/', LogoutView.as_view(), name='account_logout'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
    path('registration/', CustomRegisterView.as_view(), name='rest_register'),
    path('addresses/', AddressListCreateAPIView.as_view(), name='address-list-create'),
    path('addresses/<int:id>/', AddressRetrieveUpdateDestroyAPIView.as_view(), name='address-retrieve-update-destroy'),
    path('profile/', ProfileRetrieveUpdateAPIView.as_view(), name='profile-retrieve-update'),
    path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    re_path(r'^token/refresh/(?P<key>[-:\w]+)/$', get_refresh_view().as_view(), name='token_refresh'),
]
