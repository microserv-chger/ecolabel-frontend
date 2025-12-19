import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";

export default function AddProductModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    gtin: "",
    brand: "",
    country: "",
    packaging: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // 🛑 Sécurité minimale
    if (!form.name || !form.gtin) return;

    // ✅ ENVOI AU DASHBOARD
    onAdd({
      name: form.name,
      gtin: form.gtin,
      brand: form.brand,
    });

    // reset + close
    setForm({
      name: "",
      gtin: "",
      brand: "",
      country: "",
      packaging: "",
      description: "",
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Ajouter un produit</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              label="GTIN"
              name="gtin"
              fullWidth
              value={form.gtin}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Nom du produit"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Marque"
              name="brand"
              fullWidth
              value={form.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Pays d'origine"
              name="country"
              fullWidth
              value={form.country}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Type d'emballage"
              name="packaging"
              fullWidth
              value={form.packaging}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
