import { useState } from "react";
import {
    Box, Button, TextField, Typography, ToggleButton,
    ToggleButtonGroup, FormControlLabel, Checkbox
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LandscapeIcon from "@mui/icons-material/Landscape";
import type { houseTypeIU, landTypeIU } from "../types/Types";

interface Props {
    onHouseSave: (data: Partial<houseTypeIU>) => void;
    onLandSave: (data: Partial<landTypeIU>) => void;
}

const StepEstateTypeSelect = ({ onHouseSave, onLandSave }: Props) => {
    const [estateType, setEstateType] = useState<"house" | "land">("house");

    const [houseForm, setHouseForm] = useState({
        totalArea: "",
        netArea: "",
        rooms: "",
        age: "",
        floor: "",
        totolFloors: "",
        heating: "",
        bathrooms: "",
        kitchen: "",
        balcony: false,
        elevator: false,
    });

    const [landForm, setLandForm] = useState({
        landUse: "",
        squareMeter: "",
        pricePerSquareMeter: "",
        blockNo: "",
        parcelNo: "",
        sheetNo: "",
        far: "",
        heightLimit: "",
    });

    const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setHouseForm({ ...houseForm, [name]: type === "checkbox" ? checked : value });
    };

    const handleLandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLandForm({ ...landForm, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (estateType === "house") {
            onHouseSave({
                totalArea: Number(houseForm.totalArea),
                netArea: Number(houseForm.netArea),
                rooms: houseForm.rooms,
                age: houseForm.age ? Number(houseForm.age) : undefined,
                floor: houseForm.floor,
                totolFloors: houseForm.totolFloors ? Number(houseForm.totolFloors) : undefined,
                heating: houseForm.heating,
                bathrooms: houseForm.bathrooms ? Number(houseForm.bathrooms) : undefined,
                kitchen: houseForm.kitchen,
                balcony: houseForm.balcony,
                elevator: houseForm.elevator,
            });
        } else {
            onLandSave({
                landUse: landForm.landUse,
                squareMeter: Number(landForm.squareMeter),
                pricePerSquareMeter: landForm.pricePerSquareMeter ? Number(landForm.pricePerSquareMeter) : undefined,
                blockNo: landForm.blockNo,
                parcelNo: landForm.parcelNo,
                sheetNo: landForm.sheetNo,
                far: landForm.far ? Number(landForm.far) : undefined,
                heightLimit: landForm.heightLimit ? Number(landForm.heightLimit) : undefined,
            });
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: '500px' }} >
                Emlak Tipi Seçin
            </Typography>

            <ToggleButtonGroup
                value={estateType}
                exclusive
                onChange={(_, val) => val && setEstateType(val)}
                sx={{ mb: 1 }}
            >
                <ToggleButton value="house" sx={{ gap: 1 }}>
                    <HomeIcon fontSize="small" /> Konut
                </ToggleButton>
                <ToggleButton value="land" sx={{ gap: 1 }}>
                    <LandscapeIcon fontSize="small" /> Arsa
                </ToggleButton>
            </ToggleButtonGroup>

            {estateType === "house" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '500px' }} >
                        Konut Bilgileri
                    </Typography>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Brüt Alan (m²)"
                            name="totalArea"
                            type="number"
                            value={houseForm.totalArea}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                        <TextField
                            label="Net Alan (m²)"
                            name="netArea"
                            type="number"
                            value={houseForm.netArea}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Oda Sayısı"
                            name="rooms"
                            value={houseForm.rooms}
                            onChange={handleHouseChange}
                            placeholder="3+1"
                            fullWidth
                        />
                        <TextField
                            label="Bina Yaşı"
                            name="age"
                            type="number"
                            value={houseForm.age}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Bulunduğu Kat"
                            name="floor"
                            value={houseForm.floor}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                        <TextField
                            label="Toplam Kat"
                            name="totolFloors"
                            type="number"
                            value={houseForm.totolFloors}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Isıtma"
                            name="heating"
                            value={houseForm.heating}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                        <TextField
                            label="Banyo Sayısı"
                            name="bathrooms"
                            type="number"
                            value={houseForm.bathrooms}
                            onChange={handleHouseChange}
                            fullWidth
                        />
                    </Box>

                    <TextField
                        label="Mutfak"
                        name="kitchen"
                        value={houseForm.kitchen}
                        onChange={handleHouseChange}
                        fullWidth
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="balcony"
                                    checked={houseForm.balcony}
                                    onChange={handleHouseChange}
                                />
                            }
                            label="Balkon"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="elevator"
                                    checked={houseForm.elevator}
                                    onChange={handleHouseChange}
                                />
                            }
                            label="Asansör"
                        />
                    </Box>
                </Box>
            )}

            {estateType === "land" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '500px' }} >
                        Arsa Bilgileri
                    </Typography>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Arsa Kullanımı"
                            name="landUse"
                            value={landForm.landUse}
                            onChange={handleLandChange}
                            fullWidth
                        />
                        <TextField
                            label="Alan (m²)"
                            name="squareMeter"
                            type="number"
                            value={landForm.squareMeter}
                            onChange={handleLandChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="m² Fiyatı (₺)"
                            name="pricePerSquareMeter"
                            type="number"
                            value={landForm.pricePerSquareMeter}
                            onChange={handleLandChange}
                            fullWidth
                        />
                        <TextField
                            label="Ada No"
                            name="blockNo"
                            value={landForm.blockNo}
                            onChange={handleLandChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="Parsel No"
                            name="parcelNo"
                            value={landForm.parcelNo}
                            onChange={handleLandChange}
                            fullWidth
                        />
                        <TextField
                            label="Pafta No"
                            name="sheetNo"
                            value={landForm.sheetNo}
                            onChange={handleLandChange}
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                        <TextField
                            label="KAKS (FAR)"
                            name="far"
                            type="number"
                            value={landForm.far}
                            onChange={handleLandChange}
                            fullWidth
                        />
                        <TextField
                            label="Yükseklik Sınırı"
                            name="heightLimit"
                            type="number"
                            value={landForm.heightLimit}
                            onChange={handleLandChange}
                            fullWidth
                        />
                    </Box>
                </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleSave}>
                    İlan Oluştur
                </Button>
            </Box>
        </Box>
    );
};

export default StepEstateTypeSelect;