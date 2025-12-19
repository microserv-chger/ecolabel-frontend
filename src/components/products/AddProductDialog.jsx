import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useState } from "react";

export default function AddProductDialog({ open, onClose, onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    gtin: "",
    brand: "",
    category: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAdd(product);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Product</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Product name" name="name" onChange={handleChange} />
          <TextField label="GTIN" name="gtin" onChange={handleChange} />
          <TextField label="Brand" name="brand" onChange={handleChange} />
          <TextField label="Category" name="category" onChange={handleChange} />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
