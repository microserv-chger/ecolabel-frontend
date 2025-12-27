import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Divider,
    Stack,
    Tooltip,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Co2Icon from "@mui/icons-material/Co2";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BoltIcon from "@mui/icons-material/Bolt";

import { WidgetService } from "../api/services";

/**
 * Composant PublicScoreWidget
 * Simule un widget qu'une boutique tierce pourrait intégrer.
 * N'utilise QUE la WidgetAPI (port 8085).
 */
export default function PublicScoreWidget({ productId }) {
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (productId) {
            fetchPublicScore();
        }
    }, [productId]);

    const fetchPublicScore = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await WidgetService.getPublicScore(productId);
            setScore(data);
        } catch (err) {
            setError("Score non disponible sur le catalogue public.");
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (letter) => {
        switch (letter) {
            case "A": return "#2E7D32";
            case "B": return "#4CAF50";
            case "C": return "#FBC02D";
            case "D": return "#F57C00";
            case "E": return "#D32F2F";
            default: return "#9E9E9E";
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" p={2}><CircularProgress size={24} color="success" /></Box>;
    if (error) return <Typography variant="caption" color="text.secondary">{error}</Typography>;
    if (!score) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid #E0E0E0",
                bgcolor: "#FAFAFA",
                maxWidth: 350,
                transition: "0.3s",
                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
                    ECOLABEL PUBLIC WIDGET
                </Typography>
                <Tooltip title="Ce score est certifié et provient du catalogue public.">
                    <HelpOutlineIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                </Tooltip>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" alignItems="center" gap={2}>
                <Box
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: getScoreColor(score.scoreLetter),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 24,
                        fontWeight: 800
                    }}
                >
                    {score.scoreLetter}
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight={700} lineHeight={1}>
                        {Math.round(score.scoreValue)}/100
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Score environnemental
                    </Typography>
                </Box>
            </Box>

            <Stack spacing={1} mt={2}>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <Co2Icon sx={{ fontSize: 18, color: "#607D8B" }} />
                        <Typography variant="caption">Empreinte Carbone</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{score.co2?.toFixed(2)} kg</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <WaterDropIcon sx={{ fontSize: 18, color: "#03A9F4" }} />
                        <Typography variant="caption">Consommation Eau</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{score.water?.toFixed(0)} L</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={1}>
                        <BoltIcon sx={{ fontSize: 18, color: "#FFC107" }} />
                        <Typography variant="caption">Énergie Primaire</Typography>
                    </Box>
                    <Typography variant="caption" fontWeight={700}>{score.energy?.toFixed(1)} MJ</Typography>
                </Box>
            </Stack>

            <Box mt={2} pt={1} borderTop="1px dashed #E0E0E0">
                <Typography variant="caption" color="text.secondary" display="block">
                    Calculé le {new Date(score.calculatedAt).toLocaleDateString()}
                </Typography>
            </Box>
        </Paper>
    );
}
