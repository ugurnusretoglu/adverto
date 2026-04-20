import * as React from 'react';
import Container from '@mui/material/Container';
import '../CSS/LoginPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginPageSchema } from '../schemas/LoginPageSchema';
import type { loginType } from '../types/Types';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthenticationContext';

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth();

    const submit = async (values: any, actions: any) => {
        dispatch(setLoading(true))
        try {
            const result = await login({
                username: values.username,
                password: values.password
            })
            if (result.success) {
                toast.success("Login successful");
                navigate("/");
            }
            else {
                toast.error("Error")
            }
        } catch (error) {
            toast.error("Login failed")
        } finally {
            dispatch(setLoading(false))
        }
    }

    const { values, handleSubmit, handleChange, handleBlur, errors, resetForm, touched } = useFormik<loginType>({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: submit,
        validationSchema: loginPageSchema
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

    const goToRegister = () => {
        navigate("/register")
    }

    return (
        <div className='login'>
            <Container maxWidth="xs" className='login-card'>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <h2 className='login-title'>Welcome Adverto</h2>
                    <div className='login-info'>
                        <TextField
                            fullWidth
                            id="input-username"
                            name='username'
                            label="Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <IoPerson />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            size='small'
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && <span>{errors.username}</span>}
                        />

                        <FormControl variant="standard"
                            error={touched.password && Boolean(errors.password)}
                            fullWidth
                        >
                            <InputLabel htmlFor="input-password">Password</InputLabel>
                            <Input
                                id="input-password"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type={showPassword ? 'text' : 'password'}
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <FaLock />
                                    </InputAdornment>
                                }
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
                        <Button type="submit" variant="contained" sx={{ textTransform: 'none', height: '30px', backgroundColor: '#528733' }}>Log in</Button>
                    </Box>
                    <p onClick={goToRegister} className='login-link'>Don't have an account?</p>
                </form>
            </Container>
        </div>
    )
}

export default LoginPage    