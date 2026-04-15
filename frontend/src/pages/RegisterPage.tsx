import * as React from 'react';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../CSS/RegisterPage.css';
import InputAdornment from '@mui/material/InputAdornment';
import { MdAlternateEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import FormHelperText from '@mui/material/FormHelperText';
import type { formType, registerType } from '../types/Types';
import registerPageService from '../services/RegisterPageService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: registerType = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                birthOfDate: values.birthOfDate
                    ? new Date(values.birthOfDate).toISOString().split("T")[0] : null,
                password: values.password,
                phone: values.phone,
                email: values.email,
                address: {
                    country: values.address.country,
                    city: values.address.city,
                    district: values.address.district,
                    street: values.address.street
                }
            }
            const response = await registerPageService.register(payload);
            if (response) {
                clear();
                toast.success("Account created successfully!");
                navigate("/login")
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    }

    const { values, handleSubmit, handleChange, handleBlur, errors, resetForm, setFieldValue, setFieldTouched, touched } = useFormik<formType>({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            birthOfDate: null,
            password: '',
            phone: '',
            email: '',
            address: {
                country: '',
                city: '',
                district: '',
                street: ''
            }
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const clear = () => {
        resetForm();
    }

    return (
        <div className='register'>
            <Container maxWidth="lg">
                <div className='register-grid'>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={0}>
                            <Grid size={6}>
                                <div className='left-panel'>
                                    <div><h2 className='register-title'>General Information</h2></div>
                                    <div className='register-form1'>
                                        <div className='register-row' style={{ width: 500, maxWidth: '100%' }}>
                                            <TextField
                                                fullWidth
                                                id="input-firstName"
                                                name='firstName'
                                                label="First Name"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.firstName && Boolean(errors.firstName)}
                                                helperText={touched.firstName && <span>{errors.firstName}</span>}
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-lastName"
                                                name='lastName'
                                                label="Last Name"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.lastName && Boolean(errors.lastName)}
                                                helperText={touched.lastName && <span>{errors.lastName}</span>}
                                            />
                                        </div>
                                        <div style={{ width: 500, maxWidth: '100%', display: "flex", flexDirection: "column", gap: "20px" }}>
                                            <TextField
                                                fullWidth
                                                id="input-username"
                                                name='username'
                                                label="Username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={touched.username && <span>{errors.username}</span>}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Birth Date"
                                                    format='yyyy-MM-dd'
                                                    value={values.birthOfDate}
                                                    onChange={(newValue) => {
                                                        setFieldValue('birthOfDate', newValue);
                                                        setFieldTouched('birthOfDate', true);
                                                    }}
                                                    slotProps={{
                                                        textField: {
                                                            variant: "standard",
                                                            fullWidth: true,
                                                            error: touched.birthOfDate && Boolean(errors.birthOfDate),
                                                            helperText: touched.birthOfDate && errors.birthOfDate,
                                                            onBlur: () => setFieldTouched('birthOfDate', true),
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>

                                            <FormControl variant="standard"
                                                error={touched.password && Boolean(errors.password)}
                                            >
                                                <InputLabel htmlFor="input-password">Password</InputLabel>
                                                <Input
                                                    id="input-password"
                                                    name='password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label={
                                                                    showPassword ? 'hide the password' : 'display the password'
                                                                }
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                onMouseUp={handleMouseUpPassword}
                                                            >
                                                                {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                                <FormHelperText>
                                                    {touched.password && errors.password}
                                                </FormHelperText>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div className='right-panel'>

                                    <div><h2 className='register-title' style={{ color: "#fff" }}>Contact Details</h2></div>
                                    <div className='register-form2'>
                                        <TextField
                                            id="input-phone"
                                            name='phone'
                                            label='Phone'
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" >
                                                            <LuPhone />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            variant="standard"
                                            error={touched.phone && Boolean(errors.phone
                                            )}
                                            helperText={touched.phone && errors.phone}
                                        />
                                        <TextField
                                            id="input-email"
                                            name='email'
                                            label='Email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            fullWidth
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" >
                                                            <MdAlternateEmail />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            variant="standard"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />

                                        <div className='register-row'  >
                                            <TextField
                                                fullWidth
                                                id="input-country"
                                                name='address.country'
                                                label="Country"
                                                value={values.address.country}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.address?.country && Boolean(errors.address?.country)}
                                                helperText={touched.address?.country && errors.address?.country}
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-city"
                                                name='address.city'
                                                label="City"
                                                value={values.address.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.address?.city && Boolean(errors.address?.city)}
                                                helperText={touched.address?.city && errors.address?.city}
                                            />
                                        </div>

                                        <div className='register-row'>
                                            <TextField
                                                fullWidth
                                                id="input-district"
                                                name='address.district'
                                                label="District"
                                                value={values.address.district}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.address?.district && Boolean(errors.address?.district)}
                                                helperText={touched.address?.district && errors.address?.district}
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-street"
                                                name='address.street'
                                                label="Street"
                                                value={values.address.street}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                size='small'
                                                error={touched.address?.street && Boolean(errors.address?.street)}
                                                helperText={touched.address?.street && errors.address?.street}
                                            />
                                        </div>

                                    </div>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 2,
                                            mt: 4,
                                        }}
                                    >
                                        <Button onClick={clear} variant="contained" sx={{ textTransform: 'none', height: '30px', backgroundColor: '#3b3935' }}>Clear</Button>
                                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', height: '30px', backgroundColor: '#528733' }}>Sign up</Button>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div >
            </Container >
        </div >
    )
}

export default RegisterPage