import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { ParserService } from "../api/services";

export default function Parser() {
  const [form, setForm] = useState({
    gtin: "",
    name: "",
    brand: "",
    originCountry: "",
    packaging: "",
    rawText: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await ParserService.parse(form);
      alert("Produit envoyé pour analyse");
    } catch {
      alert("Erreur parsing produit");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="h5" mb={2}>
        Parser un produit
      </Typography>

      {[
        { label: "GTIN", name: "gtin" },
        { label: "Nom du produit", name: "name" },
        { label: "Marque", name: "brand" },
        { label: "Pays d'origine", name: "originCountry" },
        { label: "Emballage", name: "packaging" },
      ].map((f) => (
        <TextField
          key={f.name}
          label={f.label}
          name={f.name}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
      ))}

      <TextField
        label="Texte brut / ingrédients"
        name="rawText"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        onChange={handleChange}
      />

      <Button variant="contained" color="success" onClick={submit}>
        Lancer l’analyse
      </Button>
    </Paper>
  );
}
