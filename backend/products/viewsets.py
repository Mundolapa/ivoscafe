from django.views.generic.base import TemplateView
from rest_framework import authentication, generics, permissions
from django.conf import settings
from django.shortcuts import get_object_or_404

from api.authentication import TokenAuthentication
from navsite.models import Category

from .models import Product

from . import serializers


class ProductListView(generics.ListAPIView):
    """Products complete list"""

    # Update the queryset definition
    default_language = settings.LANGUAGE_CODE
    queryset = Product.objects.filter(translations__language_code=default_language).distinct()

    serializer_class = serializers.ProductSerializer
    pagination_class = None

    authentication_classes = [
        authentication.SessionAuthentication,
        TokenAuthentication
    ]
    permission_classes = [permissions.AllowAny]


class ProductDetailAPIView(generics.RetrieveAPIView):
    """Product detail list lookup_field = 'pk'?"""
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    authentication_classes = [
        authentication.SessionAuthentication,
        TokenAuthentication
    ]
    permission_classes = [permissions.AllowAny]


class ProductListByCategoryView(generics.ListAPIView):
    serializer_class = serializers.ProductSerializer
    authentication_classes = [
        authentication.SessionAuthentication,
        TokenAuthentication
    ]
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        category = get_object_or_404(Category, pk=category_id)
        language = self.request.LANGUAGE_CODE

        queryset = Product.objects.filter(category=category, translations__language_code=language)

        return queryset.distinct()
