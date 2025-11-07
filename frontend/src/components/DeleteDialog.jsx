import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Conferma Eliminazione</DialogTitle>
      <DialogContent>
        Sei sicuro di voler eliminare questa scrittura?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
