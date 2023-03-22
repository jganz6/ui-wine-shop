import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, useMediaQuery, Button } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
// import LocalizationSection from './LocalizationSection';
import ManageProfileSection from './ManageProfileSection';
import NotificationSection from './NotificationSection';
import CartSection from './CartSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleDrawerToggle }) => {
    const theme = useTheme();
    const { user } = useAuth();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    },
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, textAlign: 'center' }}>
                    <LogoSection />
                </Box>
                <Box component="span" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h2" color="black" align="center">
                        D'Kingdom
                    </Typography>
                    <Typography variant="h3" color="black" align="center">
                        Wine Shop
                    </Typography>
                </Box>
            </Box>
            {/* {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        overflow: 'hidden',
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.background.paper,
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                        '&:hover': {
                            background: theme.palette.secondary.main,
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                        }
                    }}
                    onClick={handleDrawerToggle}
                    color="inherit"
                >
                    <IconMenu2 stroke={1.5} size="20px" />
                </Avatar>
            ) : null} */}

            {/* header search */}
            <SearchSection />
            {/* <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} /> */}

            {/* manage Profile */}
            {/* {!matchDownMd && (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <ManageProfileSection />
                </Box>
            )} */}

            {/* cart */}
            <Box sx={{ display: 'flex', ml: 2 }}>
                <CartSection />
            </Box>

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            {/* <ProfileSection /> */}
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    paddingLeft: '20px',
                    borderLeft: '3px solid black',
                    borderLeftColor: theme.palette.primary.dark
                }}
            >
                <Button variant="outlined" sx={{ width: '100px', marginRight: '5px' }} href="/register">
                    Sign Up
                </Button>
                <Button variant="contained" sx={{ width: '100px' }} href="/login">
                    Log In
                </Button>
            </Box>
        </>
    );
};

export default Header;
