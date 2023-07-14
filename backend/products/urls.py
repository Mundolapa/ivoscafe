from django.urls import path

from . import viewsets

# /api/products/
urlpatterns = [
    path('', viewsets.ProductListView.as_view(), name='product-list'),
    # path('<int:pk>/update/', views.product_update_view, name='product-edit'),
    # path('<int:pk>/delete/', views.product_destroy_view),
    path('<int:pk>/', viewsets.ProductDetailAPIView.as_view(), name='product-detail'),
    path('category/<int:category_id>/', viewsets.ProductListByCategoryView.as_view(), name='product-list-by-category'),
]