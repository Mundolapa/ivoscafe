from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import RegisterView

from accounts.models import Address, Profile

from accounts.serializers import CustomRegisterSerializer, AddressSerializer, LoginSerializer, ProfileSerializer
from api.mixins import (
    UserQuerySetMixin,
    StaffEditorPermissionMixin
)

@api_view(['GET'])
def check_email(request, email):
    # username = request.query_params.get('username', None)
    if email is not None:
        if get_user_model().objects.filter(email=email).exists():
            return Response({"available": False}, status=status.HTTP_200_OK)
        else:
            return Response({"available": True}, status=status.HTTP_200_OK)
    return Response({"error": "Email not provided"}, status=status.HTTP_400_BAD_REQUEST)


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer  # use your custom serializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:  # Registration was successful
            return Response({"detail": "Registration successful"}, status=200)
        return response  # Return the original response if not 201


class AddressListCreateAPIView(UserQuerySetMixin, generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    pagination_class = None
    user_field = 'user'

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        if user.is_anonymous:
            return self.queryset.none()
        lookup_data = {}
        lookup_data[self.user_field] = user
        qs = super().get_queryset(*args, **kwargs)
        if self.allow_staff_view and user.is_staff:
            return qs
        return qs.filter(**lookup_data)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AddressRetrieveUpdateDestroyAPIView(UserQuerySetMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    lookup_field = 'id'  # or whatever your lookup field is

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class ProfileRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
