import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { Box, Typography } from "@mui/material";

export default function AcvDonut({ value, label, color }) {
  const data = [
    { value },
    { value: 100 - value }
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
          >
            <Cell fill={color} />
            <Cell fill="#E5E7EB" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <Typography
        variant="h6"
        sx={{ mt: -9, fontWeight: 700 }}
      >
        {value}%
      </Typography>

      <Typography variant="body2" mt={4}>
        {label}
      </Typography>
    </Box>
  );
}
