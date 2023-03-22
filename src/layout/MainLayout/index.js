import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalBar from './HorizontalBar';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import navigation from 'menu-items';
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';

// assets
import { IconChevronRight } from '@tabler/icons';
import Footer from './Footer';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...{
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
        marginLeft: 0,
        marginTop: 170,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `100%`
    }
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { container } = useConfig();

    const header = useMemo(
        () => (
            <Toolbar sx={{ p: '16px' }}>
                <Header />
            </Toolbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchDownMd]
    );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    bgcolor: 'background.default',
                    transition: 'none'
                }}
            >
                {header}
            </AppBar>

            {/* main content */}
            <Main theme={theme}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Main>
            <Footer />
        </Box>
    );
};

export default MainLayout;
