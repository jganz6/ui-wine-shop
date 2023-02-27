/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// material ui
import {
    Button,
    Chip,
    CircularProgress,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { getPurchaseDetail } from 'store/slices/transaction';
import MainCard from 'ui-component/cards/MainCard';
import AlertDialog from 'ui-component/extended/AlertDialog';

// third party
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

// assets
import { IconPrinter } from '@tabler/icons';

const PurchaseInvoice = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const [openDialog, setOpenDialog] = useState(false);
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    // API
    const { purchaseDetail, fetching } = useSelector((state) => state.transaction);
    const [isDone, setIsDone] = useState(false);

    const fetchData = async () => {
        setIsDone(false);
        await dispatch(getPurchaseDetail(id));
        setIsDone(true);
    };

    useEffect(() => {
        if (!id) {
            setOpenDialog(true);
        } else {
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (!fetching && isDone && purchaseDetail.list_item.length === 0) {
            setOpenDialog(true);
        }
    }, [isDone, fetching, purchaseDetail]);

    return (
        <Stack gap={3}>
            {fetching ? (
                <Stack alignItems="center">
                    <CircularProgress color="secondary" />
                </Stack>
            ) : (
                purchaseDetail && (
                    <>
                        <MainCard title="Purchase Invoice" border sx={{ p: 3 }} ref={printRef}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Vendor</Typography>
                                        <Typography variant="label">{purchaseDetail?.vendor}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Invoice Number</Typography>
                                        <Typography variant="label">{purchaseDetail?.id}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1} alignItems="flex-start">
                                        <Typography>Status Order</Typography>
                                        {purchaseDetail?.status === '00' && <Chip label="On Progress" color="warning" />}
                                        {purchaseDetail?.status === '01' && <Chip label="Received" color="success" />}
                                        {purchaseDetail?.status === '02' && <Chip label="On Progress" color="error" />}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Destination Warehouse</Typography>
                                        <Typography variant="label">{purchaseDetail?.warehouse_name}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Shipping Address</Typography>
                                        <Typography variant="label">{purchaseDetail?.warehouse_address}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Transaction Date</Typography>
                                        <Typography variant="label">{moment(purchaseDetail?.created).format('DD MMMM YYYY')}</Typography>
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
                                                {purchaseDetail?.list_item?.map((item, key) => (
                                                    <TableRow key={key}>
                                                        <TableCell>{item.item_name}</TableCell>
                                                        <TableCell>
                                                            {item.qty} {item.satuan_unit}
                                                        </TableCell>
                                                        <TableCell>
                                                            Rp {item.cost.toLocaleString('id')}/{item.satuan_unit}
                                                        </TableCell>
                                                        <TableCell>Rp {(item.cost * item.qty).toLocaleString('id')}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <Stack sx={{ mt: 5 }} alignItems="flex-end">
                                <Typography variant="h2">
                                    Total: Rp{' '}
                                    {purchaseDetail?.list_item?.reduce((n, { qty, cost }) => n + qty * cost, 0).toLocaleString('id')}
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
                    </>
                )
            )}

            <AlertDialog open={openDialog} onClose={() => navigate('/admin/purchase-order')} btnCancel="OK">
                Sorry we couldn't find the data you were looking for
            </AlertDialog>
        </Stack>
    );
};

export default PurchaseInvoice;
