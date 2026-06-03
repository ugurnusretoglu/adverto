import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import type { StepIconProps } from '@mui/material/StepIcon';
import { Box, Typography, Button, Stack } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import EstateService from "../services/EstateService";
import StepAdvertInfoEstate from "../components/StepAdvertInfoEstate";
import StepAddressInfo from "../components/StepAddressInfo";
import StepEstateTypeSelect from "../components/StepEstateTypeSelect";
import type { advertType, addressType, houseTypeIU, landTypeIU } from "../types/Types";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
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
        2: <LocationOnIcon />,
        3: <HomeIcon />,
    };
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ["İlan Bilgileri", "Adres Bilgileri", "Emlak Detayları"];

const CreateEstatePage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [advertData, setAdvertData] = useState<Partial<advertType>>({});
    const [images, setImages] = useState<File[]>([]);
    const [addressData, setAddressData] = useState<addressType>({
        country: "",
        city: "",
        district: "",
        street: "",
    });

    const handleAdvertNext = (data: Partial<advertType>, files: File[]) => {
        setAdvertData(data);
        setImages(files);
        setActiveStep(1);
    };

    const handleAddressNext = (data: addressType) => {
        setAddressData(data);
        setActiveStep(2);
    };

    const handleHouseSave = async (houseData: Partial<houseTypeIU>) => {
        const merged: houseTypeIU = {
            ...advertData,
            ...houseData,
            dtoAddress: addressData,
        } as houseTypeIU;

        try {
            await EstateService.saveHouse(merged, images);
            setActiveStep(3);
        } catch (error) {
            console.error("House kaydedilemedi:", error);
        }
    };

    const handleLandSave = async (landData: Partial<landTypeIU>) => {
        const merged: landTypeIU = {
            ...advertData,
            ...landData,
            dtoAddress: addressData,
        } as landTypeIU;

        try {
            await EstateService.saveLand(merged, images);
            setActiveStep(3);
        } catch (error) {
            console.error("Land kaydedilemedi:", error);
        }
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
                {activeStep === 0 && (
                    <StepAdvertInfoEstate onNext={handleAdvertNext} />
                )}
                {activeStep === 1 && (
                    <StepAddressInfo onNext={handleAddressNext} />
                )}
                {activeStep === 2 && (
                    <StepEstateTypeSelect
                        onHouseSave={handleHouseSave}
                        onLandSave={handleLandSave}
                    />
                )}
                {activeStep === 3 && (
                    <Box sx={{ mt: 4, textAlign: 'center' }} >
                        <Typography variant="h6">İlan başarıyla oluşturuldu! 🎉</Typography>
                        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setActiveStep(0)}>
                            Yeni ilan oluştur
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CreateEstatePage;