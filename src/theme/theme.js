import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#43a047" }, // vert
    success: { main: "#43a047" },
    background: { default: "#f6f7fb" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Arial"].join(","),
    h5: { fontWeight: 800 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { border: "1px solid rgba(0,0,0,0.06)" },
      },
    },
  },
  MuiButton: {
  styleOverrides: {
    root: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
},

});

export default theme;
