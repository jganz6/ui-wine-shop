/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import { Alert, Autocomplete, Button, CircularProgress, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// project imports
import { useDispatch, useSelector } from 'store';
import { getInventories } from 'store/slices/inventory';
import { getWarehouses } from 'store/slices/warehouse';
import { createPurchaseOrder } from 'store/slices/transaction';

// third party
import * as yup from 'yup';
import { useFormik, FieldArray, FormikProvider, getIn } from 'formik';
import { IconTrash } from '@tabler/icons';

const AddPurchaseOrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { errorCreate } = useSelector((state) => state.inventory);
    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        vendor: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        id_warehouse: yup.string().required('Required'),
        order_list: yup.array().of(
            yup.object().shape({
                id_item: yup.string().required('Required'),
                qty: yup.string().required('Required')
            })
        )
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            vendor: '',
            id_warehouse: '',
            order_list: [
                {
                    id_item: '',
                    qty: '',
                    sum: 0
                }
            ]
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(createPurchaseOrder(values));
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && isDone) {
            navigate('/admin/purchase-order');
        }
    }, [isDone, errorCreate, navigate]);

    // ====================== GET EXISTING WAREHOUSE AND ITEM FOR AUTOCOMPLETE=========================//
    const { warehouses } = useSelector((state) => state.warehouse);
    const [openWarehouse, setOpenWarehouse] = useState(false);
    const warehouseLoading = openWarehouse && warehouses?.length === 0;

    useEffect(() => {
        dispatch(getWarehouses());
    }, [dispatch]);

    const { inventories } = useSelector((state) => state.inventory);
    const itemLoading = inventories?.length === 0;

    useEffect(() => {
        dispatch(getInventories());
    }, [dispatch]);

    // ====================== SUMMARY STATE =========================//
    const [totalQty, setTotalQty] = useState(0);
    useEffect(() => {
        setTotalQty(formik.values.order_list.reduce((sum, { qty }) => sum + parseInt(qty || 0), 0));
    }, [formik.values.order_list]);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(formik.values.order_list.reduce((total, { sum }) => total + sum, 0).toLocaleString('id'));
    }, [formik.values.order_list]);

    return (
        <>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        {errorCreate && isDone && (
                            <Grid item xs={12}>
                                <Alert severity="error">
                                    <Typography sx={{ fontWeight: 'bold' }}>Error {errorCreate?.code}</Typography>
                                    {errorCreate?.message}
                                </Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Vendor</Typography>
                                <TextField
                                    fullWidth
                                    id="vendor"
                                    name="vendor"
                                    placeholder="Vendor"
                                    value={formik.values.vendor}
                                    onChange={formik.handleChange}
                                    error={formik.touched.vendor && Boolean(formik.errors.vendor)}
                                    helperText={formik.touched.vendor && formik.errors.vendor}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>To Warehouse</Typography>
                                <Autocomplete
                                    disablePortal
                                    open={openWarehouse}
                                    onOpen={() => setOpenWarehouse(true)}
                                    onClose={() => setOpenWarehouse(false)}
                                    defaultValue={warehouses[warehouses.findIndex((vals) => vals.id === formik.values?.id_warehouse)]}
                                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                                    getOptionLabel={(option) => option?.name || ''}
                                    options={warehouses}
                                    loading={warehouseLoading}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.touched.id_warehouse && Boolean(formik.errors.id_warehouse)}
                                            helperText={formik.touched.id_warehouse && formik.errors.id_warehouse}
                                            InputProps={{
                                                ...params.InputProps,

                                                endAdornment: (
                                                    <>
                                                        {warehouseLoading ? (
                                                            <CircularProgress color="inherit" size={20} sx={{ marginRight: '1.4rem' }} />
                                                        ) : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                )
                                            }}
                                            placeholder="Warehouse"
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        formik.setFieldValue('id_warehouse', newValue?.id);
                                    }}
                                />
                            </Stack>
                        </Grid>

                        <FieldArray
                            name="order_list"
                            render={(arrayHelpers) => (
                                <>
                                    {formik.values.order_list.map((item, index) => {
                                        const productId = `order_list[${index}].id_item`;
                                        const touchedProductId = getIn(formik.touched, productId);
                                        const errorProductId = getIn(formik.errors, productId);

                                        const productQty = `order_list[${index}].qty`;
                                        const touchedProductQty = getIn(formik.touched, productQty);
                                        const errorProductQty = getIn(formik.errors, productQty);

                                        const sum = `order_list[${index}].sum`;
                                        return (
                                            <Fragment key={index}>
                                                <Grid item xs={12} md={6}>
                                                    <Stack gap={1}>
                                                        <Typography>Product {index + 1}</Typography>
                                                        <Autocomplete
                                                            disablePortal
                                                            defaultValue={
                                                                inventories[inventories.findIndex((vals) => vals.id === productId)]
                                                            }
                                                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                                                            getOptionLabel={(option) => option?.name || ''}
                                                            options={inventories}
                                                            loading={itemLoading}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    onBlur={formik.handleBlur}
                                                                    error={touchedProductId && Boolean(errorProductId)}
                                                                    helperText={touchedProductId && errorProductId}
                                                                    InputProps={{
                                                                        ...params.InputProps,

                                                                        endAdornment: (
                                                                            <>
                                                                                {itemLoading ? (
                                                                                    <CircularProgress
                                                                                        color="inherit"
                                                                                        size={20}
                                                                                        sx={{ marginRight: '1.4rem' }}
                                                                                    />
                                                                                ) : null}
                                                                                {params.InputProps.endAdornment}
                                                                            </>
                                                                        )
                                                                    }}
                                                                    placeholder="Product Name"
                                                                />
                                                            )}
                                                            onChange={(event, newValue) => {
                                                                formik.setFieldValue(productId, newValue?.id);
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={6} md={1}>
                                                    <Stack gap={1}>
                                                        <Typography>Qty</Typography>
                                                        <TextField
                                                            id="qty"
                                                            placeholder="Qty"
                                                            name={productQty}
                                                            value={item.qty}
                                                            onChange={(event) => {
                                                                formik.setFieldValue(productQty, event.target.value.replace(/[^0-9]/g, ''));
                                                                formik.setFieldValue(
                                                                    sum,
                                                                    parseInt(event.target.value) *
                                                                        inventories[
                                                                            inventories.findIndex(
                                                                                (vals) =>
                                                                                    vals.id === formik.values.order_list[index].id_item
                                                                            )
                                                                        ].cost
                                                                );
                                                            }}
                                                            onBlur={formik.handleBlur}
                                                            error={touchedProductQty && Boolean(errorProductQty)}
                                                            helperText={touchedProductQty && errorProductQty}
                                                            fullWidth
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3} md={2}>
                                                    <Stack gap={1}>
                                                        <Typography>Cost</Typography>
                                                        <TextField
                                                            placeholder="0"
                                                            InputProps={{
                                                                startAdornment: 'Rp'
                                                            }}
                                                            disabled
                                                            fullWidth
                                                            value={inventories[
                                                                inventories.findIndex(
                                                                    (vals) => vals.id === formik.values.order_list[index].id_item
                                                                ) || 0
                                                            ]?.cost?.toLocaleString('id')}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={3} md={2}>
                                                    <Stack gap={1}>
                                                        <Typography>Total Cost</Typography>
                                                        <TextField
                                                            placeholder="0"
                                                            InputProps={{
                                                                startAdornment: 'Rp'
                                                            }}
                                                            disabled
                                                            fullWidth
                                                            value={(
                                                                inventories[
                                                                    inventories.findIndex(
                                                                        (vals) => vals.id === formik.values.order_list[index].id_item
                                                                    )
                                                                ]?.cost * parseInt(formik.values.order_list[index].qty) || 0
                                                            )?.toLocaleString('id')}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        sx={{ mt: 4 }}
                                                        size="small"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        disabled={formik.values.order_list.length < 2}
                                                    >
                                                        <IconTrash
                                                            color={
                                                                formik.values.order_list.length > 1
                                                                    ? theme.palette.error.main
                                                                    : theme.palette.action.disabled
                                                            }
                                                        />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider
                                                        sx={{
                                                            borderBottomWidth: '2px',
                                                            borderRadius: 10
                                                        }}
                                                    />
                                                </Grid>
                                            </Fragment>
                                        );
                                    })}

                                    <Grid item xs={12}>
                                        <Button
                                            color="tertiary"
                                            variant="contained"
                                            size="small"
                                            fullWidth
                                            sx={{ color: theme.palette.text.light }}
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    id_item: '',
                                                    qty: '',
                                                    sum: 0
                                                })
                                            }
                                        >
                                            Add Product
                                        </Button>
                                    </Grid>
                                </>
                            )}
                        />

                        <Grid item xs={12}>
                            <Stack gap={1} alignItems="flex-end">
                                <Typography>Total Varian: {formik.values.order_list.filter((val) => val.id_item).length}</Typography>
                                <Typography>Total Quantity: {totalQty}</Typography>
                                <Typography>Total Price</Typography>
                                <Typography variant="title">Rp {totalPrice}</Typography>
                            </Stack>
                        </Grid>

                        <Grid container justifyContent="end" sx={{ mt: 3 }}>
                            <Grid item>
                                <Stack direction="row" alignItems="flex-end" spacing={2}>
                                    <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
                                        Cancel
                                    </Button>
                                    <LoadingButton
                                        loading={formik.isSubmitting}
                                        type="submit"
                                        color="tertiary"
                                        variant="contained"
                                        sx={{ color: theme.palette.text.light }}
                                    >
                                        Submit
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </FormikProvider>
        </>
    );
};

export default AddPurchaseOrderForm;
