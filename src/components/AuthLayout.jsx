// src/components/AuthLayout.jsx
import { Box, Grid } from "@mui/material";
import authImage from "../assets/1.webp"; // ✅ import correct

export default function AuthLayout({ children }) {
  return (
    <Grid container minHeight="100vh">
      {/* Formulaire */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Box width="100%" maxWidth={400}>
          {children}
        </Box>
      </Grid>

      {/* Image */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
