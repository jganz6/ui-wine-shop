import { useState } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports

// third party
import * as yup from 'yup';
import { useFormik, FormikProvider } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UpdatePassword = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    const handleMouseDownPassword3 = (event) => {
        event.preventDefault();
    };

    const validationSchema = yup.object().shape({
        old_password: yup.string().max(255).nullable().required('Password is required'),
        password: yup.string().max(255).nullable().required('Password is required'),
        confirm_password: yup
            .string()
            .nullable()
            .when('password', {
                is: (val) => !!(val && val.length > 0),
                then: yup.string().oneOf([yup.ref('password')], 'Both Password must be match!')
            })
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            old_password: '',
            password: '',
            confirm_password: ''
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            resetForm();
        }
    });
    return (
        <>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>Current Password</Typography>
                                <TextField
                                    placeholder="Current Password"
                                    name="old_password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    value={formik.values.old_password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                                    helperText={formik.touched.old_password && formik.errors.old_password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility color="secondary" /> : <VisibilityOff color="secondary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>New Password</Typography>
                                <TextField
                                    placeholder="New Password"
                                    name="password"
                                    type={showPassword2 ? 'text' : 'password'}
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword2}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword2 ? <Visibility color="secondary" /> : <VisibilityOff color="secondary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <Typography>Confirm New Password</Typography>
                                <TextField
                                    placeholder="Confirm New Password"
                                    name="confirm_password"
                                    type={showPassword3 ? 'text' : 'password'}
                                    fullWidth
                                    value={formik.values.confirm_password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword3}
                                                    onMouseDown={handleMouseDownPassword3}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword3 ? <Visibility color="secondary" /> : <VisibilityOff color="secondary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                <LoadingButton
                                    loading={formik.isSubmitting}
                                    disabled={formik.isSubmitting}
                                    variant="contained"
                                    type="submit"
                                    color="tertiary"
                                    sx={{ color: theme.palette.text.light }}
                                >
                                    Update Password
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </FormikProvider>
        </>
    );
};

export default UpdatePassword;
