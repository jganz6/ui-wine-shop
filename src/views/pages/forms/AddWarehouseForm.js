import { useState, useEffect } from 'react';

// material ui
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { addWarehouse, getWarehouses } from 'store/slices/warehouse';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddWarehouseForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { errorCreate } = useSelector((state) => state.warehouse);
    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        address: yup.string().min(3, 'Must be at least 3 characters').required('Required')
        // email: yup.string().email('Invalid Format').required('Required'),
        // phone_number: yup.string().min(9).max(13).nullable()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            address: ''
            // phone_number: '',
            // email: '',
            // role: 'Warehouse'
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(addWarehouse(values));
            await dispatch(getWarehouses());
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && isDone) {
            navigate('/admin/warehouse');
        }
    }, [isDone, errorCreate, navigate]);

    return (
        <>
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
                                // value={formik.values.email}
                                // onChange={formik.handleChange}
                                // error={formik.touched.email && Boolean(formik.errors.email)}
                                // helperText={formik.touched.email && formik.errors.email}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Responsible Phone</Typography>
                            <TextField
                                fullWidth
                                id="phone_number"
                                name="phone_number  "
                                placeholder="Phone Number"
                                // value={formik.values.phone_number}
                                // onChange={(e) => formik.setFieldValue('phone_number', e.target.value.replace(/[^0-9]/g, ''))}
                                // error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                // helperText={formik.touched.phone_number && formik.errors.phone_number}
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
                                <Button variant="outlined" color="error" onClick={() => navigate('/admin/warehouse')}>
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
        </>
    );
};

export default AddWarehouseForm;
