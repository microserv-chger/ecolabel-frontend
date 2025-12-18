import { Box, Typography, List, ListItemButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory2";
import ScienceIcon from "@mui/icons-material/Science";
import BarChartIcon from "@mui/icons-material/BarChart";

const items = [
  { label: "Dashboard", to: "/", icon: <InventoryIcon /> },
  { label: "Parser", to: "/parser", icon: <ScienceIcon /> },
  { label: "Scoring", to: "/scoring", icon: <BarChartIcon /> },
];

export default function Sidebar() {
  return (
    <Box
      width={260}
      bgcolor="#0f172a"
      color="white"
      p={2}
      sx={{ transition: "width .3s ease" }}
    >
      <Typography variant="h6" fontWeight={800} mb={3}>
        EcoLabel
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
              "&.active": {
                bgcolor: "rgba(255,255,255,0.12)",
              },
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            {item.icon}
            <Typography ml={2}>{item.label}</Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
