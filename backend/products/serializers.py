import datetime

from rest_framework import serializers
from rest_framework.reverse import reverse

from api.serializers import UserPublicSerializer
from navsite.serializers import CategoryForProductSerializer
from . import validators
from .models import Image, Product, ProductAttribute, ProductVariation


class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ('value', 'stock')  # Add all fields of ProductVariation

class ProductAttributeSerializer(serializers.ModelSerializer):
    variations = ProductVariationSerializer(many=True, read_only=True)
    class Meta:
        model = ProductAttribute
        fields = ('name', 'image', 'variations')  # Add all fields of ProductAttribute

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)

class ProductInlineSerializer(serializers.Serializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='pk',
        read_only=True
    )
    title = serializers.CharField(read_only=True)


class ProductSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    category = serializers.SerializerMethodField()
    keywords = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    title = serializers.CharField(validators=[validators.validate_title_no_hello, validators.unique_product_title])
    body = serializers.CharField(source='description')
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    offer_end = serializers.SerializerMethodField()

    def get_keywords(self, obj):
        # Check if the keywords field exists and is not empty
        if obj.keywords:
            # Split the string into a list of keywords
            keywords_list = obj.keywords.split(',')
            # Trim extra whitespace from each keyword
            keywords_list = [keyword.strip() for keyword in keywords_list]
            return keywords_list
        else:
            return []

    class Meta:
        model = Product
        fields = [
            'id',
            'sku',
            'title',
            'short_description',
            'body',
            'additional_info',
            'category',
            'keywords',
            'price',
            'stock',
            'new',
            'available',
            'discount',
            'public',
            'rating',
            'offer_end',
            'affiliate_link',
            'sale_count',
            'endpoint',
            'images',
            'attributes',
            'owner',
        ]

    def get_images(self, obj):
        request = self.context.get('request')
        return [request.build_absolute_uri(img.image.url) for img in obj.images.all()]

    def get_my_user_data(self, obj):
        return {
            "username": obj.user.username
        }

    def get_edit_url(self, obj):
        request = self.context.get('request')  # self.request
        if request is None:
            return None
        return reverse("product-edit", kwargs={"pk": obj.pk}, request=request)

    def get_offer_end(self, obj):
        # Check if the offer_end date exists and is not None
        if obj.offer_end:
            try:
                # Format the datetime object
                return obj.offer_end.strftime("%B %d, %Y %H:%M:%S")
            except Exception as e:
                # In case of any other exception, return the error
                return str(e)
        return None

    def get_category(self, obj):
        # This method returns the category title as an array
        return [obj.category.title]

