from rest_framework import serializers
from .models import Timer


class TimerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timer
        fields = ('id', 'time_left')
