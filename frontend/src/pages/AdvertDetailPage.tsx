import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box, Typography, CircularProgress, Grid, Chip,
    Divider, ImageList, ImageListItem
} from "@mui/material";
import AdvertService from "../services/AdvertService";
import type { vehicleType, houseType, landType } from "../types/Types";
import SecondaryNavbar from "../components/SecondaryNavbar";

type AdvertDetailType = vehicleType | houseType | landType;

const AdvertDetailPage = () => {
    const { type, id } = useParams<{ type: string; id: string }>();
    const [advert, setAdvert] = useState<AdvertDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || !type) return;

        const fetchAdvert = () => {
            const numericId = Number(id);
            if (type === "vehicle") return AdvertService.getVehicleById(numericId);
            if (type === "house") return AdvertService.getHouseById(numericId);
            if (type === "land") return AdvertService.getLandById(numericId);
            return null;
        };

        const request = fetchAdvert();
        if (!request) return;

        request
            .then((response) => setAdvert(response.payload))
            .catch(() => setError("İlan yüklenirken bir hata oluştu."))
            .finally(() => setLoading(false));
    }, [id, type]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !advert) {
        return (
            <Box sx={{ textAlign: "center", mt: 6 }}>
                <Typography color="error">{error ?? "İlan bulunamadı."}</Typography>
            </Box>
        );
    }

    const isVehicle = type === "vehicle";
    const isHouse = type === "house";
    const isLand = type === "land";

    const vehicle = isVehicle ? (advert as vehicleType) : null;
    const house = isHouse ? (advert as houseType) : null;
    const land = isLand ? (advert as landType) : null;

    return (
        <div>
            <SecondaryNavbar />
            <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2, pb: 6 }}>
                {/* Resimler */}
                {advert.images && advert.images.length > 0 && (
                    <ImageList cols={3} gap={8} sx={{ mb: 3 }}>
                        {advert.images.map((img) => (
                            <ImageListItem key={img.id}>
                                <img
                                    src={img.url}
                                    alt={advert.advertName}
                                    style={{ borderRadius: 8, objectFit: "cover", height: 220 }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}

                {/* İlan Bilgileri */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                            {advert.advertName}
                        </Typography>
                        <Chip
                            label={advert.adStatus === "ACTIVE" ? "Aktif" : "Pasif"}
                            color={advert.adStatus === "ACTIVE" ? "success" : "default"}
                            size="small"
                        />
                    </Box>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 500, mb: 1 }}>
                        {advert.price.toLocaleString("tr-TR")} ₺
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {advert.description}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Vehicle Bilgileri */}
                {vehicle && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                            Araç Bilgileri
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {[
                                { label: "Araç Tipi", value: vehicle.vehicleType },
                                { label: "Marka", value: vehicle.brand },
                                { label: "Seri", value: vehicle.series },
                                { label: "Model", value: vehicle.model },
                                { label: "Model Yılı", value: vehicle.modelYear },
                                { label: "Renk", value: vehicle.color },
                                { label: "Yakıt Tipi", value: vehicle.fuelType },
                                { label: "Şanzıman", value: vehicle.transmissionType },
                                { label: "Kasa Tipi", value: vehicle.bodyType },
                                { label: "Kilometre", value: vehicle.mileage ? `${vehicle.mileage.toLocaleString("tr-TR")} km` : "-" },
                                { label: "Çekiş", value: vehicle.driveType },
                                { label: "Plaka", value: vehicle.plateNo },
                                { label: "Ağır Hasar", value: vehicle.severeDamageRecord ? "Var" : "Yok" },
                            ].map((item) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={item.label}>
                                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                </Grid>
                            ))}
                        </Grid>

                        {vehicle.engine && (
                            <>
                                <Divider sx={{ mb: 3 }} />
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                                    Motor Bilgileri
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    {[
                                        { label: "Motor Tipi", value: vehicle.engine.engineType },
                                        { label: "Motor Hacmi", value: vehicle.engine.engineDisplacement ? `${vehicle.engine.engineDisplacement} L` : "-" },
                                        { label: "Maks. Güç", value: vehicle.engine.maxPower },
                                        { label: "Maks. Tork", value: vehicle.engine.maxTorque },
                                        { label: "0-100 km/s", value: vehicle.engine.zeroToHundredAcceleration ? `${vehicle.engine.zeroToHundredAcceleration} sn` : "-" },
                                        { label: "Maks. Hız", value: vehicle.engine.topSpeed ? `${vehicle.engine.topSpeed} km/s` : "-" },
                                    ].map((item) => (
                                        <Grid size={{ xs: 6, sm: 4 }} key={item.label}>
                                            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}

                        {vehicle.fuelConsumption && (
                            <>
                                <Divider sx={{ mb: 3 }} />
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                                    Yakıt Tüketimi
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "Şehir İçi", value: vehicle.fuelConsumption.cityConsumption ? `${vehicle.fuelConsumption.cityConsumption} L/100km` : "-" },
                                        { label: "Şehir Dışı", value: vehicle.fuelConsumption.highwayConsumption ? `${vehicle.fuelConsumption.highwayConsumption} L/100km` : "-" },
                                        { label: "Ortalama", value: vehicle.fuelConsumption.averageConsumption ? `${vehicle.fuelConsumption.averageConsumption} L/100km` : "-" },
                                        { label: "Depo", value: vehicle.fuelConsumption.fuelTankCapacity ? `${vehicle.fuelConsumption.fuelTankCapacity} L` : "-" },
                                    ].map((item) => (
                                        <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                                            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </>
                )}

                {/* House Bilgileri */}
                {house && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                            Konut Bilgileri
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {[
                                { label: "Brüt Alan", value: house.totalArea ? `${house.totalArea} m²` : "-" },
                                { label: "Net Alan", value: house.netArea ? `${house.netArea} m²` : "-" },
                                { label: "Oda Sayısı", value: house.rooms },
                                { label: "Bina Yaşı", value: house.age },
                                { label: "Bulunduğu Kat", value: house.floor },
                                { label: "Toplam Kat", value: house.totolFloors },
                                { label: "Isıtma", value: house.heating },
                                { label: "Banyo", value: house.bathrooms },
                                { label: "Mutfak", value: house.kitchen },
                                { label: "Balkon", value: house.balcony ? "Var" : "Yok" },
                                { label: "Asansör", value: house.elevator ? "Var" : "Yok" },
                            ].map((item) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={item.label}>
                                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                </Grid>
                            ))}
                        </Grid>

                        {house.dtoAddress && (
                            <>
                                <Divider sx={{ mb: 3 }} />
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                                    Adres
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "Ülke", value: house.dtoAddress.country },
                                        { label: "Şehir", value: house.dtoAddress.city },
                                        { label: "İlçe", value: house.dtoAddress.district },
                                        { label: "Sokak", value: house.dtoAddress.street },
                                    ].map((item) => (
                                        <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                                            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </>
                )}

                {/* Land Bilgileri */}
                {land && (
                    <>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                            Arsa Bilgileri
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            {[
                                { label: "Arsa Kullanımı", value: land.landUse },
                                { label: "Alan", value: land.squareMeter ? `${land.squareMeter} m²` : "-" },
                                { label: "m² Fiyatı", value: land.pricePerSquareMeter ? `${land.pricePerSquareMeter} ₺` : "-" },
                                { label: "Ada No", value: land.blockNo },
                                { label: "Parsel No", value: land.parcelNo },
                                { label: "Pafta No", value: land.sheetNo },
                                { label: "KAKS", value: land.far },
                                { label: "Yükseklik Sınırı", value: land.heightLimit },
                            ].map((item) => (
                                <Grid size={{ xs: 6, sm: 4 }} key={item.label}>
                                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                </Grid>
                            ))}
                        </Grid>

                        {land.dtoAddress && (
                            <>
                                <Divider sx={{ mb: 3 }} />
                                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                                    Adres
                                </Typography>
                                <Grid container spacing={2}>
                                    {[
                                        { label: "Ülke", value: land.dtoAddress.country },
                                        { label: "Şehir", value: land.dtoAddress.city },
                                        { label: "İlçe", value: land.dtoAddress.district },
                                        { label: "Sokak", value: land.dtoAddress.street },
                                    ].map((item) => (
                                        <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                                            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>{item.value ?? "-"}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </>
                )}
            </Box>

        </div>
    );
};

export default AdvertDetailPage;