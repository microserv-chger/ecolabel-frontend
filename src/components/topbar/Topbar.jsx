import { Box, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <Box
      height={64}
      display="flex"
      alignItems="center"
      px={3}
      bgcolor="white"
      borderBottom="1px solid #eee"
    >
      <Typography fontWeight={600}>
        Environmental Product Dashboard
      </Typography>
    </Box>
  );
}
