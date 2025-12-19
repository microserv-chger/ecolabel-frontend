import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "CO₂ (kg eq)", value: 16000, color: "#9EC5FE" },
  { name: "Eau (litres)", value: 30000, color: "#5EEAD4" },
  { name: "Énergie (kWh)", value: 21000, color: "#000000" },
  { name: "Other", value: 25000, color: "#86EFAC" }
];

export default function AcvBarChart() {
  return (
    <Box
      sx={{
        background: "#F8FAFC",
        borderRadius: 3,
        p: 3
      }}
    >
      <Typography fontWeight={600} mb={2}>
        Cartes indicateurs ACV
      </Typography>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            fontSize={12}
          />
          {data.map((entry, index) => (
            <Bar
              key={index}
              dataKey="value"
              fill={entry.color}
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
