import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ProductTable from "../components/tables/ProductTable";
import AddProductModal from "../components/AddProductModal";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pâte à tartiner",
      gtin: "3017620425035",
      status: "UP",
      score: "B (78)",
      dateParsing: "2025-12-06 10:12",
      brand: "EcoDelice",
    },
    {
      id: 2,
      name: "Jus d'orange bio",
      gtin: "4006381333931",
      status: "DOWN",
      score: "A (92)",
      dateParsing: "2025-12-05 14:20",
      brand: "BioFruit",
    },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [search, setSearch] = useState("");

  // 🔍 Search + Filter (Figma-like)
  const filteredProducts = products.filter((p) =>
    [p.name, p.gtin, p.brand]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ❌ Delete with confirmation
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // ➕ Add Product
  const handleAddProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Date.now(),
        status: "UP",
        score: "B (75)",
        dateParsing: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
    ]);
  };

  return (
    <Box>
      {/* 🔹 Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={700}>
          Dashboard – Produits
        </Typography>

        <Box display="flex" gap={2}>
          <SearchBar value={search} onChange={setSearch} />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* 📊 Table */}
      <Paper sx={{ p: 2, borderRadius: 3 }}>
        <ProductTable
          rows={filteredProducts}
          onDelete={handleDelete}
        />
      </Paper>

      {/* ➕ Add Product Modal */}
      <AddProductModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddProduct}
      />
    </Box>
  );
}
