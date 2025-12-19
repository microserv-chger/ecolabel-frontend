// src/components/PageTitle.jsx
import { Typography, Box } from "@mui/material";

export default function PageTitle({ title }) {
  return (
    <Box mb={3}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
}
