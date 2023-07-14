from django.contrib.auth import get_user_model, authenticate
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer
from dj_rest_auth.serializers import JWTSerializer
from dj_rest_auth.serializers import TokenSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import exceptions

from api.serializers import UserPublicSerializer

from .models import Address, Profile

class CustomRegisterSerializer(RegisterSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'})
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'password1', 'password2', 'first_name', 'last_name')

    def get_cleaned_data(self):
        super().get_cleaned_data()
        return {
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }

    def validate_password2(self, value):
        data = self.get_initial()
        password1 = data.get('password1')
        password2 = value

        if password1 != password2:
            raise serializers.ValidationError("Passwords must match.")

        return value

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save()
        return user


class AddressSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)

    class Meta:
        model = Address
        fields = [
            'owner',
            'id',
            'street',
            'street2',
            'city',
            'state_province',
            'zip_code',
            'country'
        ]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'image',
            'mobile',
            'birth_date',
            'gender'
        ]


class LoginSerializer(DefaultLoginSerializer):
    def validate(self, attrs):
        # Use the default validations first
        attrs = super().validate(attrs)

        # Authenticate the user
        self.user = authenticate(self.context['request'],
                                 email=attrs['email'],
                                 password=attrs['password'])

        if self.user is None or not self.user.is_active:
            raise exceptions.AuthenticationFailed(('Unable to log in with provided credentials.'))

        # Obtain refresh and access tokens for the authenticated user
        refresh = RefreshToken.for_user(self.user)

        # Add refresh token to attrs
        attrs['refresh'] = str(refresh)
        attrs['access'] = str(refresh.access_token)

        return attrs

