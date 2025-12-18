import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function AddProductDialog({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    gtin: "",
    brand: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    // 🔥 ON ENVOIE TOUJOURS LE FORMULAIRE AU DASHBOARD
    onCreated(form);

    // reset + close
    setForm({ name: "", gtin: "", brand: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajouter un produit</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Nom du produit"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="GTIN"
            name="gtin"
            value={form.gtin}
            onChange={handleChange}
          />
          <TextField
            label="Marque"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={submit}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
