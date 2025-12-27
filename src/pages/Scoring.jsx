
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import DonutChart from "../components/DonutChart";
import { ScoringService, NLPService } from "../api/services";

export default function Scoring() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [scoringData, setScoringData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await NLPService.getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleFetchScore = async () => {
    if (!selectedProductId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ScoringService.getByProduct(selectedProductId);
      setScoringData(data);
    } catch (err) {
      console.error("Erreur lors de la récupération du score:", err);
      setError("Aucun score trouvé pour ce produit. Calculez d'abord l'ACV.");
      setScoringData(null);
    } finally {
      setLoading(false);
    }
  };

  const getLetterColor = (letter) => {
    switch (letter) {
      case "A": return "#4CAF50"; // Green
      case "B": return "#8BC34A"; // Light Green
      case "C": return "#FFEB3B"; // Yellow
      case "D": return "#FF9800"; // Orange
      case "E": return "#F44336"; // Red
      default: return "#9E9E9E"; // Grey
    }
  };

  // Helper to calculate percentage impact relative to benchmarks
  const calculateImpactPct = (value, max) => {
    return Math.min(100, Math.round((value / max) * 100));
  };

  return (
    <Box p={3}>
      <PageTitle title="Scoring" />

      {/* Sélecteur produit */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} md={8}>
          <SelectProduct
            products={products}
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleFetchScore}
            disabled={!selectedProductId || loading}
            sx={{
              backgroundColor: "#4CAF50",
              height: "56px",
              "&:hover": { backgroundColor: "#2E7D32" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "VOIR LE SCORING"}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {scoringData && (
        <>
          {/* Scores */}
          <Grid container spacing={3}>
            {/* Score lettre */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                    Eco-score
                  </Typography>

                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      backgroundColor: getLetterColor(scoringData.scoreLetter),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      my: 3,
                      boxShadow: `0 8px 16px ${getLetterColor(scoringData.scoreLetter)}44`,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.05)" }
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{ color: "#fff", fontWeight: 800 }}
                    >
                      {scoringData.scoreLetter}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Basé sur l'analyse de cycle de vie
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Score numérique */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
                    Score numérique / 100
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 800, mt: 4, mb: 1, color: "primary.main" }}
                  >
                    {Math.round(scoringData.scoreValue)}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ opacity: 0.7 }}>
                    Performance environnementale
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Indicateurs ACV */}
          <Card sx={{ mt: 4, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <CardContent sx={{ py: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={4} textAlign="center">
                Détail des indicateurs ACV
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                  <DonutChart
                    value={calculateImpactPct(scoringData.co2, 10)}
                    color="#F44336"
                    label="CO₂"
                  />
                  <Typography variant="body2" mt={2} fontWeight={600}>
                    {scoringData.co2.toFixed(1)} kg
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                  <DonutChart
                    value={calculateImpactPct(scoringData.water, 1000)}
                    color="#2196F3"
                    label="Eau"
                  />
                  <Typography variant="body2" mt={2} fontWeight={600}>
                    {scoringData.water.toFixed(1)} L
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                  <DonutChart
                    value={calculateImpactPct(scoringData.energy, 50)}
                    color="#FF9800"
                    label="Énergie"
                  />
                  <Typography variant="body2" mt={2} fontWeight={600}>
                    {scoringData.energy.toFixed(1)} MJ
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}

