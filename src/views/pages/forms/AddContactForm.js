import { useNavigate } from 'react-router-dom';

// material ui
import {
    Button,
    Grid,
    Box,
    MenuItem,
    Stack,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddContactForm = () => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const validationSchema = yup.object().shape({
        name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        description: yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        capital_price: yup.string().required('Required'),
        selling_price: yup.string().required('Required'),
        units: yup.string().notOneOf(['0'], 'You must select a units for this user').nullable().required('Required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            type: '',
            description: '',
            weight: '',
            units: '0',
            capital_price: '',
            selling_price: '',
            image: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} mt={2} mb={4}>
                    <Grid item xs={12}>
                        <Stack>
                            <Typography variant="h4">Contact Information</Typography>

                            {/* display name */}
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1} mt={3}>
                                        <Typography variant="h5">Display Name</Typography>
                                        <TextField
                                            id="name"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* contact type */}
                            <Grid container mt={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Contact Type</Typography>
                                    <FormControl>
                                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                                            <FormControlLabel control={<Checkbox />} label="Management" />
                                            <FormControlLabel control={<Checkbox />} label="Agent" />
                                            <FormControlLabel control={<Checkbox />} label="Mitra" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Box mt={2} />
                            <Typography variant="h4">General Information</Typography>

                            {/* full name */}
                            <Grid container mt={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Full Name</Typography>
                                    <Grid container mt={3} gap={2}>
                                        <Grid item xs={12} sm={2} md={1.5}>
                                            <TextField select defaultValue="Mr/Mrs" fullWidth>
                                                <MenuItem key="Mr/Mrs" value="Mr/Mrs">
                                                    Mr/Mrs
                                                </MenuItem>
                                                <MenuItem key="Mr" value="Mr">
                                                    Mr
                                                </MenuItem>
                                                <MenuItem key="Mrs" value="Mrs">
                                                    Mrs
                                                </MenuItem>
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <TextField id="first name" name="first name" placeholder="First Name" fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField id="last name" name="last name" placeholder="Last Name" fullWidth />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* identity */}
                            <Grid container mt={3} gap={2}>
                                <Grid item xs={12} sm={2} md={1.5}>
                                    <Stack gap={2}>
                                        <Typography variant="h5">Identity</Typography>
                                        <TextField select defaultValue="Mr/Mrs">
                                            <MenuItem key="Mr/Mrs" value="Mr/Mrs">
                                                KTP
                                            </MenuItem>
                                            <MenuItem key="Mr" value="Mr">
                                                SIM
                                            </MenuItem>
                                        </TextField>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Stack gap={2}>
                                        <Typography variant="h5">Identity Number</Typography>
                                        <TextField id="first name" name="first name" />
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* email */}
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1} mt={3}>
                                        <Typography variant="h5">Email</Typography>
                                        <TextField
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.emaile)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                            {/* phone number */}
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Stack spacing={1} mt={3}>
                                        <Typography variant="h5">Phone Number</Typography>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Grid container sx={{ mt: 5 }}>
                                <Grid item xs={12} md={3} lg={1.5}>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        color="tertiary"
                                        variant="contained"
                                        sx={{ color: theme.palette.text.light }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default AddContactForm;
