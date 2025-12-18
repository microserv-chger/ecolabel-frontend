import { Typography, Paper } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

export default function ACV() {
  const data = [
    { name: "CO2", value: 65 },
    { name: "Eau", value: 20 },
    { name: "Énergie", value: 15 },
  ];

  const colors = ["#e53935", "#1e88e5", "#43a047"];

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Analyse ACV simplifiée
      </Typography>

      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
      </PieChart>
    </Paper>
  );
}
