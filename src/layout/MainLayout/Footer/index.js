import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, useMediaQuery, Button, Icon, IconButton } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import { Instagram as InstagramIcon, Twitter as TwitterIcon, Facebook as FacebookIcon } from '@mui/icons-material';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Footer = () => {
    const theme = useTheme();
    const { user } = useAuth();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    return (
        <Box
            sx={{
                width: '100%',
                borderTop: '4px solid grey',
                display: 'flex',
                flexDirection: 'column',
                padding: '2em'
            }}
        >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Box component="div">
                    <Typography variant="h3" color="black" align="center">
                        D'Kingdom
                    </Typography>
                    <Typography variant="h4" color="black" align="center">
                        Wine Shop
                    </Typography>
                </Box>
            </Box>
            <Box component="div" sx={{ display: 'flex', padding: '20px 0 20px 0' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" color="black" sx={{ marginBottom: '10px' }}>
                        D'Kingdom Wine Shop
                    </Typography>
                    <Typography variant="h5" color="black">
                        Tentang D'Kingdom Wine Shop
                    </Typography>
                    <Typography variant="h5" color="black">
                        Produk
                    </Typography>
                    <Typography variant="h5" color="black">
                        Promo
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" color="black" sx={{ marginBottom: '10px' }}>
                        Layanan Pelanggan
                    </Typography>
                    <Typography variant="h5" color="black">
                        FAQ
                    </Typography>
                    <Typography variant="h5" color="black">
                        Voucher
                    </Typography>
                    <Typography variant="h5" color="black">
                        Pembelian
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 4 }} />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" color="black" sx={{ marginBottom: '10px' }}>
                        Ikuti Kami
                    </Typography>
                    <IconButton sx={{ justifyContent: 'left' }}>
                        <Icon>
                            <FacebookIcon />
                        </Icon>
                        <Typography variant="h5" color="black" sx={{ textJustify: 'center' }}>
                            Facebook
                        </Typography>
                    </IconButton>
                    <IconButton sx={{ justifyContent: 'left' }}>
                        <Icon>
                            <InstagramIcon />
                        </Icon>
                        <Typography variant="h5" color="black" sx={{ textJustify: 'center' }}>
                            Instagram
                        </Typography>
                    </IconButton>
                    <IconButton sx={{ justifyContent: 'left' }}>
                        <Icon>
                            <TwitterIcon />
                        </Icon>
                        <Typography variant="h5" color="black" sx={{ textJustify: 'center' }}>
                            Twitter
                        </Typography>
                    </IconButton>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" color="black" sx={{ marginBottom: '10px' }}>
                        Hubungi Kami
                    </Typography>
                    <Typography variant="h5" color="black">
                        +6287812345678
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Box component="div">
                    <Typography variant="h5" color="black" align="center">
                        copyright 2023 D'Kingdom Wine Shop
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
