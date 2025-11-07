import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function ScritturaForm({ formData, onChange, onSubmit, isEditing }) {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h6">
        {isEditing ? "Modifica Scrittura" : "Aggiungi Scrittura"}
      </Typography>

      <TextField
        label="Data"
        type="date"
        name="data"
        value={formData.data}
        onChange={onChange}
        // InputLabelProps={{ shrink: true }}
        slotProps={{ inputLabel: { shrink: true } }}
        required
      />
      <TextField
        label="Descrizione"
        name="descrizione"
        value={formData.descrizione}
        onChange={onChange}
        required
      />
      <TextField
        label="Dare"
        name="dare"
        // type="number"
        value={formData.dare}
        onChange={onChange}
        required
      />
      <TextField
        label="Avere"
        name="avere"
        // type="number"
        value={formData.avere}
        onChange={onChange}
        required
      />
      <TextField
        label="Importo"
        name="importo"
        type="number"
        value={formData.importo}
        onChange={onChange}
        required
      />
      <Button type="submit" variant="contained">
        {isEditing ? "Salva Modifiche" : "Salva"}
      </Button>
    </Box>
  );
}

export default ScritturaForm;
