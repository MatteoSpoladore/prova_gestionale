from django.db import models


class ScritturaContabile(models.Model):
    data = models.DateField()
    descrizione = models.CharField(max_length=255)
    dare = models.CharField(max_length=255)
    avere = models.CharField(max_length=255)
    importo = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.data} - {self.descrizione}"
