import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Chip
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import IngredientsTable from "../components/nlp/IngredientsTable";
import { NLPService } from "../api/services";

export default function Ingredients() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await NLPService.getAllProducts();
      setProducts(data || []);
      // Auto-select the first product if available
      if (data && data.length > 0 && !selectedProductId) {
        setSelectedProductId(data[0].productId);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Erreur lors du chargement des produits. Vérifiez que le service NLP est en cours d'exécution.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedProduct = products.find(p => p.productId === selectedProductId);
  const ingredients = selectedProduct?.ingredients || [];

  return (
    <Box>
      <Typography variant="h5" mb={2} fontWeight={600}>
        NLP Ingrédients
      </Typography>

      {/* Product Selector */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel>Sélectionner un produit</InputLabel>
              <Select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                label="Sélectionner un produit"
                disabled={loading || products.length === 0}
              >
                {products.map((product) => (
                  <MenuItem key={product.productId} value={product.productId}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <span>Produit {product.productId?.substring(0, 8)}...</span>
                      <Chip
                        label={`${product.ingredients?.length || 0} ingrédients`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              onClick={fetchProducts}
              disabled={loading}
            >
              Actualiser
            </Button>

            {products.length > 0 && (
              <Chip
                label={`${products.length} produit(s) traité(s)`}
                color="success"
              />
            )}
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {products.length === 0 && !loading && !error && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Aucun produit traité. Utilisez la page Parser pour extraire les ingrédients d'un produit.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Selected Product Info */}
      {selectedProduct && (
        <Card sx={{ mb: 3, backgroundColor: "#f8fafc" }}>
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary">
                  ID Produit
                </Typography>
                <Typography fontWeight={500}>
                  {selectedProduct.productId}
                </Typography>
              </Box>
              {selectedProduct.gtin && (
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    GTIN
                  </Typography>
                  <Typography fontWeight={500}>
                    {selectedProduct.gtin}
                  </Typography>
                </Box>
              )}
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Traité le
                </Typography>
                <Typography fontWeight={500}>
                  {selectedProduct.processedAt
                    ? new Date(selectedProduct.processedAt).toLocaleString()
                    : "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Ingrédients extraits
                </Typography>
                <Typography fontWeight={500} color="primary">
                  {ingredients.length}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Ingredients Table */}
      <Typography fontWeight={600} mb={2}>
        Tableau des ingrédients
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <IngredientsTable ingredients={ingredients} />
      )}

      {/* Bottom section */}
      {selectedProduct && ingredients.length > 0 && (
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
      )}
    </Box>
  );
}
