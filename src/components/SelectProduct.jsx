// src/components/SelectProduct.jsx
import { MenuItem, TextField } from "@mui/material";

export default function SelecProduct({ value, onChange }) {
  return (
    <TextField
      select
      label="Produit"
      value={value}
      onChange={onChange}
      fullWidth
    >
      <MenuItem value="pate">Pâte à tartiner</MenuItem>
      <MenuItem value="jus">Jus d’orange bio</MenuItem>
    </TextField>
  );
}
