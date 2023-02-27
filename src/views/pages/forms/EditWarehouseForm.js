import PropTypes from 'prop-types';

// material ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch } from 'store';
import { editWarehouse, getWarehouses } from 'store/slices/warehouse';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const EditWarehouseForm = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const validationSchema = yup.object().shape({
        name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        address: yup.string().min(3, 'Must be at least 3 characters').required('Required')
        // email: yup.string().email('Invalid Format').required('Required'),
        // phone: yup.string().min(9).max(13).nullable()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: data.id,
            name: data.name || '',
            address: data.address || ''
            // phone_number: data.phone || '',
            // email: data.email || '',
            // role: 'Warehouse'
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(editWarehouse(values));
            await dispatch(getWarehouses());
            onClose();
        }
    });
    return (
        <Stack spacing={2}>
            <Typography variant="h3">Edit Warehouse</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Typography>Warehouse Name</Typography>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                placeholder="Warehouse Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Stack>
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Responsible Email</Typography>
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
                            <Typography>Responsible Phone</Typography>
                            <TextField
                                fullWidth
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={formik.values.phone}
                                onChange={(e) => formik.setFieldValue('phone', e.target.value.replace(/[^0-9]/g, ''))}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                        </Stack>
                    </Grid> */}
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
                                <Button variant="outlined" color="error" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="tertiary" variant="contained" sx={{ color: theme.palette.text.light }}>
                                    Submit
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Stack>
    );
};

EditWarehouseForm.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func
};

export default EditWarehouseForm;
