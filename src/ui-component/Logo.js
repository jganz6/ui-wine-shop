// material-ui
import { useTheme } from '@mui/material/styles';

import logoDark from 'assets/images/logo-dark.png';
import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Barookah Kitchen" width="100" />;
};

export default Logo;
