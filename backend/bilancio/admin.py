from django.contrib import admin
from .models import (
    SezioneBilancio,
    CategoriaBilancio,
    SottocategoriaBilancio,
    VoceBilancio,
)


@admin.register(SezioneBilancio)
class SezioneBilancioAdmin(admin.ModelAdmin):
    list_display = ("codice", "nome")
    search_fields = ("codice", "nome")
    ordering = ("codice",)
    list_per_page = 25


@admin.register(CategoriaBilancio)
class CategoriaBilancioAdmin(admin.ModelAdmin):
    list_display = ("codice", "nome", "sezione")
    list_filter = ("sezione",)
    search_fields = ("codice", "nome", "sezione__nome")
    ordering = ("sezione__codice", "codice")
    autocomplete_fields = ("sezione",)


@admin.register(SottocategoriaBilancio)
class SottocategoriaBilancioAdmin(admin.ModelAdmin):
    list_display = ("codice", "nome", "categoria", "get_sezione")
    list_filter = ("categoria__sezione",)
    search_fields = ("codice", "nome", "categoria__nome")
    ordering = ("categoria__codice", "codice")
    autocomplete_fields = ("categoria",)

    def get_sezione(self, obj):
        return obj.categoria.sezione.nome

    get_sezione.short_description = "Sezione"


@admin.register(VoceBilancio)
class VoceBilancioAdmin(admin.ModelAdmin):
    list_display = (
        "codice",
        "nome",
        "sottocategoria",
        "natura_conto",
        "saldo",
        "get_categoria",
        "get_sezione",
    )
    list_filter = ("natura_conto", "sottocategoria__categoria__sezione")
    search_fields = ("codice", "nome", "sottocategoria__nome")
    ordering = ("sottocategoria__categoria__codice", "codice")
    autocomplete_fields = ("sottocategoria",)
    list_editable = ("saldo",)

    def get_categoria(self, obj):
        return obj.sottocategoria.categoria.nome

    get_categoria.short_description = "Categoria"

    def get_sezione(self, obj):
        return obj.sottocategoria.categoria.sezione.nome

    get_sezione.short_description = "Sezione"
