// src/pages/Acv.jsx
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import AcvBarChart from "../components/AcvBarChart";
import { LCAService, NLPService } from "../api/services";

export default function Acv() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [transportKm, setTransportKm] = useState(100);
  const [transportMode, setTransportMode] = useState("road");
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setFetchingProducts(true);
      try {
        const data = await NLPService.getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Erreur lors du chargement des produits.");
      } finally {
        setFetchingProducts(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const prod = products.find(p => p.productId === productId);
    if (prod && prod.ingredients) {
      setIngredients(prod.ingredients.map(ing => ({
        ...ing,
        impactHint: ing.impactHint || 1.0 // Default if 0
      })));
    } else {
      setIngredients([]);
    }
    setChartData(null);
  };

  const handleIngredientImpactChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].impactHint = parseFloat(value) || 0;
    setIngredients(newIngredients);
  };

  const handleCalculate = async () => {
    if (!selectedProductId) {
      setError("Veuillez sélectionner un produit.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const request = {
        productId: selectedProductId,
        ingredients: ingredients.map(ing => ({
          name: ing.name,
          category: ing.category,
          impactHint: ing.impactHint
        })),
        transportKm: parseInt(transportKm),
        transportMode: transportMode
      };

      const result = await LCAService.calculate(request);

      const newData = [
        { label: "CO₂ (kg)", value: result.totalCo2Kg || 0, color: "#9DBCF9" },
        { label: "Eau (L)", value: result.totalWaterLiters || 0, color: "#66E0D0" },
        { label: "Énergie (MJ)", value: result.totalEnergyMj || 0, color: "#10B981" },
        { label: "Total Ratio", value: 100, color: "#F59E0B" },
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

      <Card sx={{ width: "100%", maxWidth: "1200px", mx: "auto", borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ px: 5, py: 4 }}>
          <Grid container spacing={3}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            {/* Product Selection */}
            <Grid item xs={12} md={6}>
              <SelectProduct
                value={selectedProductId}
                onChange={handleProductChange}
                products={products}
                disabled={fetchingProducts}
              />
            </Grid>

            {/* Transport Options */}
            <Grid item xs={6} md={3}>
              <TextField
                label="Transport (km)"
                type="number"
                fullWidth
                value={transportKm}
                onChange={(e) => setTransportKm(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                select
                label="Mode de transport"
                fullWidth
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
              >
                <MenuItem value="road">Route (Camion)</MenuItem>
                <MenuItem value="air">Air (Avion)</MenuItem>
                <MenuItem value="sea">Mer (Bateau)</MenuItem>
                <MenuItem value="rail">Rail (Train)</MenuItem>
              </TextField>
            </Grid>

            {/* Ingredients Table for Review */}
            {ingredients.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Révision des ingrédients (AVC/LCA)
                </Typography>
                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2, overflow: "hidden" }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Ingrédient</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Catégorie</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Impact Ratio (Poids/Impact)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ingredients.map((ing, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{ing.name}</TableCell>
                          <TableCell>{ing.category}</TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={ing.impactHint}
                              onChange={(e) => handleIngredientImpactChange(idx, e.target.value)}
                              sx={{ width: 100 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCalculate}
                disabled={loading || !selectedProductId}
                sx={{
                  height: 48,
                  backgroundColor: "#4CAF50",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "GÉNÉRER LE CALCUL ACV"}
              </Button>
            </Grid>
          </Grid>

          {/* Result Chart */}
          {chartData && (
            <Box mt={5}>
              <AcvBarChart data={chartData} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
