from django.db.models import Q
from rest_framework import viewsets

from banners.models import Banner
from banners.serializers import BannerSerializer
from base.models import GlobalSettings


class BannerViewSet(viewsets.ModelViewSet):
    serializer_class = BannerSerializer
    pagination_class = None  # Disable pagination for this viewset

    def get_queryset(self):
        banner_type = GlobalSettings.objects.first().banner_type
        limit = {'Three': 2, 'Eleven': 2, 'Seventeen': 2, 'Four': 3, 'Fifteen': 3, 'Ten': 4, 'Six': 3, 'Five': 5}.get(banner_type, 2)
        queryset = Banner.objects.filter(Q(banner_type=banner_type) & Q(public=True)).order_by('order')

        if banner_type in ['Five', 'Six']:
            promo_banner = queryset.filter(promo=True).first()
            non_promo_banners = queryset.filter(promo=False)[:limit - 1]
            banners = [promo_banner] + list(non_promo_banners) if promo_banner else list(non_promo_banners)
        else:
            banners = list(queryset[:limit])

        return banners
