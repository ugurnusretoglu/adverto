import * as React from 'react';
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

function RegisterPage() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className='register'>
            <Container maxWidth="lg">
                <div className='register-grid'>
                    <Grid container spacing={0}>
                        <Grid size={6}>
                            <div className='left-panel'>
                                <form>
                                    <div><h2 className='register-title'>General Information</h2></div>
                                    <div className='register-form1'>
                                        <div className='register-row' style={{ width: 500, maxWidth: '100%' }}>
                                            <TextField
                                                fullWidth
                                                id="input-firstname"
                                                label="Firstname"
                                                variant="standard"
                                                size='small'
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-lastname"
                                                label="Lastname"
                                                variant="standard"
                                                size='small'
                                            />
                                        </div>
                                        <div style={{ width: 500, maxWidth: '100%', display: "flex", flexDirection: "column", gap: "20px" }}>
                                            <TextField
                                                fullWidth
                                                id="input-username"
                                                label="Username"
                                                variant="standard"
                                                size='small'
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Birth Date"
                                                    format='yyyy-MM-dd'
                                                    slotProps={{
                                                        textField: {
                                                            variant: "standard",
                                                            fullWidth: true,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>

                                            <FormControl variant="standard">
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                    id="input-password"
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
                                            </FormControl>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <div className='right-panel'>
                                <form>
                                    <div><h2 className='register-title' style={{ color: "#fff" }}>Contact Details</h2></div>
                                    <div className='register-form2'>
                                        <TextField
                                            id="input-phone"
                                            label='Phone'
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
                                        />
                                        <TextField
                                            id="input-email"
                                            label='Email'
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
                                        />

                                        <div className='register-row'  >
                                            <TextField
                                                fullWidth
                                                id="input-country"
                                                label="Country"
                                                variant="standard"
                                                size='small'
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-city"
                                                label="City"
                                                variant="standard"
                                                size='small'
                                            />
                                        </div>

                                        <div className='register-row'>
                                            <TextField
                                                fullWidth
                                                id="input-district"
                                                label="District"
                                                variant="standard"
                                                size='small'
                                            />
                                            <TextField
                                                fullWidth
                                                id="input-street"
                                                label="Street"
                                                variant="standard"
                                                size='small'
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
                                        <Button variant="contained" sx={{ textTransform: 'none', height: '30px', backgroundColor: '#3b3935' }}>Clear</Button>
                                        <Button variant="contained" sx={{ textTransform: 'none', height: '30px', backgroundColor: '#528733' }}>Sign up</Button>
                                    </Box>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </div >
            </Container >
        </div >
    )
}

export default RegisterPage