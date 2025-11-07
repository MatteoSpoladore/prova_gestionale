// src/pages/Anagrafica.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Alert } from "@mui/material";
import AnagraficaForm from "./AnagraficaForm";
import AnagraficaTable from "./AnagraficaTable";
import {
  getAnagrafiche,
  createAnagrafica,
  updateAnagrafica,
  deleteAnagrafica,
} from "../../api/Api"; // 🔴 controlla il path reale
import Export from "../Export"; // 🔴 controlla il path reale
import ImportXLSX from "../ImportXLSX"; // 🔴 controlla il path reale

// Stato iniziale del form definito una volta sola
const initialFormData = {
  tipo: "",
  tessera_socio: "",
  allievo: false,
  nome: "",
  cognome: "",
  ragione_sociale: "",
  data_nascita: "",
  comune_nascita: "",
  provincia: "",
  sesso: "",
  codice_fiscale: "",
  partita_iva: "",
};

const anagraficheEsempio = [
  {
    id: 1,
    tipo: "SOCIO",
    tessera_socio: "A001",
    allievo: false,
    nome: "Mario",
    cognome: "Rossi",
    ragione_sociale: "",
    data_nascita: "1980-05-14",
    comune_nascita: "Milano",
    provincia: "MI",
    sesso: "M",
    codice_fiscale: "RSSMRA80E14F205X",
    partita_iva: "",
  },
  {
    id: 2,
    tipo: "ALLIEVO",
    tessera_socio: "A002",
    allievo: true,
    nome: "Luca",
    cognome: "Bianchi",
    ragione_sociale: "",
    data_nascita: "1995-09-22",
    comune_nascita: "Torino",
    provincia: "TO",
    sesso: "M",
    codice_fiscale: "BNCLCU95P22L219Y",
    partita_iva: "",
  },
  {
    id: 3,
    tipo: "CLIENTE",
    tessera_socio: "",
    allievo: false,
    nome: "",
    cognome: "",
    ragione_sociale: "Tech Solutions SRL",
    data_nascita: "",
    comune_nascita: "",
    provincia: "RM",
    sesso: "",
    codice_fiscale: "",
    partita_iva: "IT12345678901",
  },
  {
    id: 4,
    tipo: "FORNITORE",
    tessera_socio: "",
    allievo: false,
    nome: "",
    cognome: "",
    ragione_sociale: "Studio Contabile Verdi",
    data_nascita: "",
    comune_nascita: "",
    provincia: "FI",
    sesso: "",
    codice_fiscale: "",
    partita_iva: "IT98765432109",
  },
];

function Anagrafica() {
  const [anagrafiche, setAnagrafiche] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [globalError, setGlobalError] = useState("");

  // ------ FETCH LISTA ------
  const fetchAnagraficheData = async () => {
    setGlobalError("");
    setErrors({});

    try {
      const res = await getAnagrafiche();
      setAnagrafiche(res.data);
    } catch (error) {
      console.error("Errore fetch anagrafiche:", error);
      setGlobalError("Impossibile caricare le anagrafiche dal server.");
      setAnagrafiche(anagraficheEsempio);
    }
  };

  useEffect(() => {
    fetchAnagraficheData();
  }, []);

  // ------ HANDLER CAMBI INPUT ------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------ SUBMIT (CREATE / UPDATE) ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalError("");

    try {
      if (isEditing && selectedId !== null) {
        await updateAnagrafica(selectedId, formData);
      } else {
        await createAnagrafica(formData);
      }

      setFormData(initialFormData);
      setIsEditing(false);
      setSelectedId(null);
      await fetchAnagraficheData();
    } catch (error) {
      console.error("Errore submit anagrafica:", error);

      // Se il backend (es. DRF) restituisce errori di validazione
      const data = error.response?.data;
      if (data && typeof data === "object") {
        setErrors(data);
      } else {
        setGlobalError("Errore nel salvataggio dei dati.");
      }
    }
  };

  // ------ EDIT ------
  const handleEdit = (item) => {
    setFormData({
      ...initialFormData,
      ...item,
    });
    setSelectedId(item.id);
    setIsEditing(true);
    setErrors({});
    setGlobalError("");
  };

  // ------ DELETE ------
  const handleDelete = async (id) => {
    setGlobalError("");

    try {
      await deleteAnagrafica(id);
      await fetchAnagraficheData();
    } catch (error) {
      console.error("Errore delete anagrafica:", error);
      setGlobalError("Impossibile eliminare l'anagrafica.");
    }
  };

  // ------ IMPORT (da XLSX, via API centralizzata) ------
  const handleImportedAnagrafiche = async (rows) => {
    setGlobalError("");

    try {
      for (const row of rows) {
        await createAnagrafica(row);
      }
      await fetchAnagraficheData();
    } catch (error) {
      console.error("Errore import anagrafiche:", error);
      setGlobalError("Errore durante l'import delle anagrafiche.");
    }
  };

  // ------ RENDER ------
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Anagrafiche
      </Typography>

      {globalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {globalError}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <AnagraficaForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isEditing={isEditing}
          errors={errors}
        />
      </Paper>

      <Typography variant="h5" gutterBottom>
        Elenco Anagrafiche
      </Typography>

      <Export data={anagrafiche} filenamePrefix="anagrafiche" />

      <ImportXLSX
        buttonLabel="Importa Anagrafiche"
        onDataParsed={handleImportedAnagrafiche}
        transformRow={(raw) => ({
          // Mapping header XLSX -> campi backend
          tipo: raw.tipo || raw.Tipo || "",
          tessera_socio: raw.tessera_socio || raw.Tessera || "",
          allievo:
            raw.allievo === true ||
            raw.allievo === "TRUE" ||
            raw.allievo === "true" ||
            raw.allievo === 1 ||
            raw.allievo === "1",
          nome: raw.nome || raw.Nome || "",
          cognome: raw.cognome || raw.Cognome || "",
          ragione_sociale: raw.ragione_sociale || raw["Ragione Sociale"] || "",
          data_nascita:
            raw.data_nascita || raw["Data di nascita"] || raw["Data_Nascita"],
          comune_nascita: raw.comune_nascita || raw["Comune di nascita"] || "",
          provincia: raw.provincia || raw.Provincia || "",
          sesso: raw.sesso || raw.Sesso || "",
          codice_fiscale: raw.codice_fiscale || raw["Codice Fiscale"] || "",
          partita_iva: raw.partita_iva || raw["Partita IVA"] || "",
        })}
        validateRow={(row) =>
          // Importiamo solo se c'è almeno nome+cognome o una ragione sociale
          (!!row.nome && !!row.cognome) || !!row.ragione_sociale
        }
      />

      <AnagraficaTable
        anagrafiche={anagrafiche}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default Anagrafica;
