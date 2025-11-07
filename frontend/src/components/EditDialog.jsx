import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ScritturaForm from "./Bilancio/ScritturaForm";

function EditDialog({ open, onClose, formData, onChange, onSave }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modifica Scrittura</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <ScritturaForm
          formData={formData}
          onChange={onChange}
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
          isEditing
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
