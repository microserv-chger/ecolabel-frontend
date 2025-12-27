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
  CircularProgress,
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
  const [lcaResult, setLcaResult] = useState(null);

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
    const prod = products.find((p) => p.productId === productId);
    if (prod && prod.ingredients) {
      setIngredients(
        prod.ingredients.map((ing) => ({
          ...ing,
          quantity_g: ing.quantity_g ?? (ing.impactHint ? ing.impactHint * 100 : 100),
        }))
      );
    } else {
      setIngredients([]);
    }
    setChartData(null);
    setLcaResult(null);
  };

  const handleIngredientQuantityChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity_g = parseFloat(value) || 0;
    setIngredients(newIngredients);
  };

  const handleCalculate = async () => {
    if (!selectedProductId) {
      setError("Veuillez selectionner un produit.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const request = {
        productId: selectedProductId,
        ingredients: ingredients.map((ing) => ({
          name: ing.name,
          category: ing.category,
          quantity_g: ing.quantity_g ?? 0,
        })),
        transport: {
          mode: (transportMode || "road").toUpperCase(),
          distance_km: parseFloat(transportKm) || 0,
          weight_g: 500,
        },
        packaging: {
          material: "OTHER",
          weight_g: 200,
        },
      };

      const result = await LCAService.calculate(request);

      const newData = [
        { label: "CO2 (kg)", value: result.co2_kg || 0, color: "#9DBCF9" },
        { label: "Eau (L)", value: result.water_l || 0, color: "#66E0D0" },
        { label: "Energie (MJ)", value: result.energy_mj || 0, color: "#10B981" },
      ];
      setChartData(newData);
      setLcaResult(result);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.detail || "Erreur lors du calcul ACV. Verifiez le backend.");
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

            <Grid item xs={12} md={6}>
              <SelectProduct
                value={selectedProductId}
                onChange={handleProductChange}
                products={products}
                disabled={fetchingProducts}
              />
            </Grid>

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

            {ingredients.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="text.secondary">
                  Revision des ingredients (AVC/LCA)
                </Typography>
                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2, overflow: "hidden" }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Ingredient</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Categorie</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Quantite (g)</TableCell>
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
                              value={ing.quantity_g}
                              onChange={(e) => handleIngredientQuantityChange(idx, e.target.value)}
                              sx={{ width: 120 }}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "Generer le calcul ACV"}
              </Button>
            </Grid>
          </Grid>

          {chartData && (
            <Box mt={5}>
              <AcvBarChart data={chartData} />
            </Box>
          )}

          {lcaResult && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Détails du calcul
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Poste</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>CO2 (kg)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Eau (L)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Énergie (MJ)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Ingrédients</TableCell>
                    <TableCell>{(lcaResult.breakdown?.ingredients?.co2_kg ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.ingredients?.water_l ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.ingredients?.energy_mj ?? 0).toFixed(3)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Emballage</TableCell>
                    <TableCell>{(lcaResult.breakdown?.packaging?.co2_kg ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.packaging?.water_l ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.packaging?.energy_mj ?? 0).toFixed(3)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Transport</TableCell>
                    <TableCell>{(lcaResult.breakdown?.transport?.co2_kg ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.transport?.water_l ?? 0).toFixed(3)}</TableCell>
                    <TableCell>{(lcaResult.breakdown?.transport?.energy_mj ?? 0).toFixed(3)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{(lcaResult.co2_kg ?? 0).toFixed(3)}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{(lcaResult.water_l ?? 0).toFixed(3)}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{(lcaResult.energy_mj ?? 0).toFixed(3)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
