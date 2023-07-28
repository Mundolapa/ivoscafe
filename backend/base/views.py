from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext as _

class RootView(APIView):
    def get(self, request):
        return Response({"message": _("Welcome to ivoscafe.com Api!")})


class HealthCheckView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"status": "OK"}, status=status.HTTP_200_OK)


class Handler404View(APIView):
    """
    Custom 404 view to return JSON response.
    """
    def get(self, request, *args, **kwargs):
        return Response(
            {"error": _("Resource not found.")},
            status=status.HTTP_404_NOT_FOUND
        )
