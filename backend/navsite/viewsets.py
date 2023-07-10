from rest_framework import viewsets

from . import models
from .serializers import CategorySerializer, CategoryNameSerializer

class CategoryViewSet(viewsets.ModelViewSet):


    queryset = models.Category.parents.viewable()
    serializer_class = CategorySerializer
    lookup_field = 'pk'
    pagination_class = None  # Disable pagination for this viewset

# category_list_view = CategoryViewSet.as_view()

class CategoryNameViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = CategoryNameSerializer
    lookup_field = 'pk'
    pagination_class = None  # Disable pagination for this viewset