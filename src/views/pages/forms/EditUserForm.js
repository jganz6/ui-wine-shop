import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material ui
import { Alert, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch, useSelector } from 'store';
import { editUser, getUsers } from 'store/slices/user';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const EditUserForm = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { errorUpdate } = useSelector((state) => state.user);
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
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address || '',
            phone_number: data.phone_number || '',
            email: data.email || '',
            role: data.role_string[0].toUpperCase() + data.role_string.slice(1).toLowerCase(),
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

    return (
        <Stack spacing={2}>
            <Typography variant="h3">Edit User</Typography>
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
                                inputProps={{ maxLength: 13 }}
                                value={formik.values.phone_number}
                                onChange={(e) => formik.setFieldValue('phone_number', e.target.value.replace(/[^0-9]/g, ''))}
                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                            <Typography>Status</Typography>
                            <TextField
                                fullWidth
                                id="status"
                                name="status"
                                placeholder="Status"
                                select
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                error={formik.touched.status && Boolean(formik.errors.status)}
                                helperText={formik.touched.status && formik.errors.status}
                            >
                                <MenuItem value="0" disabled>
                                    Select Status
                                </MenuItem>
                                <MenuItem value={Boolean(true)}>Active</MenuItem>
                                <MenuItem value={Boolean(false)}>InActive</MenuItem>
                            </TextField>
                        </Stack>
                    </Grid>
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

EditUserForm.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func
};

export default EditUserForm;
