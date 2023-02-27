/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// material ui
import {
    Box,
    Button,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import FilePreviewDialog from 'ui-component/extended/FilePreviewDialog';

// third party
import { useReactToPrint } from 'react-to-print';

// assets
import Image from 'assets/images/icons/image.png';
import { IconPrinter } from '@tabler/icons';

const ReturnInvoice = () => {
    const theme = useTheme();
    const { state } = useLocation();
    const printRef = useRef();

    const [detail, setDetail] = useState(state);
    const [openAttachemnt, setOpenAttachemnt] = useState(false);

    useEffect(() => {
        if (state) setDetail(state);
    }, []);

    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    return (
        <Stack gap={3}>
            <MainCard title="Return Product Report" border sx={{ p: 3 }} ref={printRef}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Customer</Typography>
                            <Typography variant="label">{detail?.user_name}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Item Amount</Typography>
                            <Typography variant="label">{detail?.details.length}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Reason</Typography>
                            <Typography variant="label" color="error">
                                {detail?.problem}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Solution</Typography>
                            <Typography variant="label">{detail?.solution}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Return Request Date</Typography>
                            <Typography variant="label">{detail?.request_date}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Proof</Typography>
                            <Tooltip title="Open Image">
                                <Box
                                    component="img"
                                    src={Image}
                                    sx={{ maxWidth: '30px', cursor: 'pointer' }}
                                    onClick={() => setOpenAttachemnt(true)}
                                />
                            </Tooltip>
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
                    Print Report
                </Button>
            </Stack>

            {openAttachemnt && detail && (
                <FilePreviewDialog
                    open={openAttachemnt}
                    onClose={() => setOpenAttachemnt(false)}
                    data={{ path: detail?.proof_attachment, file_ext: 'png' }}
                />
            )}
        </Stack>
    );
};

export default ReturnInvoice;
