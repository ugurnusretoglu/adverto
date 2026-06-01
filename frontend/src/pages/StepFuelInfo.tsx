import { useState } from "react";
import {
    Box, Button, TextField, Typography
} from "@mui/material";
import type { fuelConsumptionType } from "../types/Types";

interface Props {
    onFinish: (data: fuelConsumptionType, skip: boolean) => void;
}

const StepFuelInfo = ({ onFinish }: Props) => {
    const [form, setForm] = useState<fuelConsumptionType>({
        cityConsumption: undefined,
        highwayConsumption: undefined,
        averageConsumption: undefined,
        fuelTankCapacity: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value === "" ? undefined : Number(value),
        });
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: '500px' }} >
                    Yakıt Tüketimi
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bu adımı atlayabilir ve ilanı oluşturabilirsiniz.
                </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Şehir İçi (L/100km)"
                    name="cityConsumption"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.cityConsumption ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Şehir Dışı (L/100km)"
                    name="highwayConsumption"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.highwayConsumption ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <TextField
                    label="Ortalama (L/100km)"
                    name="averageConsumption"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.averageConsumption ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Depo Kapasitesi (L)"
                    name="fuelTankCapacity"
                    type="number"
                    slotProps={{
                        htmlInput: {
                            step: 0.1,
                        },
                    }}
                    value={form.fuelTankCapacity ?? ""}
                    onChange={handleChange}
                    fullWidth
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => onFinish(form, true)}
                >
                    Atla
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onFinish(form, false)}
                >
                    İlan Oluştur
                </Button>
            </Box>
        </Box>
    );
};

export default StepFuelInfo;