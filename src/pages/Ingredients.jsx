import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

export default function Ingredients() {
  const ingredients = [
    { name: "Sucre", confidence: "0.92" },
    { name: "Huile de palme", confidence: "0.88" },
    { name: "Cacao", confidence: "0.95" },
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" mb={2}>
        Ingrédients extraits (NLP)
      </Typography>

      <List>
        {ingredients.map((ing, i) => (
          <ListItem key={i}>
            <ListItemText
              primary={ing.name}
              secondary={`Confiance : ${ing.confidence}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
