// material ui
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import { useDispatch } from 'store';
import { addAgent } from 'store/slices/agent';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddAgentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const validationSchema = yup.object().shape({
        first_name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        address: yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        email: yup.string().email('Invalid Format').required('Required'),
        phone: yup.string().min(9).max(13).nullable(),
        role: yup.string().notOneOf(['0'], 'You must select a role for this user').nullable().required('Required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: '',
            last_name: '',
            address: '',
            phone: '',
            email: '',
            role: 'Agent'
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(addAgent(values));
            navigate('/admin/agent');
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography>Mobile Phone</Typography>
                            <TextField
                                fullWidth
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formik.values.phone}
                                onChange={(e) => formik.setFieldValue('phone', e.target.value.replace(/[^0-9]/g, ''))}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
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
                                <Button variant="outlined" color="error" onClick={() => navigate('/admin/agent')}>
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

export default AddAgentForm;
