from rest_framework import viewsets
from .models import ScritturaContabile
from .serializers import ScritturaSerializer


class ScritturaViewSet(viewsets.ModelViewSet):
    queryset = ScritturaContabile.objects.all().order_by("-id")
    serializer_class = ScritturaSerializer
