import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";

export default function BilancioTable({ voci }) {
  if (!voci.length) {
    return <Typography>Caricamento dati...</Typography>;
  }

  

  // Raggruppamento multilivello: sezione → categoria → sottocategoria → voci
  const bilancio = voci.reduce((acc, voce) => {
    const sezione = acc[voce.sezione_id] || {
      nome: voce.sezione_id === 1 ? "ATTIVO" : "PASSIVO",
      categorie: {},
    };
    const categoria = sezione.categorie[voce.categoria_id] || {
      nome: voce.categoria_id === 2 ? "Immobilizzazioni" : "Attivo circolante",
      sottocategorie: {},
    };
    const sottocategoria = categoria.sottocategorie[voce.sottocategoria] || {
      codice: voce.sottocategoria_codice,
      nome: voce.sottocategoria_nome,
      voci: [],
    };

    sottocategoria.voci.push(voce);
    categoria.sottocategorie[voce.sottocategoria] = sottocategoria;
    sezione.categorie[voce.categoria_id] = categoria;
    acc[voce.sezione_id] = sezione;
    return acc;
  }, {});

  return (
    <Box p={3}>
      {Object.entries(bilancio).map(([sezioneId, sezione]) => (
        <Box key={sezioneId} mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {sezione.nome}
          </Typography>

          {Object.entries(sezione.categorie).map(([catId, categoria]) => (
            <Box key={catId} ml={2} mb={2}>
              <Typography variant="h6">{categoria.nome}</Typography>

              {Object.entries(categoria.sottocategorie).map(
                ([subId, sottocategoria]) => (
                  <Box key={subId} ml={3} mb={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {sottocategoria.codice} - {sottocategoria.nome}
                    </Typography>

                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Codice</TableCell>
                          <TableCell>Voce</TableCell>
                          <TableCell align="right">Saldo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sottocategoria.voci.map((voce) => (
                          <TableRow key={voce.id}>
                            <TableCell>{voce.codice}</TableCell>
                            <TableCell>{voce.nome}</TableCell>
                            <TableCell align="right">{voce.saldo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
