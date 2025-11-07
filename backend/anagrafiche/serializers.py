from rest_framework import serializers
from .models import Anagrafica


class AnagraficaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anagrafica
        fields = "__all__"

    def validate(self, data):
        tipo = data.get("tipo")

        if tipo == "SOCIO" and not data.get("tessera_socio"):
            raise serializers.ValidationError(
                {"tessera_socio": "Campo obbligatorio per i soci."}
            )

        if tipo in ["CLIENTE", "FORNITORE"]:
            if not data.get("ragione_sociale"):
                raise serializers.ValidationError(
                    {"ragione_sociale": "Campo obbligatorio per clienti e fornitori."}
                )
            if not data.get("partita_iva"):
                raise serializers.ValidationError(
                    {"partita_iva": "Campo obbligatorio per clienti e fornitori."}
                )

        if tipo in ["SOCIO", "VOLONTARIO"] and data.get("partita_iva"):
            raise serializers.ValidationError(
                {"partita_iva": "I soci e i volontari non devono avere partita IVA."}
            )

        return data
