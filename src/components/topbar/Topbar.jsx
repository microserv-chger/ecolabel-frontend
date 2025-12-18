import { Box, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <Box
      height={64}
      display="flex"
      alignItems="center"
      px={3}
      borderBottom="1px solid rgba(0,0,0,0.06)"
    >
      <Typography fontWeight={700}>
        Environmental Product Dashboard
      </Typography>
    </Box>
  );
}
