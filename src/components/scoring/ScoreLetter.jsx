import { Box, Typography } from "@mui/material";

const scoreConfig = {
  A: { color: "#22C55E", label: "Excellent impact environnemental" },
  B: { color: "#84CC16", label: "Bon impact environnemental" },
  C: { color: "#FACC15", label: "Impact moyen" },
  D: { color: "#FB923C", label: "Impact élevé" },
  E: { color: "#EF4444", label: "Impact très élevé" },
};

export default function ScoreLetter({ score = "B" }) {
  const config = scoreConfig[score];

  return (
    <Box textAlign="center">
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: config.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
        }}
      >
        <Typography
          variant="h2"
          fontWeight={800}
          color="white"
        >
          {score}
        </Typography>
      </Box>

      <Typography fontWeight={600}>
        Score environnemental
      </Typography>

      <Typography color="text.secondary" fontSize={14}>
        {config.label}
      </Typography>
    </Box>
  );
}
