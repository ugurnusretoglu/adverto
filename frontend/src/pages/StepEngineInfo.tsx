import { useState } from "react";
import {
    Box, Button, TextField, Typography
} from "@mui/material";
import type { engineType } from "../types/Types";

interface Props {
    onNext: (data: engineType, skip: boolean) => void;
}

const StepEngineInfo = ({ onNext }: Props) => {
    const [form, setForm] = useState<engineType>({
        engineType: "",
        engineDisplacement: undefined,
        maxPower: "",
        maxTorque: "",
        zeroToHundredAcceleration: undefined,
        topSpeed: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value === "" ? undefined : isNaN(Number(value)) ? value : Number(value),
        });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: '500px' }} >
                    Motor Bilgileri
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bu adımı atlayabilirsiniz.
                </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Motor Tipi"
                    name="engineType"
                    value={form.engineType ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Motor Hacmi (L)"
                    name="engineDisplacement"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.engineDisplacement ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Maks. Güç"
                    name="maxPower"
                    value={form.maxPower ?? ""}
                    onChange={handleChange}
                    placeholder="184 hp"
                    fullWidth
                />
                <TextField
                    label="Maks. Tork"
                    name="maxTorque"
                    value={form.maxTorque ?? ""}
                    onChange={handleChange}
                    placeholder="290 Nm"
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="0-100 km/s (sn)"
                    name="zeroToHundredAcceleration"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.zeroToHundredAcceleration ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Maks. Hız (km/s)"
                    name="topSpeed"
                    type="number"
                    value={form.topSpeed ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => onNext(form, true)}
                >
                    Atla
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onNext(form, false)}
                >
                    Devam Et
                </Button>
            </Box>
        </Box>
    );
};

export default StepEngineInfo;