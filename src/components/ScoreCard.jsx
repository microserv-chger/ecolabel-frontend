// src/components/ScoreCard.jsx
import { Card, CardContent, Typography } from "@mui/material";

export default function ScoreCard({ title, value, color }) {
  return (
    <Card sx={{ borderTop: `4px solid ${color}` }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
