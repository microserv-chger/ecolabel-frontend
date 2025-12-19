import { Box, Typography, Button } from "@mui/material";

export default function WidgetPublic() {
  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Public Widget
      </Typography>

      <Typography mb={2}>
        Widget à intégrer sur un site externe
      </Typography>

      <Button variant="contained">
        Générer widget
      </Button>
    </Box>
  );
}
