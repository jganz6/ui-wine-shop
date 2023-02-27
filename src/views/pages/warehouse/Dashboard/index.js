import React from 'react';

// material-ui
import { Container, Grid, Stack, Box, Card, Typography } from '@mui/material';

// project imports
import { useTheme } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

// assets
import IconStock from 'assets/images/warehouse/iconStock.png';
import IconProfit from 'assets/images/warehouse/iconProfit.png';
import IconReturn from 'assets/images/warehouse/iconReturn.png';
import IconSalesInvoice from 'assets/images/warehouse/iconSalesInvoice.png';
import IconSalesOrder from 'assets/images/warehouse/iconSalesOrder.png';
import IconPurchaseInvoice from 'assets/images/warehouse/iconPurchaseInvoice.png';
import IconProfitReport from 'assets/images/warehouse/iconProfitReport.png';
import IconExpenseTransaction from 'assets/images/warehouse/iconExpenseTransaction.png';
import IconNewProduct from 'assets/images/warehouse/iconNewProduct.png';

export default function Dashboard() {
    const theme = useTheme();
    return (
        <Container>
            <Grid container my={4} gap={4}>
                {/* top */}
                <Grid item xs={12}>
                    <Stack flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" gap={3}>
                        {/* 1 */}
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                <Stack gap={1}>
                                    <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem', lg: '1.5rem' } }}>
                                        1500
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.7rem', md: '0.8rem', lg: '1rem' }
                                        }}
                                    >
                                        Total Stock Product
                                    </Typography>
                                </Stack>
                                <Box component="img" src={IconStock} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                            </Stack>
                        </Card>
                        {/* 2 */}
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                <Stack gap={1}>
                                    <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem', lg: '1.5rem' } }}>
                                        200
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.7rem', md: '0.8rem', lg: '1rem' }
                                        }}
                                    >
                                        Total Return Product
                                    </Typography>
                                </Stack>
                                <Box component="img" src={IconProfit} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                            </Stack>
                        </Card>
                        {/* 3 */}
                        <Card sx={{ p: 2, display: 'flex', alignItems: 'center', boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                            <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                <Stack gap={1}>
                                    <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem', lg: '1.5rem' } }}>
                                        1500
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.7rem', md: '0.8rem', lg: '1rem' }
                                        }}
                                    >
                                        Total Sales Invoice
                                    </Typography>
                                </Stack>
                                <Box component="img" src={IconReturn} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h1" sx={{ fontSize: '1.5rem' }}>
                        Aktivitas apa yang ingin dilakukan ?
                    </Typography>
                </Grid>
                {/* bot */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" gap={3}>
                        {/* Sales Invoice */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconSalesInvoice} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        See Sales Invoice
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                        {/* Sales Order */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconSalesOrder} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        See Sales Order
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                        {/* Purchase Invoice */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconPurchaseInvoice} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        Create Purchase Invoice
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                        {/* Profit & Loss Report */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconProfitReport} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        See Profit & Loss Report
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                        {/* Expense Transaction */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconExpenseTransaction} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        Create Expense Transaction
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                        {/* New Product */}
                        <Grid item xs={12} sm={3.5} lg={3}>
                            <MainCard border gradientBorder sx={{ py: { md: 0, lg: 2 }, boxShadow: '0px 29px 38px rgba(62, 73, 84, 0.1)' }}>
                                <Stack alignItems="center" textAlign="center" gap={{ xs: 2, sm: 4 }}>
                                    <Box component="img" src={IconNewProduct} sx={{ width: { xs: 80, sm: 60, md: 80, lg: 110 } }} />
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontSize: { xs: '0.9rem', sm: '0.55rem', md: '0.75rem', lg: '0.9rem' },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.secondary.main
                                            }
                                        }}
                                    >
                                        Add New Product
                                    </Typography>
                                </Stack>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
