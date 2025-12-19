// src/components/ParserForm.jsx
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

export default function ParserForm() {
  return (
    <Card
      sx={{
        maxWidth: 600,
        border: "1px dashed #cfcfcf",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="GTIN" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Nom du produit" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Marque" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Pays d'origine" />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Type d'emballage" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description / Texte brut"
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
