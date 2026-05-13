import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AdvertoLogo from '../images/adverto-logo.png';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useAuth } from '../contexts/AuthenticationContext';

function SecondaryNavbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const firstLetter = user?.username?.charAt(0).toUpperCase() || '?';

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const goToHome = () => {
        navigate("/");
    }

    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ height: "72px", justifyContent: "center", backgroundColor: "#0b1320" }}>
                <Toolbar sx={{
                    minHeight: '72px !important',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '25%', cursor: 'pointer' }}>
                        <img
                            onClick={goToHome}
                            src={AdvertoLogo}
                            alt="logo"
                            style={{
                                height: '200px',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Stack direction="row" spacing={2}>
                                    <Avatar>{firstLetter}</Avatar>
                                </Stack>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default SecondaryNavbar