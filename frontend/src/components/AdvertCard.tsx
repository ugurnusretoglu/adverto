import { Card, CardActionArea, Box, Typography, Chip, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HomeIcon from "@mui/icons-material/Home";
import LandscapeIcon from "@mui/icons-material/Landscape";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import type { advertSummaryType } from "../types/Types";
import { useFavorite } from "../contexts/FavoriteContext";

interface Props {
    advert: advertSummaryType;
}

const badgeConfig = {
    VEHICLE: {
        label: "Araç",
        icon: <DirectionsCarIcon sx={{ fontSize: 13 }} />,
        sx: { bgcolor: "#E6F1FB", color: "#0C447C" },
    },
    HOUSE: {
        label: "Konut",
        icon: <HomeIcon sx={{ fontSize: 13 }} />,
        sx: { bgcolor: "#EEEDFE", color: "#3C3489" },
    },
    LAND: {
        label: "Arsa",
        icon: <LandscapeIcon sx={{ fontSize: 13 }} />,
        sx: { bgcolor: "#EAF3DE", color: "#27500A" },
    },
};

type AdvertType = keyof typeof badgeConfig;

const normalizeAdvertType = (type: string | null | undefined): AdvertType => {
    if (!type) return "VEHICLE";
    const upper = type.toUpperCase() as AdvertType;
    return upper in badgeConfig ? upper : "VEHICLE";
};

const AdvertCard = ({ advert }: Props) => {
    const navigate = useNavigate();
    const { favoriteIds, addFavorite, removeFavorite } = useFavorite();

    const advertType = normalizeAdvertType(advert.advertType);
    const badge = badgeConfig[advertType];
    const starred = favoriteIds.has(advert.id);

    const handleClick = () => {
        navigate(`/advert/${advertType.toLowerCase()}/${advert.id}`);
    };

    const handleStar = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (starred) {
                await removeFavorite(advert.id);
            } else {
                await addFavorite(advert.id);
            }
        } catch (error) {
            console.error("Favori işlemi başarısız:", error);
        }
    };

    return (
        <Card
            elevation={0}
            sx={{
                border: "0.5px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.15s",
                "&:hover": { borderColor: "text.secondary" },
            }}
        >
            <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>

                {/* Resim */}
                <Box sx={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", bgcolor: "grey.100", flexShrink: 0, position: "relative" }}>
                    <Box
                        component="img"
                        src={advert.coverImageUrl || "/placeholder.jpg"}
                        alt={advert.advertName}
                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <IconButton
                        onClick={handleStar}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(4px)",
                            "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                            width: 30,
                            height: 30,
                        }}
                    >
                        {starred
                            ? <StarIcon sx={{ fontSize: 18, color: "#EF9F27" }} />
                            : <StarBorderIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        }
                    </IconButton>
                </Box>

                {/* İçerik */}
                <Box sx={{ p: "12px 14px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Chip
                        icon={badge.icon}
                        label={badge.label}
                        size="small"
                        sx={{
                            ...badge.sx,
                            alignSelf: "flex-start",
                            fontSize: 11,
                            fontWeight: 500,
                            height: 22,
                            mb: 1,
                            "& .MuiChip-icon": { color: "inherit" },
                        }}
                    />

                    <Typography variant="body2" noWrap sx={{ mb: 0.5, color: "text.primary", fontWeight: '500' }}>
                        {advert.advertName}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.5,
                            flexGrow: 1,
                            mb: 1.5,
                        }}
                    >
                        {advert.description}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "0.5px solid",
                            borderColor: "divider",
                            pt: 1.25,
                        }}
                    >
                        <Typography variant="body2" sx={{ fontWeight: '500' }} color="text.primary">
                            {advert.price.toLocaleString("tr-TR")} ₺
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    </Box>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default AdvertCard;