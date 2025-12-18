import { Box, Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function DashboardLayout() {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
        <Topbar />

        <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
