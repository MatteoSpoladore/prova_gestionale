import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import {
  getScritture,
  createScrittura,
  updateScrittura,
  deleteScrittura,
} from "../api/Api";
import ScritturaForm from "./Bilancio/ScritturaForm";
import ScrittureTable from "./Bilancio/ScrittureTable";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import Export from "./Export";
import ImportXLSX from "./ImportXLSX"; // ⬅️ il componente generico di import

function App() {
  const [scritture, setScritture] = useState([]);
  const [formData, setFormData] = useState({
    data: "",
    descrizione: "",
    dare: "",
    avere: "",
    importo: "",
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    getScritture()
      .then((res) => setScritture(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = (e) => {
    e.preventDefault();
    createScrittura(formData).then(() => {
      fetchData();
      setFormData({
        data: "",
        descrizione: "",
        dare: "",
        avere: "",
        importo: "",
      });
    });
  };

  const handleEditClick = (item) => {
    setSelectedId(item.id);
    setFormData(item);
    setOpenEdit(true);
  };

  const handleEditSave = () => {
    updateScrittura(selectedId, formData).then(() => {
      fetchData();
      setOpenEdit(false);
    });
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleDeleteConfirm = () => {
    deleteScrittura(selectedId).then(() => {
      fetchData();
      setOpenDelete(false);
    });
  };

  // ------ IMPORT SCRITTURE ------
  const handleImportedScritture = async (rows) => {
    // rows qui sono già nel formato { data, descrizione, dare, avere, importo }
    // definito da transformRow
    try {
      for (const row of rows) {
        await createScrittura(row);
      }
      fetchData();
    } catch (error) {
      console.error("Errore durante l'import delle scritture:", error);
    }
  };

  return (
    <Container maxWidth="l" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Scritture Contabili
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <ScritturaForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleCreate}
        />
      </Paper>

      <Typography variant="h4" gutterBottom>
        Storico Registrazioni
      </Typography>
      <Export data={scritture} filenamePrefix="storico_scritture" />
      <ImportXLSX
        buttonLabel="Importa Scritture"
        onDataParsed={handleImportedScritture}
        transformRow={(raw) => ({
          // Mapping dagli header Excel ai campi del backend
          data: raw.data || raw.Data || raw["Data"] || "",
          descrizione:
            raw.descrizione || raw.Descrizione || raw["Descrizione"] || "",
          dare: raw.dare || raw.Dare || raw["Dare"] || "",
          avere: raw.avere || raw.Avere || raw["Avere"] || "",
          importo: raw.importo || raw.Importo || raw["Importo"] || "",
        })}
        validateRow={(row) =>
          // Importiamo solo se la riga ha senso:
          // - data
          // - descrizione
          // - importo
          // - dare/avere
          !!row.data &&
          !!row.descrizione &&
          !!row.importo &&
          !!row.dare &&
          !!row.avere
        }
      />

      <ScrittureTable
        scritture={scritture}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <EditDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        formData={formData}
        onChange={handleChange}
        onSave={handleEditSave}
      />

      <DeleteDialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}

export default App;
