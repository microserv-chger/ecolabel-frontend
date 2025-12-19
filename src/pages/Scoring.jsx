import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import DonutChart from "../components/DonutChart";


export default function Scoring() {
  return (
    <Box p={3}>
      <PageTitle title="Scoring" />

      {/* Sélecteur produit */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} md={8}>
          <SelectProduct />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#2E7D32" },
            }}
          >
            Scoring
          </Button>
        </Grid>
      </Grid>

      {/* Scores */}
      <Grid container spacing={3}>
        {/* Score lettre */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography color="text.secondary">
                score lettre
              </Typography>

              <Box
                sx={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  backgroundColor: "#8BC34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  my: 2,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ color: "#fff", fontWeight: 700 }}
                >
                  E
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Score numérique */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography color="text.secondary">
                Score numérique
              </Typography>

              <Typography
                variant="h2"
                sx={{ fontWeight: 700, mt: 2 }}
              >
                75
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Indicateurs ACV */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography fontWeight={600} mb={3}>
            indicateurs ACV
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <DonutChart value={81} color="#F44336" label="CO₂" />
            </Grid>
            <Grid item>
              <DonutChart value={22} color="#4CAF50" label="Eau" />
            </Grid>
            <Grid item>
              <DonutChart value={62} color="#2196F3" label="Énergie" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
