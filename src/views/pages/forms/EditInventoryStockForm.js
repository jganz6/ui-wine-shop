/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';

// material ui
import { Button, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment/moment';

// assets
import DateRangeIcon from '@mui/icons-material/DateRange';

const EditInventoryStockForm = ({ data, onClose }) => {
    // const dispatch = useDispatch();
    const theme = useTheme();

    const validationSchema = yup.object().shape({
        production_code: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        stock: yup.string().required('Required'),
        exp_date: yup.date().required('Required').nullable()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            production_code: '',
            name: data.name || '',
            stock: data.stock || '',
            exp_date: null
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            onClose();
        }
    });

    return (
        <Stack spacing={2}>
            <Typography variant="h3">Update Stock Inventory</Typography>
            <form onSubmit={formik.handleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>Product Name</Typography>
                                <TextField
                                    disabled
                                    fullWidth
                                    id="name"
                                    name="name"
                                    placeholder="Product Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>Production Code</Typography>
                                <TextField
                                    fullWidth
                                    id="production_code"
                                    name="production_code"
                                    placeholder="Production Code"
                                    value={formik.values.production_code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.production_code && Boolean(formik.errors.production_code)}
                                    helperText={formik.touched.production_code && formik.errors.production_code}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Stock</Typography>
                                <TextField
                                    fullWidth
                                    id="stock"
                                    name="stock"
                                    placeholder="0"
                                    value={formik.values.stock}
                                    onChange={(e) => formik.setFieldValue('stock', e.target.value.replace(/[^0-9]/g, ''))}
                                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                                    helperText={formik.touched.stock && formik.errors.stock}
                                    InputProps={{
                                        startAdornment: 'Rp'
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Exp Date</Typography>
                                <MobileDatePicker
                                    value={formik.values.exp_date}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={(date) => formik.setFieldValue('exp_date', moment(date).format())}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            name="exp_date"
                                            value={formik.values.exp_date}
                                            required
                                            error={formik.touched.exp_date && Boolean(formik.errors.exp_date)}
                                            helperText={formik.touched.exp_date && formik.errors.exp_date}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <DateRangeIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
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
                </LocalizationProvider>
            </form>
        </Stack>
    );
};

EditInventoryStockForm.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func
};

export default EditInventoryStockForm;
