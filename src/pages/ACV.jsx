// src/pages/Acv.jsx
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Alert
} from "@mui/material";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import AcvBarChart from "../components/AcvBarChart";
import { LCAService } from "../api/services";

export default function Acv() {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleCalculate = async () => {
    // We need a product selected (assuming product has ID or ingredients)
    // For this demo/task, we'll create a dummy request if no prod selected, or use the selected one.
    // In real app, SelectProduct should give us an ID.
    setLoading(true);
    setError(null);
    try {
      const dummyRequest = {
        productId: "00000000-0000-0000-0000-000000000000", // Dummy UUID
        ingredients: [
          { name: "Sugar", category: "Plant", impactHint: 10 }
        ],
        transportKm: 150,
        transportMode: "road"
      };

      const result = await LCAService.calculate(dummyRequest);
      // Map result to chart format
      // Result is likely LcaResultDto: { totalCo2Kg, totalWaterLiters, totalEnergyMj }
      const newData = [
        { label: "CO₂ (kg)", value: result.totalCo2Kg || 0, color: "#9DBCF9" },
        { label: "Eau (L)", value: result.totalWaterLiters || 0, color: "#66E0D0" },
        { label: "Énergie (MJ)", value: result.totalEnergyMj || 0, color: "#000000" },
        { label: "Other", value: 100, color: "#7BE495" },
      ];
      setChartData(newData);

    } catch (err) {
      console.error(err);
      setError("Erreur lors du calcul ACV. Vérifiez le backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={4} py={3} width="100%">
      <PageTitle title="Calcul ACV / LCA" />

      {/* CONTAINER FULL WIDTH */}
      <Card
        sx={{
          width: "100%",
          maxWidth: "1200px", // largeur Figma
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ px: 5, py: 4 }}>
          {/* TOP ACTIONS */}
          <Grid container spacing={2} alignItems="center">
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            <Grid item xs={12} md={8}>
              <SelectProduct
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCalculate}
                disabled={loading}
                sx={{
                  height: 48,
                  backgroundColor: "#4CAF50",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
              >
                {loading ? "CALCUL..." : "CALCUL ACV"}
              </Button>
            </Grid>
          </Grid>

          {/* CHART */}
          <Box mt={5}>
            <AcvBarChart data={chartData || undefined} />
          </Box>

          {/* FOOTER ACTION */}
          <Box mt={4} textAlign="right">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "#2E7D32" },
              }}
            >
              ENVOYER VERS SCORING
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
