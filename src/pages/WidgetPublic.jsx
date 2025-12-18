import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { WidgetService } from "../api/services";

export default function WidgetPublic() {
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState(null);

  const fetchPublic = async () => {
    try {
      const res = await WidgetService.publicProduct(productId);
      setResult(res.data);
    } catch {
      alert("Erreur widget public ❌");
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>Widget Public</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={fetchPublic}>
          Charger
        </Button>
      </Box>

      <Paper sx={{ p: 2, bgcolor: "#fafafa" }}>
        <Typography fontWeight={800} mb={1}>Réponse publique</Typography>
        <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {result ? JSON.stringify(result, null, 2) : "Aucun résultat."}
        </pre>
      </Paper>
    </Paper>
  );
}
