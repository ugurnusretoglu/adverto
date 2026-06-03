import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import type { addressType } from "../types/Types";

interface Props {
    onNext: (data: addressType) => void;
}

const StepAddressInfo = ({ onNext }: Props) => {
    const [form, setForm] = useState<addressType>({
        country: "",
        city: "",
        district: "",
        street: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        onNext(form);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: '500px' }} >
                Adres Bilgileri
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Ülke"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Şehir"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="İlçe"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Sokak"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleNext}>
                    Devam Et
                </Button>
            </Box>
        </Box>
    );
};

export default StepAddressInfo;