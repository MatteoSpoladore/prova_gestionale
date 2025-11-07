from django.db import models


class SezioneBilancio(models.Model):
    codice = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Sezioni di bilancio"
        ordering = ["codice"]

    def __str__(self):
        return f"{self.codice} - {self.nome}"


class CategoriaBilancio(models.Model):
    sezione = models.ForeignKey(
        SezioneBilancio, on_delete=models.CASCADE, related_name="categorie"
    )
    codice = models.CharField(max_length=10)
    nome = models.CharField(max_length=100)

    class Meta:
        unique_together = ("sezione", "codice")
        verbose_name_plural = "Categorie di bilancio"
        ordering = ["sezione__codice", "codice"]

    def __str__(self):
        return f"{self.sezione.codice}.{self.codice} - {self.nome}"


class SottocategoriaBilancio(models.Model):
    categoria = models.ForeignKey(
        CategoriaBilancio, on_delete=models.CASCADE, related_name="sottocategorie"
    )
    codice = models.CharField(max_length=10)
    nome = models.CharField(max_length=150)

    class Meta:
        unique_together = ("categoria", "codice")
        verbose_name_plural = "Sottocategorie di bilancio"
        ordering = ["categoria__codice", "codice"]

    def __str__(self):
        return f"{self.categoria.codice}.{self.codice} - {self.nome}"


class VoceBilancio(models.Model):
    sottocategoria = models.ForeignKey(
        SottocategoriaBilancio, on_delete=models.CASCADE, related_name="voci"
    )
    codice = models.CharField(max_length=20)
    nome = models.CharField(max_length=255)
    natura_conto = models.CharField(
        max_length=10,
        choices=[("DARE", "Dare"), ("AVERE", "Avere")],
        null=True,
        blank=True,
    )
    saldo = models.DecimalField(max_digits=15, decimal_places=2, default=0)

    class Meta:
        unique_together = ("sottocategoria", "codice")
        verbose_name_plural = "Voci di bilancio"
        ordering = ["sottocategoria__codice", "codice"]

    def __str__(self):
        return f"{self.sottocategoria.codice}.{self.codice} - {self.nome}"
