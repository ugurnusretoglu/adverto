import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import type { StepIconProps } from '@mui/material/StepIcon';
import { Box, Typography, Button } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BuildIcon from '@mui/icons-material/Build';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import VehicleService from "../services/VehicleService";
import type { vehicleTypeIU, engineType, fuelConsumptionType } from "../types/Types";
import StepAdvertInfo from './StepAdvertInfo';
import StepVehicleInfo from './StepVehicleInfo';
import StepEngineInfo from './StepEngineInfo';
import StepFuelInfo from './StepFuelInfo';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: 'linear-gradient(95deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage: 'linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage: 'linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <DescriptionIcon />,
        2: <DirectionsCarIcon />,
        3: <BuildIcon />,
        4: <LocalGasStationIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ["İlan Bilgileri", "Araç Bilgileri", "Motor Bilgileri", "Yakıt Tüketimi"];

const CreateAdvertPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const [advertData, setAdvertData] = useState<Partial<vehicleTypeIU>>({});
    const [images, setImages] = useState<File[]>([]);

    const handleAdvertNext = (data: Partial<vehicleTypeIU>, files: File[]) => {
        setAdvertData(data);
        setImages(files);
        setActiveStep(1);
    };

    const handleVehicleNext = async (data: Partial<vehicleTypeIU>) => {
        const merged = { ...advertData, ...data } as vehicleTypeIU;
        try {
            const response = await VehicleService.saveVehicle(merged, images);
            setVehicleId(response.payload.id);
            setActiveStep(2);
        } catch (error) {
            console.error("Vehicle kaydedilemedi:", error);
        }
    };

    const handleEngineNext = async (data: engineType, skip: boolean) => {
        if (!skip && vehicleId) {
            try {
                await VehicleService.saveEngine(vehicleId, data);
            } catch (error) {
                console.error("Engine kaydedilemedi:", error);
            }
        }
        setActiveStep(3);
    };

    const handleFuelFinish = async (data: fuelConsumptionType, skip: boolean) => {
        if (!skip && vehicleId) {
            try {
                await VehicleService.saveFuelConsumption(vehicleId, data);
            } catch (error) {
                console.error("FuelConsumption kaydedilemedi:", error);
            }
        }
        setActiveStep(4);
    };

    return (
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>

            <Box sx={{ mt: 4 }}>
                {activeStep === 0 && <StepAdvertInfo onNext={handleAdvertNext} />}
                {activeStep === 1 && <StepVehicleInfo onNext={handleVehicleNext} />}
                {activeStep === 2 && <StepEngineInfo onNext={handleEngineNext} />}
                {activeStep === 3 && <StepFuelInfo onFinish={handleFuelFinish} />}
                {activeStep === 4 && (
                    <Box sx={{ mt: 4, textAlign: 'center' }} >
                        <Typography variant="h6">The advert has been created successfully! 🎉</Typography>
                        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setActiveStep(0)}>
                            Create new Advert
                        </Button>
                    </Box>
                )}
            </Box>
        </Box >
    );
};

export default CreateAdvertPage;