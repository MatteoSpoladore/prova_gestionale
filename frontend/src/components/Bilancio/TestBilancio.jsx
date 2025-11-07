import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Paper,
  Divider,
} from "@mui/material";

/**
 * voci: array di oggetti con struttura:
 * {
 *   Sezione: "Attivo",
 *   Sottosezione: "B.I.2",
 *   Codice: "B.I.2",
 *   Livello: 3,
 *   Descrizione: "Costi di sviluppo",
 *   Saldo: 0
 * }
 */

export default function TestBilancio({ voci = [] }) {
  if (!voci.length) {
    return <Typography>Caricamento dati...</Typography>;
  }

  // Raggruppa per Sezione (Attivo / Passivo)
  const gruppiSezione = voci.reduce((acc, voce) => {
    if (!acc[voce.Sezione]) acc[voce.Sezione] = [];
    acc[voce.Sezione].push(voce);
    return acc;
  }, {});

  return (
    <Box p={3}>
      {Object.entries(gruppiSezione).map(([sezione, items]) => (
        <Paper key={sezione} sx={{ mb: 4, p: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {sezione.toUpperCase()}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }}>Codice</TableCell>
                <TableCell sx={{ width: "50%" }}>Descrizione</TableCell>
                {/* <TableCell sx={{ width: "10%" }}>Livello</TableCell> */}
                <TableCell align="right" sx={{ width: "20%" }}>
                  Saldo
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((voce, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor:
                      voce.Livello === 1
                        ? "rgba(25,118,210,0.08)"
                        : voce.Livello === 2
                        ? "rgba(25,118,210,0.04)"
                        : "transparent",
                  }}
                >
                  <TableCell sx={{ pl: voce.Livello * 2 }}>
                    {voce.Codice}
                  </TableCell>
                  <TableCell>{voce.Descrizione}</TableCell>
                  {/* <TableCell>{voce.Livello}</TableCell> */}
                  <TableCell align="right">
                    {Number(voce.Saldo).toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Box>
  );
}

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Box,
//   Divider,
// } from "@mui/material";

// /**
//  * voci: array di oggetti con struttura:
//  * {
//  *   Sezione: "Attivo",
//  *   Sottosezione: "B.I.2",
//  *   Codice: "B.I.2",
//  *   Livello: 3,
//  *   Descrizione: "Costi di sviluppo",
//  *   Saldo: 0
//  * }
//  */

// export default function TestBilancio({ voci = [] }) {
//   if (!voci.length) {
//     return <Typography>Caricamento dati...</Typography>;
//   }

//   // --- Raggruppamento multilivello ---
//   const bilancio = voci.reduce((acc, voce) => {
//     // Sezione principale (Attivo / Passivo)
//     const sezione = acc[voce.Sezione] || {
//       nome: voce.Sezione.toUpperCase(),
//       categorie: {},
//     };

//     // Prende la "Sottosezione principale" (livello 1 o 2)
//     const parti = voce.Sottosezione.split(".");
//     const categoriaChiave = parti[0]; // Es: "B" da "B.I.2"
//     const categoria = sezione.categorie[categoriaChiave] || {
//       codice: categoriaChiave,
//       nome: voce.Descrizione.includes("Immobilizzazioni")
//         ? "Immobilizzazioni"
//         : voce.Descrizione,
//       sottocategorie: {},
//     };

//     // Se ci sono più livelli (es. B.I, B.I.2), li gestiamo come sottocategorie
//     if (voce.Livello > 1) {
//       const sottocategoriaChiave = voce.Sottosezione;
//       const sottocategoria = categoria.sottocategorie[sottocategoriaChiave] || {
//         codice: voce.Codice,
//         nome: voce.Descrizione,
//         voci: [],
//       };
//       sottocategoria.voci.push(voce);
//       categoria.sottocategorie[sottocategoriaChiave] = sottocategoria;
//     }

//     sezione.categorie[categoriaChiave] = categoria;
//     acc[voce.Sezione] = sezione;
//     return acc;
//   }, {});

//   // --- Rendering ---
//   return (
//     <Box p={3}>
//       {Object.entries(bilancio).map(([sezioneId, sezione]) => (
//         <Box key={sezioneId} mb={4}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             {sezione.nome}
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {Object.entries(sezione.categorie).map(([catId, categoria]) => (
//             <Box key={catId} ml={2} mb={2}>
//               <Typography variant="h6">
//                 {categoria.codice} - {categoria.nome}
//               </Typography>

//               {Object.entries(categoria.sottocategorie).map(
//                 ([subId, sottocategoria]) => (
//                   <Box key={subId} ml={3} mb={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       {sottocategoria.codice} - {sottocategoria.nome}
//                     </Typography>

//                     <Table size="small">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Codice</TableCell>
//                           <TableCell>Voce</TableCell>
//                           <TableCell align="right">Saldo</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {sottocategoria.voci.map((voce, idx) => (
//                           <TableRow key={idx}>
//                             <TableCell>{voce.Codice}</TableCell>
//                             <TableCell>{voce.Descrizione}</TableCell>
//                             <TableCell align="right">
//                               {Number(voce.Saldo).toLocaleString("it-IT", {
//                                 minimumFractionDigits: 2,
//                               })}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </Box>
//                 )
//               )}
//             </Box>
//           ))}
//         </Box>
//       ))}
//     </Box>
//   );
// }
