// src/components/Export.jsx
import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ IMPORT CORRETTO DEL PLUGIN

/**
 * Componente di export generico.
 *
 * Props:
 * - data: array di oggetti (es: anagrafiche)
 * - filenamePrefix: stringa base per il nome file (es: "anagrafiche")
 * - columns (opzionale): array di chiavi da includere e ordine desiderato
 *   es: ["id", "tipo", "nome", "cognome", "codice_fiscale"]
 */
function Export({ data = [], filenamePrefix = "export", columns }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const safeData = Array.isArray(data) ? data : [];
  const effectiveFilename = filenamePrefix || "export";

  // Ricavo le colonne: se non passate, uso le key del primo elemento
  const getColumns = () => {
    if (columns && columns.length > 0) return columns;
    if (!safeData.length) return [];
    return Object.keys(safeData[0]);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------- CSV --------
  const exportCSV = () => {
    const cols = getColumns();
    if (!safeData.length || !cols.length) return;

    const header = cols.join(";");
    const rows = safeData.map((row) =>
      cols
        .map((col) => {
          let value = row[col] ?? "";
          // Escape base per ; e "
          if (typeof value === "string") {
            value = value.replace(/"/g, '""');
            if (value.includes(";") || value.includes("\n")) {
              value = `"${value}"`;
            }
          }
          return value;
        })
        .join(";")
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${effectiveFilename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    handleClose();
  };

  // -------- XLSX --------
  const exportXLSX = () => {
    const cols = getColumns();
    if (!safeData.length || !cols.length) return;

    // Mappo i dati solo sulle colonne desiderate
    const worksheetData = safeData.map((row) => {
      const obj = {};
      cols.forEach((col) => {
        obj[col] = row[col] ?? "";
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { header: cols });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dati");

    XLSX.writeFile(workbook, `${effectiveFilename}.xlsx`);
    handleClose();
  };

  // -------- PDF --------
  const exportPDF = () => {
    const cols = getColumns();
    if (!safeData.length || !cols.length) return;

    const doc = new jsPDF({ orientation: "landscape" });

    const head = [cols];
    const body = safeData.map((row) =>
      cols.map((col) =>
        row[col] !== null && row[col] !== undefined ? String(row[col]) : ""
      )
    );

    doc.text(`${effectiveFilename.toUpperCase()}`, 14, 14);

    // ✅ Chiamiamo esplicitamente la funzione importata
    autoTable(doc, {
      startY: 20,
      head,
      body,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [33, 150, 243] },
    });

    doc.save(`${effectiveFilename}.pdf`);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleClick}
        disabled={!safeData.length}
        sx={{ mb: 2 }}
      >
        Esporta
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={exportCSV}>
          <ListItemIcon>
            <TableChartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Esporta in CSV</ListItemText>
        </MenuItem>

        <MenuItem onClick={exportXLSX}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Esporta in XLSX</ListItemText>
        </MenuItem>

        <MenuItem onClick={exportPDF}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Esporta in PDF</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Export;
