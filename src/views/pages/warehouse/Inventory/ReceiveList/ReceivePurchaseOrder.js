/* eslint-disable radix */
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

// material ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { getPurchaseDetail } from 'store/slices/transaction';

const ReceivePurchaseOrder = () => {
    const theme = useTheme();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [receiveQTY, setReceiveQTY] = useState(0);

    const { purchaseDetail } = useSelector((state) => state.transaction);

    // get inventory list
    useEffect(() => {
        dispatch(getPurchaseDetail(id));
    }, [dispatch]);

    useEffect(() => {
        setData(purchaseDetail);
    }, [purchaseDetail]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Stack gap={1}>
                    <Typography>Vendor</Typography>
                    <TextField type="text" value={data.warehouse_name || ''} disabled fullWidth />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
                <Stack gap={1}>
                    <Typography>Warehouse</Typography>
                    <TextField type="text" value={data.warehouse_name || ''} disabled fullWidth />
                </Stack>
            </Grid>
            {data &&
                data?.list_item?.map((item, key) => (
                    <Fragment key={key}>
                        <Grid item xs={12} md={5}>
                            <Stack gap={1}>
                                <Typography>Product Name {key + 1}</Typography>
                                <TextField value={item.item_name} disabled fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item xs={2} md>
                            <Stack gap={1}>
                                <Typography>Qty</Typography>
                                <TextField value={item.qty} disabled fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item xs={2} md>
                            <Stack gap={1}>
                                <Typography>Received Qty</Typography>
                                <TextField value={receiveQTY} fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Stack gap={1}>
                                <Typography>Cost</Typography>
                                <TextField
                                    fullWidth
                                    value={item.cost.toLocaleString('id')}
                                    disabled
                                    InputProps={{ startAdornment: 'Rp' }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Stack gap={1}>
                                <Typography>Total</Typography>
                                <TextField
                                    fullWidth
                                    value={(item.qty * item.cost).toLocaleString('id')}
                                    disabled
                                    InputProps={{ startAdornment: 'Rp' }}
                                />
                            </Stack>
                        </Grid>
                    </Fragment>
                ))}

            <Grid item xs={12}>
                <Stack gap={1} alignItems="flex-end" sx={{ mt: 3 }}>
                    <Typography>Total Varian: {data && data.details?.length}</Typography>
                    <Typography>Total Quantity: {data && data.details?.reduce((sum, { qty }) => sum + parseInt(qty || 0), 0)}</Typography>
                    <Typography>Total Price</Typography>
                    <Typography variant="title">
                        Rp {data && data?.details?.reduce((sum, { total }) => total + sum, 0).toLocaleString('id')}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack gap={1} alignItems="flex-end">
                    <Button variant="contained" color="tertiary" sx={{ color: theme.palette.text.light }}>
                        Save
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ReceivePurchaseOrder;
