import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AdvertoLogo from '../images/adverto-logo.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthenticationContext';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),

    width: '100%',
    maxWidth: '400px',

    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const firstLetter = user?.username?.charAt(0).toUpperCase() || '?';


    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Create Advert
                </Button>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 1 favorite products"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <HotelClassIcon />
                    </Badge>
                </IconButton>
                <p>Products</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="medium"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Stack direction="row" spacing={1}>
                        <Avatar>{firstLetter}</Avatar>
                    </Stack>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ height: "72px", justifyContent: "center", backgroundColor: "#0b1320" }}>
                <Toolbar sx={{
                    minHeight: '72px !important',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '25%' }}>
                        <img
                            src={AdvertoLogo}
                            alt="logo"
                            style={{
                                height: '150px',
                                width: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '50%' }}>
                        <Search sx={{ width: '100%' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        gap: 1,
                        height: '100%',
                    }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#878c8b',
                                color: '#fff',
                                minWidth: '140px',
                                height: '40px',
                                borderRadius: '10px',
                                px: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',

                                '&:hover': {
                                    backgroundColor: '#878c8b',
                                },
                            }}
                        >
                            Create Advert
                        </Button>
                        <IconButton
                            size="large"
                            aria-label="show 1 favorite products"
                            color="inherit"
                        >
                            <Badge badgeContent={1} color="secondary">
                                <HotelClassIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Stack direction="row" spacing={2}>
                                <Avatar>{firstLetter}</Avatar>
                            </Stack>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
