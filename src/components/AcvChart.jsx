import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  {
    name: "CO₂ (kg eq)",
    value: 16000,
    color: "#9EC5FE",
  },
  {
    name: "Eau (litres)",
    value: 30000,
    color: "#5EEAD4",
  },
  {
    name: "Énergie (kWh)",
    value: 22000,
    color: "#000000",
  },
  {
    name: "Other",
    value: 26000,
    color: "#86EFAC",
  },
];

export default function AcvChart() {
  return (
    <Box>
      <Typography
        fontWeight={600}
        mb={3}
      >
        Cartes indicateurs ACV
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          barSize={45}
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            formatter={(value) => value.toLocaleString()}
          />

          {data.map((entry, index) => (
            <Bar
              key={index}
              dataKey="value"
              fill={entry.color}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
