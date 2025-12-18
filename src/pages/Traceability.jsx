import { Paper, Typography } from "@mui/material";

export default function Traceability() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={1}>Traçabilité</Typography>
      <Typography color="text.secondary">
        Page prête côté UI. Branchements backend à faire selon le service de provenance/traçabilité.
      </Typography>
    </Paper>
  );
}
