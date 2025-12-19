// src/layouts/DashboardLayout.jsx
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F4F6F8" }}>
      <Sidebar />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />

        {/* CONTENU LARGE */}
        <Box sx={{ p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
