import { useState } from "react";
import {
    Box, Button, TextField, MenuItem, Typography
} from "@mui/material";
import type { vehicleTypeIU } from "../types/Types";

interface Props {
    onNext: (data: Partial<vehicleTypeIU>, files: File[]) => void;
}

const adStatusOptions = [
    { value: "ACTIVE", label: "Aktif" },
    { value: "PASSIVE", label: "Pasif" },
];

const StepAdvertInfo = ({ onNext }: Props) => {
    const [form, setForm] = useState({
        advertNumber: "",
        advertName: "",
        price: "",
        description: "",
        adStatus: "ACTIVE",
    });
    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        setPreview(files.map((f) => URL.createObjectURL(f)));
    };

    const handleNext = () => {
        onNext(
            {
                advertNumber: form.advertNumber,
                advertName: form.advertName,
                price: Number(form.price),
                description: form.description,
                adStatus: form.adStatus,
            },
            images
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: '500px' }} >
                İlan Bilgileri
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="İlan Numarası"
                    name="advertNumber"
                    value={form.advertNumber}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="İlan Başlığı"
                    name="advertName"
                    value={form.advertName}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Fiyat (₺)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Durum"
                    name="adStatus"
                    value={form.adStatus}
                    onChange={handleChange}
                    select
                    fullWidth
                >
                    {adStatusOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <TextField
                label="Açıklama"
                name="description"
                value={form.description}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
            />

            <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Resimler
                </Typography>
                <Button variant="outlined" component="label">
                    Resim Seç
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>

                {preview.length > 0 && (
                    <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                        {preview.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`preview-${i}`}
                                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                            />
                        ))}
                    </Box>
                )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleNext}>
                    Devam Et
                </Button>
            </Box>
        </Box>
    );
};

export default StepAdvertInfo;