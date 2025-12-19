import { Box, Typography } from "@mui/material";

export default function DonutChart({ value, color, label }) {
  const radius = 45;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <Box textAlign="center">
      <Box position="relative" width={120} height={120}>
        <svg width="120" height="120">
          {/* Background */}
          <circle
            stroke="#E5E7EB"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="60"
            cy="60"
          />

          {/* Progress */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>

        {/* Center value */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            fontWeight: 700,
          }}
        >
          <Typography variant="h6">{value}%</Typography>
        </Box>
      </Box>

      <Typography mt={1}>{label}</Typography>
    </Box>
  );
}
