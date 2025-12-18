import { Typography, Paper } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

export default function Scoring() {
  const score = { letter: "B", value: 78 };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Score environnemental
      </Typography>

      <Typography variant="h3" color="success.main">
        {score.letter}
      </Typography>
      <Typography>Score : {score.value}/100</Typography>

      <PieChart width={300} height={250}>
        <Pie
          data={[
            { value: score.value },
            { value: 100 - score.value },
          ]}
          innerRadius={60}
          outerRadius={90}
        >
          <Cell fill="#4CAF50" />
          <Cell fill="#E0E0E0" />
        </Pie>
      </PieChart>
    </Paper>
  );
}
