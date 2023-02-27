import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import { Alert, Autocomplete, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { addUser, getUsers } from 'store/slices/user';
import { getWarehouses } from 'store/slices/warehouse';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddUserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { errorCreate } = useSelector((state) => state.user);
    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        first_name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        address: yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        email: yup.string().email('Invalid Format').required('Required'),
        phone_number: yup.string().min(9).max(13).nullable(),
        role: yup.string().notOneOf(['0'], 'You must select a role for this user').nullable().required('Required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: '',
            last_name: '',
            address: '',
            phone_number: '',
            email: '',
            role: '0',
            id_warehouse: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(addUser(values));
            await dispatch(getUsers(values));
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && isDone) {
            navigate('/admin/user-management');
        }
    }, [isDone, errorCreate, navigate]);

    // ====================== GET EXISTING WAREHOUSE FOR WAREHOUSE ROLE =========================//
    const { warehouses } = useSelector((state) => state.warehouse);
    const [openWarehouse, setOpenWarehouse] = useState(false);
    const warehouseLoading = openWarehouse && warehouses?.length === 0;

    useEffect(() => {
        if (formik.values.role === 'Warehouse') {
            dispatch(getWarehouses());
        }
    }, [formik.values.role, dispatch]);

    return (
        <>
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
                            <Typography>First Name</Typography>
                            <TextField
                                fullWidth
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography>Last Name</Typography>
                            <TextField
                                fullWidth
                                id="last_name"
                                name="last_name"
                                placeholder="Last Name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Email</Typography>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Mobile Phone</Typography>
                            <TextField
                                fullWidth
                                id="phone_number"
                                name="phone_number"
                                placeholder="Phone"
                                value={formik.values.phone_number}
                                inputProps={{ maxLength: 13 }}
                                onChange={(e) => formik.setFieldValue('phone_number', e.target.value.replace(/[^0-9]/g, ''))}
                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Role</Typography>
                            <TextField
                                fullWidth
                                id="role"
                                name="role"
                                placeholder="Role"
                                select
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                error={formik.touched.role && Boolean(formik.errors.role)}
                                helperText={formik.touched.role && formik.errors.role}
                            >
                                <MenuItem value="0" disabled>
                                    Select Role
                                </MenuItem>
                                <MenuItem value="Warehouse">Warehouse</MenuItem>
                                <MenuItem value="Agent">Agent</MenuItem>
                                <MenuItem value="Mitra">Mitra</MenuItem>
                            </TextField>
                        </Stack>
                    </Grid>
                    {formik.values.role === 'Warehouse' && (
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>Warehouse</Typography>
                                <Autocomplete
                                    disablePortal
                                    open={openWarehouse}
                                    onOpen={() => setOpenWarehouse(true)}
                                    onClose={() => setOpenWarehouse(false)}
                                    defaultValue={warehouses[warehouses.findIndex((vals) => vals.id === formik.values.id_warehouse)]}
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
                    )}
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Typography>Address</Typography>
                            <TextField
                                fullWidth
                                id="address"
                                name="address"
                                placeholder="Adress"
                                multiline
                                rows={3}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Stack>
                    </Grid>
                    <Grid container justifyContent="end" sx={{ mt: 3 }}>
                        <Grid item>
                            <Stack direction="row" alignItems="flex-end" spacing={2}>
                                <Button variant="outlined" color="error" onClick={() => navigate('/admin/user-management')}>
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
        </>
    );
};

export default AddUserForm;
