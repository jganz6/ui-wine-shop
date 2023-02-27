import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Stack,
    Box,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    AlertTitle,
    Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Markup } from 'interweave';

// project imports
// import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const { submitLogin } = useAuth();

    // password
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await submitLogin(values.email, values.password).then((res) => {
                            try {
                                if (res && res.status !== 201) {
                                    setStatus({ success: false });
                                    setErrors({
                                        code: res.status,
                                        submit: res.data.message
                                    });
                                    setSubmitting(false);
                                }
                            } catch (error) {
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    setErrors({
                                        submit: 'Something wrong. Please contact your Administrator'
                                    });
                                    setSubmitting(false);
                                }
                            }
                        });
                    } catch (err) {
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <>
                        {errors.submit && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                <AlertTitle>
                                    <strong>Error: {errors.code}</strong>
                                </AlertTitle>
                                <>
                                    <Markup content={errors.submit} />
                                </>
                            </Alert>
                        )}
                        <form noValidate onSubmit={handleSubmit}>
                            <Stack spacing={2} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                                <Stack sx={{ width: '100%' }} spacing={1}>
                                    {/* email */}
                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                        <OutlinedInput
                                            size="large"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            sx={{
                                                '& :-webkit-autofill': {
                                                    transitionDelay: '9999s'
                                                }
                                            }}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    {/* password */}
                                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                                        <OutlinedInput
                                            size="large"
                                            notched={false}
                                            placeholder="Password"
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={values.password}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="small"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            sx={{
                                                '& :-webkit-autofill': {
                                                    transitionDelay: '9999s'
                                                }
                                            }}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    {/* Forgot Password */}
                                    <Typography
                                        variant="subtitle2"
                                        component={Link}
                                        to="/forgot"
                                        sx={{ textDecoration: 'none', color: theme.palette.text.light, textAlign: 'right' }}
                                    >
                                        Forgot Password?
                                    </Typography>
                                </Stack>
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                width: 'fit-content',
                                                backgroundColor: theme.palette.tertiary.main,
                                                color: theme.palette.text.light,
                                                fontSize: { sm: '0.7rem', md: '0.75rem', lg: '0.9rem' },
                                                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)',
                                                borderRadius: '10px',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.tertiary.dark
                                                }
                                            }}
                                        >
                                            PROCEED
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </Stack>
                        </form>
                    </>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
