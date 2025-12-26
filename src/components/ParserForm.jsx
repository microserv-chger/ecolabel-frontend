// src/components/ParserForm.jsx
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Alert
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { ParserService } from "../api/services";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ParserForm() {
  const [formData, setFormData] = useState({
    gtin: "",
    name: "",
    brand: "",
    originCountry: "",
    packaging: "",
    rawText: "",
  });

  const [file, setFile] = useState(null);
  const [parsedProduct, setParsedProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Backend expects ProductParseRequest
      // Required fields: gtin, name

      let imageBase64 = "";
      let pdfBase64 = "";

      if (file) {
        const base64Full = await convertBase64(file);
        // Strip data:content/type;base64, prefix
        const base64Content = base64Full.split(',')[1];

        if (file.type === "application/pdf") {
          pdfBase64 = base64Content;
        } else if (file.type.startsWith("image/")) {
          imageBase64 = base64Content;
        }
      }

      const request = {
        ...formData,
        imageBase64,
        pdfBase64
      };

      const response = await ParserService.parseProduct(request);
      setSuccess(`Produit parsé avec succès! ID: ${response.productId}`);

      // Fetch the parsed product details to display
      try {
        const productDetails = await ParserService.getParsedProduct(response.productId);
        setParsedProduct(productDetails);
      } catch (fetchErr) {
        console.warn("Could not fetch product details:", fetchErr);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors du parsing du produit. Vérifiez que le backend tourne.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        border: "1px dashed #cfcfcf",
        mx: "auto"
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          <Grid item xs={12} textAlign="center">
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image/PDF
              <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*,application/pdf" />
            </Button>
            {file && <Typography variant="caption" display="block" mt={1}>Selected: {file.name}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="GTIN"
              name="gtin"
              value={formData.gtin}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nom du produit"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Marque"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pays d'origine"
              name="originCountry"
              value={formData.originCountry}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type d'emballage"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description / Texte brut"
              name="rawText"
              value={formData.rawText}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center" mt={2}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
              >
                {loading ? "Envoi..." : "Submit"}
              </Button>
            </Box>
          </Grid>

          {/* Parsed Product Result Display */}
          {parsedProduct && (
            <Grid item xs={12}>
              <Card sx={{ mt: 3, backgroundColor: "#f5f5f5" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "#2E7D32" }}>
                    Résultat du Parsing
                  </Typography>
                  <Box sx={{ display: "grid", gap: 1 }}>
                    <Typography><strong>ID:</strong> {parsedProduct.id}</Typography>
                    <Typography><strong>GTIN:</strong> {parsedProduct.gtin}</Typography>
                    <Typography><strong>Nom:</strong> {parsedProduct.name}</Typography>
                    {parsedProduct.brand && <Typography><strong>Marque:</strong> {parsedProduct.brand}</Typography>}
                    {parsedProduct.originCountry && <Typography><strong>Origine:</strong> {parsedProduct.originCountry}</Typography>}
                    {parsedProduct.packaging && <Typography><strong>Emballage:</strong> {parsedProduct.packaging}</Typography>}
                    {parsedProduct.rawText && (
                      <Box>
                        <Typography><strong>Texte extrait:</strong></Typography>
                        <Typography variant="body2" sx={{
                          backgroundColor: "#fff",
                          p: 1,
                          borderRadius: 1,
                          maxHeight: 150,
                          overflow: "auto",
                          whiteSpace: "pre-wrap"
                        }}>
                          {parsedProduct.rawText}
                        </Typography>
                      </Box>
                    )}
                    {parsedProduct.parsedAt && <Typography variant="caption" color="text.secondary">Parsé le: {new Date(parsedProduct.parsedAt).toLocaleString()}</Typography>}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
