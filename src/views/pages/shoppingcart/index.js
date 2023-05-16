import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Typography, useMediaQuery, Button, Icon, IconButton } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import CardProduct from 'ui-component/CardProduct';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Home = () => {
    const theme = useTheme();
    const { user } = useAuth();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    return (
        <Box>
            <Typography variant="h2" color="black" align="center">
                New Products
            </Typography>
            <br />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <CardProduct />
                <CardProduct />
                <CardProduct like="y" />
                <CardProduct />
                <CardProduct />
                <CardProduct like="y" />
                <CardProduct like="y" />
                <CardProduct />
                <CardProduct />
                <CardProduct />
            </Box>
        </Box>
    );
};

export default Home;
