from rest_framework import routers
from django.urls import path, include
from .views import AnagraficaViewSet

router = routers.DefaultRouter()
router.register(r"anagrafiche", AnagraficaViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
