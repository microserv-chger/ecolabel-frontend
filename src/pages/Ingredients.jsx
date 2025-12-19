import {
  Box,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";
import IngredientsTable from "../components/nlp/IngredientsTable";

export default function Ingredients() {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        NLP Ingrédients
      </Typography>

      {/* Search */}
      <TextField
        placeholder="Search..."
        size="small"
        sx={{
          mb: 2,
          width: 260,
          background: "white"
        }}
      />

      <Typography fontWeight={600} mb={2}>
        Tableau des ingrédients
      </Typography>

      <IngredientsTable />

      {/* Bottom section */}
      <Box mt={4}>
        <Typography mb={1}>
          Détails emballage et provenance
        </Typography>

        <TextField
          fullWidth
          placeholder="Saisir les informations..."
          sx={{ background: "white", mb: 3 }}
        />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{
              background: "#22C55E",
              "&:hover": { background: "#16A34A" }
            }}
          >
            Envoyer vers ACV
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: "#22C55E",
              color: "#22C55E"
            }}
          >
            Voir produit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
