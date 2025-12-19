import { Chip } from "@mui/material";

const statusConfig = {
  Valide: { label: "Valide", color: "#22C55E" },
  Attention: { label: "Attention", color: "#F59E0B" },
  Interdit: { label: "Interdit", color: "#EF4444" }
};

export default function IngredientStatusBadge({ status }) {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.color,
        color: "white",
        fontWeight: 600,
        borderRadius: "8px"
      }}
    />
  );
}
