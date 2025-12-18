import { useMemo, useState } from "react";
import { Box, Paper, Typography, Button, TextField, Divider } from "@mui/material";
import AppToast from "../components/common/AppToast";
import { getCurrentProductId, setCurrentProductId } from "../state/productState";
import { NLPService, LCAService, ScoringService, WidgetService } from "../api/services";

export default function Pipeline() {
  const [productId, setProductId] = useState(getCurrentProductId());
  const [loading, setLoading] = useState(false);

  const [nlp, setNlp] = useState(null);
  const [lca, setLca] = useState(null);
  const [score, setScore] = useState(null);
  const [widget, setWidget] = useState(null);

  const [toast, setToast] = useState({ open: false, severity: "success", message: "" });

  const canRun = useMemo(() => String(productId || "").trim().length > 0, [productId]);

  const notify = (severity, message) => setToast({ open: true, severity, message });

  const runAll = async () => {
    if (!canRun) return notify("warning", "Entre un productId d'abord.");
    setLoading(true);

    try {
      const id = String(productId).trim();
      setCurrentProductId(id);

      // 1) NLP (soit byProduct, soit extract si ton backend le demande)
      let nlpRes;
      try {
        nlpRes = await NLPService.byProduct(id);
      } catch {
        // fallback si ton service veut un payload
        nlpRes = await NLPService.extract({ productId: id });
      }
      setNlp(nlpRes.data);
      notify("success", "NLP OK");

      // 2) LCA
      let lcaRes;
      try {
        lcaRes = await LCAService.byProduct(id);
      } catch {
        lcaRes = await LCAService.calc({ productId: id });
      }
      setLca(lcaRes.data);
      notify("success", "LCA OK");

      // 3) Scoring
      let sRes;
      try {
        sRes = await ScoringService.byProduct(id);
      } catch {
        sRes = await ScoringService.compute({ productId: id });
      }
      setScore(sRes.data);
      notify("success", "Scoring OK");

      // 4) Widget public
      const wRes = await WidgetService.publicProduct(id);
      setWidget(wRes.data);
      notify("success", "Widget OK ✅");
    } catch (e) {
      notify("error", "Pipeline a échoué. Vérifie les ports + endpoints + token + CORS.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Pipeline (Parser → NLP → LCA → Scoring → Widget)
      </Typography>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography fontWeight={800} mb={1}>
          Produit courant
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            fullWidth
            placeholder="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            onClick={runAll}
            disabled={!canRun || loading}
          >
            {loading ? "En cours..." : "Lancer pipeline"}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography fontWeight={900} mb={1}>Résultats</Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography fontWeight={800}>NLP</Typography>
        <pre style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
          {nlp ? JSON.stringify(nlp, null, 2) : "—"}
        </pre>

        <Typography fontWeight={800} mt={2}>LCA</Typography>
        <pre style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
          {lca ? JSON.stringify(lca, null, 2) : "—"}
        </pre>

        <Typography fontWeight={800} mt={2}>Scoring</Typography>
        <pre style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
          {score ? JSON.stringify(score, null, 2) : "—"}
        </pre>

        <Typography fontWeight={800} mt={2}>Widget Public</Typography>
        <pre style={{ marginTop: 6, whiteSpace: "pre-wrap" }}>
          {widget ? JSON.stringify(widget, null, 2) : "—"}
        </pre>
      </Paper>

      <AppToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </Box>
  );
}
