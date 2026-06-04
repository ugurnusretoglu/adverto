import { useEffect, useState } from "react";
import {
    Typography,
    Box,
    CircularProgress
} from "@mui/material";

import { Grid } from "@mui/material";
import AdvertCard from "./AdvertCard";
import AdvertService from "../services/AdvertService";
import type { advertSummaryType } from "../types/Types";

const AdvertList = () => {
    const [adverts, setAdverts] = useState<advertSummaryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        AdvertService.getAllAdverts()
            .then((response) => {
                setAdverts(response.payload);
            })
            .catch(() => {
                setError("İlanlar yüklenirken bir hata oluştu.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (adverts.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="text.secondary">Henüz ilan bulunmamaktadır.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 4, py: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
                İlanlar
            </Typography>

            <Grid container spacing={3}>
                {adverts.map((advert) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={advert.id}>
                        <AdvertCard advert={advert} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdvertList;