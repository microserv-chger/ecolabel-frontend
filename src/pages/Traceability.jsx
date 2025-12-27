import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Divider,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SearchIcon from "@mui/icons-material/Search";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BarChartIcon from "@mui/icons-material/BarChart";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";

import PageTitle from "../components/PageTitle";
import SelectProduct from "../components/SelectProduct";
import { ScoringService, NLPService } from "../api/services";

export default function Traceability() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [provenance, setProvenance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await NLPService.getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Erreur produits:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleFetchProvenance = async (productId) => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ScoringService.getProvenance(productId);
      setProvenance(data);
      if (data.length === 0) {
        setError("Aucune donnée de traçabilité trouvée. Exécutez le cycle complet.");
      }
    } catch (err) {
      setError("Erreur lors de la récupération de la traçabilité.");
      setProvenance([]);
    } finally {
      setLoading(false);
    }
  };

  const onProductChange = (e) => {
    const id = e.target.value;
    setSelectedProductId(id);
    handleFetchProvenance(id);
  };

  const getStepIcon = (step) => {
    switch (step) {
      case "PARSING": return <SearchIcon />;
      case "NLP": return <PsychologyIcon />;
      case "LCA": return <BarChartIcon />;
      case "SCORING": return <VerifiedUserIcon />;
      default: return <FilterHdrIcon />;
    }
  };

  const getStepColor = (step) => {
    switch (step) {
      case "PARSING": return "primary";
      case "NLP": return "info";
      case "LCA": return "secondary";
      case "SCORING": return "success";
      default: return "grey";
    }
  };

  return (
    <Box p={3}>
      <PageTitle title="Traçabilité & Provenance" />

      <Typography variant="body1" color="text.secondary" mb={4}>
        Historique complet du cycle de vie de la donnée, de l'extraction brute au score final.
        Géré par <b>Kafka Event Sourcing</b>.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>Sélection</Typography>
              <SelectProduct
                products={products}
                value={selectedProductId}
                onChange={onProductChange}
              />
            </CardContent>
          </Card>

          {provenance.length > 0 && (
            <Card sx={{ mt: 3, borderRadius: 3, bgcolor: "primary.main", color: "#fff" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>Fiabilité</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Les données ci-contre sont certifiées par le protocole d'audit interne.
                  Chaque étape est versionnée via DVC et stockée sur MinIO.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          {loading ? (
            <Box display="flex" justifyContent="center" py={10}>
              <CircularProgress color="success" />
            </Box>
          ) : error ? (
            <Alert severity="info">{error}</Alert>
          ) : provenance.length > 0 ? (
            <Timeline position="alternate">
              {provenance.map((entry, index) => (
                <TimelineItem key={entry.id}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                    {new Date(entry.timestamp).toLocaleString()}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={getStepColor(entry.stepName)}>
                      {getStepIcon(entry.stepName)}
                    </TimelineDot>
                    {index < provenance.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Card sx={{
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": { boxShadow: "0 8px 30px rgba(0,0,0,0.1)", transform: "translateY(-4px)" }
                    }}>
                      <CardContent>
                        <Typography variant="h6" component="span" fontWeight={700}>
                          {entry.stepName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                          {entry.metadata}
                        </Typography>
                        <Box mt={1}>
                          <Typography variant="caption" sx={{
                            px: 1, py: 0.5, borderRadius: 1,
                            bgcolor: entry.status === 'SUCCESS' ? 'success.light' : 'error.light',
                            color: entry.status === 'SUCCESS' ? 'success.dark' : 'error.dark',
                            fontWeight: 700
                          }}>
                            {entry.status}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            <Box textAlign="center" py={10} color="text.disabled">
              <VerifiedUserIcon sx={{ fontSize: 80, mb: 2, opacity: 0.2 }} />
              <Typography variant="h6">Sélectionnez un produit pour voir sa traçabilité</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
