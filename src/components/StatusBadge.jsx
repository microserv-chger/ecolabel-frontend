// src/components/StatusBadge.jsx
import { Chip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function StatusBadge({ status }) {
  if (status === "UP") {
    return (
      <Chip
        icon={<ArrowUpwardIcon />}
        label="UP"
        color="success"
        variant="filled"
        size="small"
      />
    );
  }

  return (
    <Chip
      icon={<ArrowDownwardIcon />}
      label="DOWN"
      color="warning"
      variant="filled"
      size="small"
    />
  );
}
