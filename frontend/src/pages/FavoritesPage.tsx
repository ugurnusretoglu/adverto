import { useEffect, useState } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import AdvertCard from "../components/AdvertCard";
import FavoriteService from "../services/FavoriteService";
import { useFavorite } from "../contexts/FavoriteContext";
import type { advertSummaryType } from "../types/Types";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<advertSummaryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { favoriteIds } = useFavorite();

    useEffect(() => {
        FavoriteService.getFavorites()
            .then((response) => setFavorites(response.payload))
            .catch(() => setError("Favoriler yüklenirken bir hata oluştu."))
            .finally(() => setLoading(false));
    }, []);

    // yıldız kaldırılınca listeden çıkar
    const filteredFavorites = favorites.filter((f) => favoriteIds.has(f.id));

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

    if (filteredFavorites.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="text.secondary">
                    Henüz yıldızladığınız bir ilan bulunmamaktadır.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ px: 4, py: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: '500', mb: 3 }} >
                Yıldızlanan İlanlar
            </Typography>
            <Grid container spacing={3}>
                {filteredFavorites.map((advert) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={advert.id}>
                        <AdvertCard advert={advert} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FavoritesPage;