import { Box, Typography } from "@mui/material";

const data = [
  { label: "CO₂ (kg eq)", value: 16000, color: "#9DBCF9" },
  { label: "Eau (litres)", value: 30000, color: "#66E0D0" },
  { label: "Énergie (kWh)", value: 21000, color: "#000000" },
  { label: "Other", value: 26000, color: "#7BE495" },
];

const MAX_VALUE = 30000;

export default function AcvBarChart() {
  return (
    <Box>
      <Typography fontWeight={600} mb={2}>
        Cartes indicateurs ACV
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        height={220}
        px={30}
      >
        {data.map((item) => {
          const height = (item.value / MAX_VALUE) * 160;

          return (
            <Box key={item.label} textAlign="center">
              <Typography
                variant="caption"
                sx={{ color: "#6B7280", mb: 1, display: "block" }}
              >
                {item.value.toLocaleString()}
              </Typography>

              <Box
                width={24}
                height={height}
                bgcolor={item.color}
                borderRadius={12}
                mx="auto"
              />

              <Typography
                variant="caption"
                sx={{ color: "#6B7280", mt: 1, display: "block" }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
