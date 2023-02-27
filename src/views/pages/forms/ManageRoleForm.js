import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material ui
import { Alert, Autocomplete, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { editUser, getUsers } from 'store/slices/user';
import { getWarehouses } from 'store/slices/warehouse';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const ManageRoleForm = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { errorUpdate } = useSelector((state) => state.user);
    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        role: yup.string().notOneOf(['0'], 'You must select a role for this user').nullable().required('Required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address || '',
            phone_number: data.phone_number || '',
            email: data.email || '',
            role: data.role_string[0].toUpperCase() + data.role_string.slice(1).toLowerCase(),
            id_warehouse: data.id_company || '',
            status: Boolean(data.status)
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(editUser(data.id, values));
            await dispatch(getUsers());
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorUpdate && isDone) {
            onClose();
        }
    }, [isDone, errorUpdate, onClose]);

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
        <Stack spacing={2}>
            <Typography variant="h3">
                Manage Role for {data.first_name} {data.last_name}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    {errorUpdate && isDone && (
                        <Grid item xs={12}>
                            <Alert severity="error">
                                <Typography sx={{ fontWeight: 'bold' }}>Error {errorUpdate?.code}</Typography>
                                {errorUpdate?.message}
                            </Alert>
                        </Grid>
                    )}
                    <Grid item xs={12}>
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
                    )}
                    <Grid container justifyContent="end" sx={{ mt: 3 }}>
                        <Grid item>
                            <Stack direction="row" alignItems="flex-end" spacing={2}>
                                <Button variant="outlined" color="error" onClick={onClose}>
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
        </Stack>
    );
};

ManageRoleForm.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func
};

export default ManageRoleForm;
