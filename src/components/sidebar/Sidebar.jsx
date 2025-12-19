import { Box, Typography, List, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";

const items = [
  { label: "Accueil", to: "/" },
  { label: "Parser Produit", to: "/parser" },
  { label: "NLP Ingrédients", to: "/ingredients" },
  { label: "ACV / LCA", to: "/acv" },
  { label: "Scoring", to: "/scoring" },
];

export default function Sidebar() {
  return (
    <Box width={260} bgcolor="#4CAF50" color="white" p={3}>
      <Typography fontWeight={700} mb={4}>
        bienvenu
      </Typography>

      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            sx={{
              color: "white",
              borderRadius: 2,
              mb: 1,
              "&.active": { bgcolor: "rgba(0,0,0,0.15)" },
            }}
          >
            {item.label}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
