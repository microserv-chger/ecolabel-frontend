import { Box, Typography, Stack } from "@mui/material";

const defaultData = [
  { label: "CO2 (kg)", value: 0, color: "#4F46E5" },
  { label: "Eau (L)", value: 0, color: "#0EA5E9" },
  { label: "Énergie (MJ)", value: 0, color: "#22C55E" },
];

export default function AcvBarChart({ data = defaultData }) {
  const maxValue = Math.max(...data.map((d) => d.value || 0), 1);

  return (
    <Box>
      <Typography fontWeight={700} mb={2}>
        Indicateurs ACV (totaux)
      </Typography>

      <Stack direction="row" spacing={4} alignItems="flex-end" height={220}>
        {data.map((item) => {
          const height = Math.max((item.value / maxValue) * 160, 4);
          return (
            <Box
              key={item.label}
              textAlign="center"
              sx={{ minWidth: 90, px: 1 }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#111827", fontWeight: 700, mb: 1, display: "block" }}
              >
                {item.value?.toLocaleString(undefined, { maximumFractionDigits: 3 }) ?? "0"}
              </Typography>

              <Box
                width={32}
                height={height}
                bgcolor={item.color}
                borderRadius={14}
                mx="auto"
                boxShadow="0 8px 24px rgba(0,0,0,0.08)"
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
      </Stack>
    </Box>
  );
}
