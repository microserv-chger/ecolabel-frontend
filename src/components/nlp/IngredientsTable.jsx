import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box,
  Chip,
  Typography
} from "@mui/material";

/**
 * IngredientsTable - Displays a list of extracted ingredients
 * @param {Array} ingredients - List of ingredient objects
 */
export default function IngredientsTable({ ingredients = [] }) {
  if (ingredients.length === 0) {
    return (
      <Box
        sx={{
          background: "white",
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          p: 4,
          textAlign: "center"
        }}
      >
        <Typography color="text.secondary">
          Aucun ingrédient extrait. Parsez un produit pour voir les ingrédients.
        </Typography>
      </Box>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "DAIRY": return "#3B82F6";
      case "SWEETENER": return "#F59E0B";
      case "PACKAGING": return "#EF4444";
      case "GLASS": return "#10B981";
      default: return "#6B7280";
    }
  };

  const getStatusFromImpact = (impactHint) => {
    if (impactHint <= 1.0) return { label: "Faible impact", color: "success" };
    if (impactHint <= 2.0) return { label: "Impact moyen", color: "warning" };
    return { label: "Impact élevé", color: "error" };
  };

  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        overflow: "hidden"
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Ingrédient</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Catégorie</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Impact</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Bio</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Référence Eco</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ingredients.map((ingredient, index) => {
            const status = getStatusFromImpact(ingredient.impactHint);
            return (
              <TableRow key={ingredient.id || index} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{ingredient.name}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={ingredient.category || "OTHER"}
                    size="small"
                    sx={{
                      backgroundColor: getCategoryColor(ingredient.category),
                      color: "white",
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${ingredient.impactHint?.toFixed(1) || "N/A"} kg CO₂`}
                    size="small"
                    color={status.color}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {ingredient.organic ? (
                    <Chip label="BIO" size="small" color="success" />
                  ) : (
                    <Typography color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {ingredient.ecoReference || "-"}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
