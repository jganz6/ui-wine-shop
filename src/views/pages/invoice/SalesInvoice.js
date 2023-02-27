/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// material ui
import { Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { IconPrinter } from '@tabler/icons';

// third party
import { useReactToPrint } from 'react-to-print';

const SalesInvoice = () => {
    const theme = useTheme();
    const { state } = useLocation();
    const printRef = useRef();

    const [detail, setDetail] = useState(state);

    useEffect(() => {
        if (state) setDetail(state);
    }, []);

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    return (
        <Stack gap={3}>
            <MainCard title="Sales Invoice" border sx={{ p: 3 }} ref={printRef}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Customer</Typography>
                            <Typography variant="label">{detail?.user_name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Transaction Number</Typography>
                            <Typography variant="label">{detail?.id}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Payment Status</Typography>
                            {detail?.status_payment === 1 && (
                                <Typography variant="label" color="primary">
                                    PAID
                                </Typography>
                            )}
                            {detail?.status_payment === 2 && (
                                <Typography variant="label" color="warning">
                                    OPEN
                                </Typography>
                            )}
                            {detail?.status_payment === 3 && (
                                <Typography variant="label" color="error">
                                    OVERDUE
                                </Typography>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Shipping Address</Typography>
                            <Typography variant="label">{detail?.destination_address}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Transaction Date</Typography>
                            <Typography variant="label">{detail?.request_date}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ background: theme.palette.grey[100], borderRadius: 20 }}>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detail?.details.map((item, key) => (
                                        <TableRow key={key}>
                                            <TableCell>{item.product_name}</TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                            <TableCell>Rp {item.price.toLocaleString('id')}</TableCell>
                                            <TableCell>Rp {(item.price * item.qty).toLocaleString('id')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Stack sx={{ mt: 5 }} alignItems="flex-end">
                    <Typography variant="h2">
                        Total: Rp {detail?.details.reduce((n, { qty, price }) => n + qty * price, 0).toLocaleString('id')}
                    </Typography>
                </Stack>
            </MainCard>
            <Stack alignItems="flex-end">
                <Button
                    startIcon={<IconPrinter />}
                    variant="contained"
                    color="tertiary"
                    sx={{ color: theme.palette.text.light }}
                    onClick={handlePrint}
                >
                    Print Invoice
                </Button>
            </Stack>
        </Stack>
    );
};

export default SalesInvoice;
