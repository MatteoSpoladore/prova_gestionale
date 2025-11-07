from rest_framework import routers
from django.urls import path, include
from .views import (
    SezioneBilancioViewSet,
    CategoriaBilancioViewSet,
    SottocategoriaBilancioViewSet,
    VoceBilancioViewSet,
)

router = routers.DefaultRouter()
router.register(r"sezioni", SezioneBilancioViewSet)
router.register(r"categorie", CategoriaBilancioViewSet)
router.register(r"sottocategorie", SottocategoriaBilancioViewSet)
router.register(r"voci", VoceBilancioViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
