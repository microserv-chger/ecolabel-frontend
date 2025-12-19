// src/pages/Acv.jsx
import {
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import AcvBarChart from "../components/AcvBarChart";

export default function Acv() {
  const [product, setProduct] = useState("");

  return (
    <Box px={4} py={3} width="100%">
      <PageTitle title="Calcul ACV / LCA" />

      {/* CONTAINER FULL WIDTH */}
      <Card
        sx={{
          width: "100%",
          maxWidth: "1200px", // largeur Figma
          mx: "auto",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ px: 5, py: 4 }}>
          {/* TOP ACTIONS */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <SelectProduct
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  height: 48,
                  backgroundColor: "#4CAF50",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#2E7D32" },
                }}
              >
                CALCUL ACV
              </Button>
            </Grid>
          </Grid>

          {/* CHART */}
          <Box mt={5}>
            <AcvBarChart />
          </Box>

          {/* FOOTER ACTION */}
          <Box mt={4} textAlign="right">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50",
                fontWeight: 600,
                px: 3,
                "&:hover": { backgroundColor: "#2E7D32" },
              }}
            >
              ENVOYER VERS SCORING
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
