import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Box
} from "@mui/material";
import IngredientStatusBadge from "./IngredientStatusBadge";

const rows = [
  {
    brut: "Sucre",
    normalise: "Sucre blanc",
    status: "Valide",
    percent: "20%",
    label: "BIO",
    categorie: "Sucre"
  },
  {
    brut: "Huile de palme",
    normalise: "Huile de palme",
    status: "Attention",
    percent: "15%",
    label: "RSPO",
    categorie: "Huile"
  }
];

export default function IngredientsTable() {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 3,
        border: "1px solid #E5E7EB"
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Ingrédient brut</TableCell>
            <TableCell>Ingrédient normalisé</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Pourcentage</TableCell>
            <TableCell>Labels</TableCell>
            <TableCell>Catégorie</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>{row.brut}</TableCell>
              <TableCell>{row.normalise}</TableCell>
              <TableCell>
                <IngredientStatusBadge status={row.status} />
              </TableCell>
              <TableCell>{row.percent}</TableCell>
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.categorie}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
