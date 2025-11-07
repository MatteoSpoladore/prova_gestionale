from rest_framework import viewsets
from .models import Anagrafica
from .serializers import AnagraficaSerializer


class AnagraficaViewSet(viewsets.ModelViewSet):
    queryset = Anagrafica.objects.all()
    serializer_class = AnagraficaSerializer
