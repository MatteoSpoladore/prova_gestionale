from rest_framework import viewsets
from .models import (
    SezioneBilancio,
    CategoriaBilancio,
    SottocategoriaBilancio,
    VoceBilancio,
)
from .serializers import (
    SezioneBilancioSerializer,
    CategoriaBilancioSerializer,
    SottocategoriaBilancioSerializer,
    VoceBilancioSerializer,
)


class SezioneBilancioViewSet(viewsets.ModelViewSet):
    queryset = SezioneBilancio.objects.all()
    serializer_class = SezioneBilancioSerializer


class CategoriaBilancioViewSet(viewsets.ModelViewSet):
    queryset = CategoriaBilancio.objects.select_related("sezione").all()
    serializer_class = CategoriaBilancioSerializer


class SottocategoriaBilancioViewSet(viewsets.ModelViewSet):
    queryset = SottocategoriaBilancio.objects.select_related(
        "categoria", "categoria__sezione"
    ).all()
    serializer_class = SottocategoriaBilancioSerializer


class VoceBilancioViewSet(viewsets.ModelViewSet):
    queryset = VoceBilancio.objects.select_related(
        "sottocategoria",
        "sottocategoria__categoria",
        "sottocategoria__categoria__sezione",
    ).all()
    serializer_class = VoceBilancioSerializer
