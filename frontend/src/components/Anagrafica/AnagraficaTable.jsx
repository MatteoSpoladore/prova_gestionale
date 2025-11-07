// src/components/AnagraficheTable.jsx
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function AnagraficaTable({ anagrafiche, onEdit, onDelete }) {
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  const handleSort = (col) => {
    const isAsc = orderBy === col && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(col);
  };

  const sortData = (a, b) => {
    let valA = a[orderBy];
    let valB = b[orderBy];
    if (valA == null) valA = "";
    if (valB == null) valB = "";

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  };

  const filteredData = anagrafiche.filter((a) => {
    const testo =
      `${a.nome} ${a.cognome} ${a.tipo} ${a.ragione_sociale}`.toLowerCase();
    return testo.includes(filter.toLowerCase());
  });

  const sortedData = [...filteredData].sort(sortData);

  return (
    <Paper sx={{ p: 1, overflowX: "auto" }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filtra per nome, cognome o tipologia"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>

      <Table
        size="small"
        sx={{ minWidth: 1000, "& td, & th": { p: 0.5, fontSize: "0.8rem" } }}
      >
        <TableHead>
          <TableRow>
            {[
              // { id: "id", label: "ID" },
              { id: "tipo", label: "Tipologia" },
              { id: "tessera_socio", label: "Tessera Socio" },
              { id: "allievo", label: "Allievo" },
              { id: "nome", label: "Nome" },
              { id: "cognome", label: "Cognome" },
              { id: "ragione_sociale", label: "Ragione Sociale" },
              { id: "data_nascita", label: "Data di Nascita" },
              // { id: "comune_nascita", label: "Comune di Nascita" },
              // { id: "provincia", label: "Provincia" },
              // { id: "sesso", label: "Sesso" },
              { id: "codice_fiscale", label: "Codice Fiscale" },
              { id: "partita_iva", label: "Partita IVA" },
            ].map((col) => (
              <TableCell key={col.id}>
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={() => handleSort(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedData.map((a) => (
            <TableRow key={a.id}>
              {/* <TableCell>{a.id}</TableCell> */}
              <TableCell>{a.tipo}</TableCell>
              <TableCell>{a.tessera_socio}</TableCell>
              <TableCell>{a.allievo ? "Sì" : "No"}</TableCell>
              <TableCell>{a.nome}</TableCell>
              <TableCell>{a.cognome}</TableCell>
              <TableCell>{a.ragione_sociale}</TableCell>
              <TableCell>{a.data_nascita}</TableCell>
              {/* <TableCell>{a.comune_nascita}</TableCell> */}
              {/* <TableCell>{a.provincia}</TableCell> */}
              {/* <TableCell>{a.sesso}</TableCell> */}
              <TableCell>{a.codice_fiscale}</TableCell>
              <TableCell>{a.partita_iva}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(a)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(a.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default AnagraficaTable;
