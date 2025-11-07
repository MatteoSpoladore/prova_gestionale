from django.core.exceptions import ValidationError
from django.db import models


class Anagrafica(models.Model):
    TIPOLOGIA = (
        ("SOCIO", "Socio"),
        ("VOLONTARIO", "Volontario"),
        ("INSEGNANTE", "Insegnante"),
        ("CLIENTE", "Cliente"),
        ("FORNITORE", "Fornitore"),
    )

    SESSO = (("M", "Maschio"), ("F", "Femmina"))

    tipo = models.CharField(max_length=100, choices=TIPOLOGIA)
    tessera_socio = models.IntegerField(blank=True, null=True)
    allievo = models.BooleanField(default=False)
    nome = models.CharField(max_length=100)
    cognome = models.CharField(max_length=100)
    ragione_sociale = models.CharField(max_length=100, blank=True, null=True)
    data_nascita = models.CharField(max_length=100)
    comune_nascita = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    sesso = models.CharField(max_length=3, choices=SESSO)
    codice_fiscale = models.CharField(max_length=16, blank=True)
    partita_iva = models.CharField(max_length=100, blank=True, null=True)

    def clean(self):
        """Controlla la coerenza dei campi rispetto al tipo di anagrafica."""
        errors = {}

        # Se è socio → deve avere tessera_socio
        if self.tipo == "SOCIO" and not self.tessera_socio:
            errors["tessera_socio"] = (
                "Il campo tessera socio è obbligatorio per i soci."
            )
        if self.allievo and not self.tipo == "SOCIO":
            errors["allievo"] = "Gli allievi devono essere per forza soci."

        # Se è cliente o fornitore → deve avere ragione sociale e partita IVA
        if self.tipo in ["CLIENTE", "FORNITORE"]:
            if not self.ragione_sociale:
                errors["ragione_sociale"] = (
                    "La ragione sociale è obbligatoria per clienti e fornitori."
                )
            if not self.partita_iva:
                errors["partita_iva"] = (
                    "La partita IVA è obbligatoria per clienti e fornitori."
                )

        # Se è volontario o socio → non deve avere partita IVA
        if self.tipo in ["SOCIO", "VOLONTARIO"] and self.partita_iva:
            errors["partita_iva"] = "I soci e i volontari non devono avere partita IVA."

        # Se ci sono errori → Django solleverà ValidationError
        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return f"{self.tipo} - {self.nome} {self.cognome}"
