import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Paper,
  TableContainer,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductTable({ products = [], onDelete }) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Liste des produits
      </Typography>

      {products.length === 0 ? (
        <Typography color="text.secondary">
          Aucun produit pour le moment
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell>GTIN</TableCell>
                <TableCell>Marque</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Score</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{
                    transition: "background-color .2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(67,160,71,0.08)",
                    },
                  }}
                >
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.gtin}</TableCell>
                  <TableCell>{p.brand}</TableCell>

                  <TableCell>
                    <Chip
                      label={p.status}
                      color={p.status === "UP" ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={p.score}
                      color="primary"
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="error"
                      onClick={() => onDelete(p.id)}
                      sx={{
                        transition: "transform .15s ease",
                        "&:hover": {
                          transform: "scale(1.15)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
