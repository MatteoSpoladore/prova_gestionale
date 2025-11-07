from rest_framework import serializers
from .models import (
    SezioneBilancio,
    CategoriaBilancio,
    SottocategoriaBilancio,
    VoceBilancio,
)


class SezioneBilancioSerializer(serializers.ModelSerializer):
    class Meta:
        model = SezioneBilancio
        fields = "__all__"


class CategoriaBilancioSerializer(serializers.ModelSerializer):
    sezione_nome = serializers.CharField(source="sezione.nome", read_only=True)

    class Meta:
        model = CategoriaBilancio
        fields = ["id", "codice", "nome", "sezione", "sezione_nome"]


class SottocategoriaBilancioSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.CharField(source="categoria.nome", read_only=True)
    sezione_id = serializers.IntegerField(source="categoria.sezione.id", read_only=True)

    class Meta:
        model = SottocategoriaBilancio
        fields = ["id", "codice", "nome", "categoria", "categoria_nome", "sezione_id"]


class VoceBilancioSerializer(serializers.ModelSerializer):
    sottocategoria_nome = serializers.CharField(
        source="sottocategoria.nome", read_only=True
    )
    sottocategoria_codice = serializers.CharField(
        source="sottocategoria.codice", read_only=True
    )
    categoria_id = serializers.IntegerField(
        source="sottocategoria.categoria.id", read_only=True
    )
    sezione_id = serializers.IntegerField(
        source="sottocategoria.categoria.sezione.id", read_only=True
    )

    class Meta:
        model = VoceBilancio
        fields = [
            "id",
            "codice",
            "nome",
            "natura_conto",
            "saldo",
            "sottocategoria",
            "sottocategoria_codice",
            "sottocategoria_nome",
            "categoria_id",
            "sezione_id",
        ]
