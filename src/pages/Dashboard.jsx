import { Grid, Card, CardContent, Typography } from "@mui/material";
import ProductTable from "../components/tables/ProductTable";

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Produits analysés", value: 12 },
          { label: "Score moyen", value: "B" },
          { label: "Pays couverts", value: 5 },
        ].map((kpi) => (
          <Grid key={kpi.label} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h4">
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ProductTable />
    </>
  );
}
