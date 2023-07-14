from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Timer
from .serializers import TimerSerializer

class TimerDetail(generics.RetrieveAPIView):
    queryset = Timer.objects.all()
    serializer_class = TimerSerializer

class TimerUpdate(generics.UpdateAPIView):
    queryset = Timer.objects.all()
    serializer_class = TimerSerializer

    def get_object(self):
        return get_object_or_404(Timer, pk=self.kwargs.get('pk'))

    def perform_update(self, serializer):
        serializer.save()
