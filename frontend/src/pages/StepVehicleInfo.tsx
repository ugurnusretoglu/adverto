import { useState } from "react";
import {
    Box, Button, TextField, MenuItem, Typography, FormControlLabel, Checkbox
} from "@mui/material";
import type { vehicleTypeIU } from "../types/Types";

interface Props {
    onNext: (data: Partial<vehicleTypeIU>) => void;
}

const fuelTypeOptions = [
    { value: "Gasoline", label: "Benzin" },
    { value: "Diesel", label: "Dizel" },
    { value: "LPG", label: "LPG" },
];

const transmissionOptions = [
    { value: "Automatic", label: "Otomatik" },
    { value: "Manual", label: "Manuel" },
];

const bodyTypeOptions = [
    { value: "Sedan", label: "Sedan" },
    { value: "Hatchback", label: "Hatchback" },
    { value: "Suv", label: "SUV" },
];

const StepVehicleInfo = ({ onNext }: Props) => {
    const [form, setForm] = useState({
        vehicleType: "",
        brand: "",
        series: "",
        model: "",
        modelYear: "",
        fuelType: "Gasoline",
        transmissionType: "Automatic",
        bodyType: "Sedan",
        mileage: "",
        driveType: "",
        color: "",
        severeDamageRecord: false,
        plateNo: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleNext = () => {
        onNext({
            vehicleType: form.vehicleType,
            brand: form.brand,
            series: form.series,
            model: form.model,
            modelYear: Number(form.modelYear),
            fuelType: form.fuelType,
            transmissionType: form.transmissionType,
            bodyType: form.bodyType,
            mileage: Number(form.mileage),
            driveType: form.driveType,
            color: form.color,
            severeDamageRecord: form.severeDamageRecord,
            plateNo: form.plateNo,
        });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: '500px' }}>
                Araç Bilgileri
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Araç Tipi"
                    name="vehicleType"
                    value={form.vehicleType}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Marka"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Seri"
                    name="series"
                    value={form.series}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Model"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Model Yılı"
                    name="modelYear"
                    type="number"
                    value={form.modelYear}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Renk"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
                <TextField
                    label="Yakıt Tipi"
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleChange}
                    select
                    fullWidth
                >
                    {fuelTypeOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Şanzıman"
                    name="transmissionType"
                    value={form.transmissionType}
                    onChange={handleChange}
                    select
                    fullWidth
                >
                    {transmissionOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Kasa Tipi"
                    name="bodyType"
                    value={form.bodyType}
                    onChange={handleChange}
                    select
                    fullWidth
                >
                    {bodyTypeOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Kilometre"
                    name="mileage"
                    type="number"
                    value={form.mileage}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Çekiş Tipi"
                    name="driveType"
                    value={form.driveType}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <TextField
                label="Plaka"
                name="plateNo"
                value={form.plateNo}
                onChange={handleChange}
                fullWidth
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="severeDamageRecord"
                        checked={form.severeDamageRecord}
                        onChange={handleChange}
                    />
                }
                label="Ağır hasar kaydı var"
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleNext}>
                    Devam Et
                </Button>
            </Box>
        </Box>
    );
};

export default StepVehicleInfo;