import { Box, Typography, List, ListItemButton, Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const items = [
  { label: "Accueil", to: "/" },
  { label: "Parser Produit", to: "/parser" },
  { label: "NLP Ingrédients", to: "/ingredients" },
  { label: "ACV / LCA", to: "/acv" },
  { label: "Scoring", to: "/scoring" },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      width={260}
      bgcolor="#4CAF50"
      color="white"
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
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

      <Box>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: "white",
            borderRadius: 2,
            "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
          }}
        >
          <LogoutIcon sx={{ mr: 2 }} />
          Déconnexion
        </ListItemButton>
      </Box>
    </Box>
  );
}
