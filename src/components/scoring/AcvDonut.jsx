import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function AcvDonut({ value, label, color }) {
  const data = [
    { value },
    { value: 100 - value },
  ];

  return (
    <Box textAlign="center">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={45}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#E5E7EB" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Pourcentage centré */}
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mt: "-92px" }}
      >
        {value}%
      </Typography>

      <Typography mt={6} fontSize={14}>
        {label}
      </Typography>
    </Box>
  );
}
