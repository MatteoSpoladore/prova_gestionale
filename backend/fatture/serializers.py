from rest_framework import serializers
from .models import ScritturaContabile


class ScritturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScritturaContabile
        fields = "__all__"
