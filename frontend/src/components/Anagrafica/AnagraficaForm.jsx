// src/components/AnagraficaForm.jsx
import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material";

const tipoChoices = [
  { value: "SOCIO", label: "Socio" },
  { value: "VOLONTARIO", label: "Volontario" },
  { value: "INSEGNANTE", label: "Insegnante" },
  { value: "CLIENTE", label: "Cliente" },
  { value: "FORNITORE", label: "Fornitore" },
];

const sessoChoices = [
  { value: "M", label: "Maschio" },
  { value: "F", label: "Femmina" },
];

function AnagraficaForm({ formData, onChange, onSubmit, isEditing, errors }) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? "Modifica Anagrafica" : "Aggiungi Nuova Anagrafica"}
      </Typography>

      {errors.non_field_errors && (
        <Alert severity="error">{errors.non_field_errors[0]}</Alert>
      )}

      <Grid container spacing={3}>
        {/* --- Prima riga: tipo, tessera, allievo --- */}
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Tipologia"
            name="tipo"
            value={formData.tipo}
            onChange={onChange}
            error={!!errors.tipo}
            helperText={errors.tipo?.[0]}
            required
            fullWidth
            sx={{ minWidth: 150 }}
          >
            {tipoChoices.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Tessera Socio"
            name="tessera_socio"
            fullWidth
            value={formData.tessera_socio}
            onChange={onChange}
            error={!!errors.tessera_socio}
            helperText={errors.tessera_socio?.[0]}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={!!formData.allievo}
                onChange={(e) =>
                  onChange({
                    target: {
                      name: "allievo",
                      value: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Allievo (solo per Soci)"
          />
        </Grid>

        {/* --- Seconda riga: nome, cognome, ragione sociale --- */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Nome"
            name="nome"
            fullWidth
            value={formData.nome}
            onChange={onChange}
            error={!!errors.nome}
            helperText={errors.nome?.[0]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Cognome"
            name="cognome"
            fullWidth
            value={formData.cognome}
            onChange={onChange}
            error={!!errors.cognome}
            helperText={errors.cognome?.[0]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Ragione Sociale"
            name="ragione_sociale"
            fullWidth
            value={formData.ragione_sociale}
            onChange={onChange}
            error={!!errors.ragione_sociale}
            helperText={errors.ragione_sociale?.[0]}
          />
        </Grid>

        {/* --- Terza riga: data nascita, comune, provincia, sesso --- */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Data di nascita"
            name="data_nascita"
            type="date"
            fullWidth
            value={formData.data_nascita}
            onChange={onChange}
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.data_nascita}
            helperText={errors.data_nascita?.[0]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Comune di nascita"
            name="comune_nascita"
            fullWidth
            value={formData.comune_nascita}
            onChange={onChange}
            error={!!errors.comune_nascita}
            helperText={errors.comune_nascita?.[0]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Provincia"
            name="provincia"
            fullWidth
            value={formData.provincia}
            onChange={onChange}
            error={!!errors.provincia}
            helperText={errors.provincia?.[0]}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Sesso"
            name="sesso"
            fullWidth
            value={formData.sesso}
            onChange={onChange}
            error={!!errors.sesso}
            helperText={errors.sesso?.[0]}
            sx={{ minWidth: 120 }}
          >
            {sessoChoices.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* --- Quarta riga: codice fiscale, partita IVA --- */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Codice Fiscale"
            name="codice_fiscale"
            fullWidth
            value={formData.codice_fiscale}
            onChange={onChange}
            error={!!errors.codice_fiscale}
            helperText={errors.codice_fiscale?.[0]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Partita IVA"
            name="partita_iva"
            fullWidth
            value={formData.partita_iva}
            onChange={onChange}
            error={!!errors.partita_iva}
            helperText={errors.partita_iva?.[0]}
          />
        </Grid>

        {/* --- Bottone Salva --- */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            {isEditing ? "Salva Modifiche" : "Salva"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AnagraficaForm;
