// src/components/SelectProduct.jsx
import { MenuItem, TextField } from "@mui/material";

export default function SelectProduct({ value, onChange, products = [] }) {
  return (
    <TextField
      select
      label="Sélectionner un produit"
      value={value}
      onChange={onChange}
      fullWidth
    >
      {products.length === 0 ? (
        <MenuItem disabled value="">
          Aucun produit disponible
        </MenuItem>
      ) : (
        products.map((p) => (
          <MenuItem key={p.productId} value={p.productId}>
            Produit {p.productId?.substring(0, 8)}... ({p.ingredients?.length || 0} ingr.)
          </MenuItem>
        ))
      )}
    </TextField>
  );
}
