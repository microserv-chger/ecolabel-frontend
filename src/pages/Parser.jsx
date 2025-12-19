// src/pages/ParserProduct.jsx
import { Box } from "@mui/material";
import PageTitle from "../components/PageTitle";
import ParserForm from "../components/ParserForm";

export default function ParserProduct() {
  return (
    <Box p={3}>
      <PageTitle title="Parser Produit" />

      <ParserForm />
    </Box>
  );
}
