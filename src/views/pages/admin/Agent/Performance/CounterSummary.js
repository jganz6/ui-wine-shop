// material ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'ui-component/cards/MainCard';

// assets
import ImageOrder from 'assets/images/icons/order.png';
import ImageSales from 'assets/images/icons/sales.png';
import ImageMitra from 'assets/images/icons/mitra.png';
import ImageIncome from 'assets/images/icons/income.png';

const CounterSummary = () => (
    <Stack>
        <Grid container spacing={3} justifyContent="space-between">
            <Grid item xs={12} md={3}>
                <MainCard border gradientBorder>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Box component="img" src={ImageOrder} sx={{ maxHeight: '100px' }} />
                        <Stack spacing={1}>
                            <Typography variant="title">200</Typography>
                            <Typography>Total Order</Typography>
                        </Stack>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={3}>
                <MainCard border gradientBorder>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Box component="img" src={ImageSales} sx={{ maxHeight: '100px' }} />
                        <Stack spacing={1}>
                            <Typography variant="title">198</Typography>
                            <Typography>Total Sales</Typography>
                        </Stack>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={3}>
                <MainCard border gradientBorder>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Box component="img" src={ImageMitra} sx={{ maxHeight: '100px' }} />
                        <Stack spacing={1}>
                            <Typography variant="title">20</Typography>
                            <Typography>Total Mitra</Typography>
                        </Stack>
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} md={3}>
                <MainCard border gradientBorder>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-around">
                        <Box component="img" src={ImageIncome} sx={{ maxHeight: '100px' }} />
                        <Stack spacing={1}>
                            <Typography variant="title">300,000,000</Typography>
                            <Typography>Total Income</Typography>
                        </Stack>
                    </Stack>
                </MainCard>
            </Grid>
        </Grid>
    </Stack>
);

export default CounterSummary;
