from django.shortcuts import render
from django.views.generic import DetailView, ListView
from parler.views import TranslatableSlugMixin
from . import models

class CategoryListView(ListView):
    """
    Category list view.
    """

    model = models.Category


class CategoryDetailView(TranslatableSlugMixin, DetailView):
    """
    Category detail view
    """

    model = models.Category


def handle_404(request, exception):
    response = render(request, 'main/error-404.html')
    response.status_code = 404
    return response
