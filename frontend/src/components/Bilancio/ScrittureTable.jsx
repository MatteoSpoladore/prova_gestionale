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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function ScrittureTable({ scritture, onEdit, onDelete }) {
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("desc"); // asc o desc

  const handleSort = (colonna) => {
    const isAsc = orderBy === colonna && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(colonna);
  };

  // 🔹 Formatta data da "YYYY-MM-DD" a "DD-MM-YYYY"
  const formatDateItalian = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    if (isNaN(d)) return isoDate; // se non è valida, mostra raw
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // funzione di ordinamento dinamica
  const sortData = (a, b) => {
    let valueA = a[orderBy];
    let valueB = b[orderBy];

    // tipi di dati diversi
    if (orderBy === "data") {
      // ordina date
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    } else if (orderBy === "importo") {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    } else {
      // testo
      valueA = valueA?.toString().toLowerCase();
      valueB = valueB?.toString().toLowerCase();
    }

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  };

  const sortedData = [...scritture].sort(sortData);

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {[
              { id: "id", label: "ID" },
              { id: "data", label: "Data" },
              { id: "descrizione", label: "Descrizione" },
              { id: "dare", label: "Dare" },
              { id: "avere", label: "Avere" },
              { id: "importo", label: "Importo" },
            ].map((col) => (
              <TableCell
                key={col.id}
                sortDirection={orderBy === col.id ? order : false}
              >
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
          {sortedData.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{formatDateItalian(s.data)}</TableCell>
              <TableCell>{s.descrizione}</TableCell>
              <TableCell>{s.dare}</TableCell>
              <TableCell>{s.avere}</TableCell>
              <TableCell>{s.importo}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(s)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(s.id)}>
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

export default ScrittureTable;
// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";

// function ScrittureTable({ scritture, onEdit, onDelete }) {
//   return (
//     <Paper>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Data</TableCell>
//             <TableCell>Descrizione</TableCell>
//             <TableCell>Dare</TableCell>
//             <TableCell>Avere</TableCell>
//             <TableCell>Importo</TableCell>
//             <TableCell>Azioni</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {scritture.map((s) => (
//             <TableRow key={s.id}>
//               <TableCell>{s.data}</TableCell>
//               <TableCell>{s.descrizione}</TableCell>
//               <TableCell>{s.dare}</TableCell>
//               <TableCell>{s.avere}</TableCell>
//               <TableCell>{s.importo}</TableCell>
//               <TableCell>
//                 <IconButton color="primary" onClick={() => onEdit(s)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton color="error" onClick={() => onDelete(s.id)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }

// export default ScrittureTable;
