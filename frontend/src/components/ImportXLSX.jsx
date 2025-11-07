// src/components/XLSXImport.jsx
import React, { useRef, useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import * as XLSX from "xlsx";

/**
 * COMPONENTE GENERICO PER IMPORT DA XLSX
 *
 * Props:
 * - onDataParsed(rows: any[]): obbligatorio
 *      -> viene chiamato con l'array di righe parse dal file
 *         (dopo eventuale transformRow / validateRow).
 *
 * - buttonLabel: string (default: "Importa da XLSX")
 *
 * - sheetIndex: number (default: 0)
 *      -> quale foglio usare (0 = primo)
 *
 * - transformRow?: function(rawRow) => any
 *      -> permette di trasformare ogni riga (es. rinominare colonne, cast tipi)
 *      -> se non presente, ritorna il rawRow così com'è.
 *
 * - validateRow?: function(row) => boolean
 *      -> se presente, include solo le righe per cui ritorna true.
 *      -> utile per saltare righe vuote / incomplete.
 *
 * - showSnackbar: boolean (default: true)
 *      -> mostra messaggi di feedback.
 *
 * NOTE:
 * - Usa XLSX.utils.sheet_to_json con header automatico
 *   -> la prima riga del foglio deve essere l'intestazione colonne.
 */
function ImportXLSX({
  onDataParsed,
  buttonLabel = "Importa da XLSX",
  sheetIndex = 0,
  transformRow,
  validateRow,
  showSnackbar = true,
  sx,
}) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      // 1️⃣ leggiamo il file in ArrayBuffer
      const data = await file.arrayBuffer();

      // 2️⃣ creiamo il workbook
      const workbook = XLSX.read(data, { type: "array" });

      // 3️⃣ selezioniamo il foglio
      const sheetName = workbook.SheetNames[sheetIndex];
      if (!sheetName) {
        throw new Error("Foglio specificato non trovato nel file.");
      }
      const sheet = workbook.Sheets[sheetName];

      // 4️⃣ convertiamo in JSON:
      //    - la prima riga è l'header
      //    - ogni riga -> { header1: valore1, ... }
      const rawRows = XLSX.utils.sheet_to_json(sheet, {
        defval: "", // celle vuote -> ""
      });

      // 5️⃣ trasformazione opzionale per ogni riga
      const processed = rawRows
        .map((row) => {
          if (typeof transformRow === "function") {
            return transformRow(row);
          }
          return row;
        })
        // 6️⃣ validazione / filtro opzionale
        .filter((row) => {
          if (typeof validateRow === "function") {
            return validateRow(row);
          }
          // default: esclude righe completamente vuote
          return Object.values(row).some(
            (v) => v !== "" && v !== null && v !== undefined
          );
        });

      if (!processed.length) {
        if (showSnackbar) {
          setSnackbar({
            open: true,
            message: "Nessuna riga valida trovata nel file.",
            severity: "warning",
          });
        }
      } else {
        // 7️⃣ callback verso il parent
        if (typeof onDataParsed === "function") {
          onDataParsed(processed);
        }

        if (showSnackbar) {
          setSnackbar({
            open: true,
            message: `Import riuscito: ${processed.length} righe lette.`,
            severity: "success",
          });
        }
      }
    } catch (error) {
      console.error("Errore import XLSX:", error);
      if (showSnackbar) {
        setSnackbar({
          open: true,
          message: "Errore nella lettura del file XLSX.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
      // reset input per poter scegliere lo stesso file di nuovo
      event.target.value = "";
    }
  };

  return (
    <>
      {/* input file nascosto */}
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* bottone visibile */}
      <Button
        variant="outlined"
        startIcon={loading ? <CircularProgress size={16} /> : <UploadIcon />}
        onClick={handleOpenFileDialog}
        disabled={loading}
        sx={{ mb: 2, ml: 2, ...sx }}
      >
        {loading ? "Import in corso..." : buttonLabel}
      </Button>

      {/* feedback opzionale */}
      {showSnackbar && (
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default ImportXLSX;
