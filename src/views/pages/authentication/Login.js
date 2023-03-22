// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Box, Typography } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import Logo from 'ui-component/Logo';
import AuthLogin from './auth-forms/AuthLogin';
// assets
import BgLogin from 'assets/images/auth/bg-login.png';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();

    return (
        <AuthWrapper1>
            <Grid container justifyContent={{ xs: 'center', sm: 'space-between' }} sx={{ minHeight: '80vh', backgroundColor: '#fff' }}>
                {/* left side */}
                <Grid item xs={12} sm={6} md={6} display="flex" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                    <Box
                        sx={{
                            width: { xs: '60%', sm: '95%', md: '85%', lg: '80%' },
                            borderRadius: { xs: '5px', sm: '0 5px 5px 0' },
                            background: 'linear-gradient(135.88deg, #0496FF 16.45%, #46beff 127.09%)',
                            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)'
                        }}
                    >
                        <Stack
                            justifyContent="space-between"
                            sx={{
                                textAlign: { xs: 'center', sm: 'left' },
                                height: '100%',
                                pl: { xs: 1, sm: 5, md: 5, lg: 8 },
                                pr: { xs: 1, sm: 3, lg: 8 },
                                py: 3
                            }}
                            spacing={{ xs: 1, sm: 4, lg: 5 }}
                        >
                            <Stack spacing={{ xs: 1, sm: 3 }}>
                                <Box>
                                    <Logo />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            color: theme.palette.text.light,
                                            fontSize: { xs: '0.8rem', sm: '1.6rem', md: '1.9rem', lg: '2.3rem' }
                                        }}
                                    >
                                        Welcome to Oting Wine Shop
                                    </Typography>
                                    {/* <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.hint,
                                            fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem', lg: '1.2rem' }
                                        }}
                                    >
                                        Deliver Food Instantly
                                    </Typography> */}
                                </Box>
                            </Stack>
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: theme.palette.text.light,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem', lg: '1.2rem' }
                                    }}
                                >
                                    &copy; 2022. Oting Wine Shop
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                {/* right side */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={5}
                    display="flex"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    pl={{ xs: 2, sm: 2, lg: 8 }}
                    pr={{ xs: 2, sm: 2, md: 5 }}
                >
                    <Stack spacing={4} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                        <Typography
                            variant="h1"
                            sx={{
                                color: theme.palette.text.light,
                                textAlign: { xs: 'center', sm: 'left' },
                                fontSize: { xs: '1.1rem', sm: '1.1rem', md: '1.4rem', lg: '1.9rem' }
                                // textShadow: '0px 0px 5px #000'
                            }}
                        >
                            <span style={{ color: theme.palette.primary.main }}>Login</span>
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <AuthLogin />
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
