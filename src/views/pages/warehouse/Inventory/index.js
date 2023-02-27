import { useState, useEffect } from 'react';

// material ui
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import InventoryItem from './InventoryItem';
import RequestOrder from './RequestOrder';
import OnDelivery from './OnDelivery';
import ReturnItem from './ReturnItem';
import SalesList from './SalesList';

// assets
import Image2 from 'assets/images/icons/stock.png';
import Image3 from 'assets/images/icons/cashier.png';
import Image4 from 'assets/images/icons/ondelivery.png';
import Image5 from 'assets/images/icons/delivered.png';

const Inventory = () => {
    const theme = useTheme();
    const [active, setActive] = useState('1');
    const [content, setContent] = useState(<InventoryItem />);

    useEffect(() => {
        if (active === '1') {
            setContent(<InventoryItem />);
        } else if (active === '2') {
            setContent(<RequestOrder />);
        } else if (active === '3') {
            setContent(<OnDelivery />);
        } else if (active === '4') {
            setContent(<ReturnItem />);
        } else if (active === '5') {
            setContent(<SalesList />);
        }
    }, [active]);

    return (
        <Stack>
            <MainCard content={false} boxShadow sx={{ p: 3, boxShadow: '0px 4px 4px 0px #0000001A' }}>
                <Grid container columns={4} justifyContent="space-around">
                    <Grid item>
                        <Stack spacing={1} alignItems="center">
                            <Avatar
                                src={Image2}
                                color="secondary"
                                sx={{
                                    py: 2.5,
                                    px: 1.6,
                                    border: active === '1' && '5px solid transparent',
                                    background:
                                        active === '1' &&
                                        `linear-gradient(${theme.palette.secondary[200]} 0 0) padding-box,  linear-gradient(154.51deg, #6654D2 6.47%, #E8312F 93.61%) border-box`
                                }}
                                size="xl"
                            />
                            <Typography color={active === '1' && 'secondary'} variant="label">
                                Inventory Item
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: theme.palette.secondary.main
                                    }
                                }}
                                onClick={() => setActive('1')}
                            >
                                View Data
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack spacing={1} alignItems="center">
                            <Avatar
                                src={Image3}
                                color="secondary"
                                sx={{
                                    py: 1.8,
                                    px: 2,
                                    border: active === '2' && '5px solid transparent',
                                    background:
                                        active === '2' &&
                                        `linear-gradient(${theme.palette.secondary[200]} 0 0) padding-box,  linear-gradient(154.51deg, #6654D2 6.47%, #E8312F 93.61%) border-box`
                                }}
                                size="xl"
                            />
                            <Typography color={active === '2' && 'secondary'} variant="label">
                                Request List
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: theme.palette.secondary.main
                                    }
                                }}
                                onClick={() => setActive('2')}
                            >
                                View Data
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack spacing={1} alignItems="center">
                            <Avatar
                                src={Image4}
                                color="secondary"
                                sx={{
                                    py: 2.5,
                                    px: 2,
                                    border: active === '3' && '5px solid transparent',
                                    background:
                                        active === '3' &&
                                        `linear-gradient(${theme.palette.secondary[200]} 0 0) padding-box,  linear-gradient(154.51deg, #6654D2 6.47%, #E8312F 93.61%) border-box`
                                }}
                                size="xl"
                            />
                            <Typography color={active === '3' && 'secondary'} variant="label">
                                On Delivery
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: theme.palette.secondary.main
                                    }
                                }}
                                onClick={() => setActive('3')}
                            >
                                View Data
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack spacing={1} alignItems="center">
                            <Avatar
                                src={Image5}
                                color="secondary"
                                sx={{
                                    py: 2,
                                    px: 2,
                                    border: active === '4' && '5px solid transparent',
                                    background:
                                        active === '4' &&
                                        `linear-gradient(${theme.palette.secondary[200]} 0 0) padding-box,  linear-gradient(154.51deg, #6654D2 6.47%, #E8312F 93.61%) border-box`
                                }}
                                size="xl"
                            />
                            <Typography color={active === '4' && 'secondary'} variant="label">
                                Return Item
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: theme.palette.secondary.main
                                    }
                                }}
                                onClick={() => setActive('4')}
                            >
                                View Data
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </MainCard>

            <Box sx={{ mt: 5 }} />

            {content}
        </Stack>
    );
};

export default Inventory;
