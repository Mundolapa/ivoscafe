from rest_framework import serializers

from .models import Category

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CategorySerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True)
    class Meta:
        model = Category
        fields = [
            'id',
            'title',
            'slug',
            'url',
            'public',
            'category_type',
            'icon',
            'image',
            'keywords',
            'description',
            'parent',
            'children',
        ]

class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]

class CategoryForProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
        ]