from rest_framework import generics
from django.shortcuts import render
from django.views.generic import DetailView, ListView
from parler.views import TranslatableSlugMixin
from . import models
from .serializers import CategorySerializer


class CategoryListView(generics.ListAPIView):
    """
    Category list view.
    """
    queryset = models.Category
    serializer_class = CategorySerializer


class CategoryDetailView(TranslatableSlugMixin, DetailView):
    """
    Category detail view
    """

    model = models.Category


def handle_404(request, exception):
    response = render(request, 'main/error-404.html')
    response.status_code = 404
    return response
