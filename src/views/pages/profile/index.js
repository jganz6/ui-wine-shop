import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Alert, Box, Button, CardMedia, Divider, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import ImagePlaceholder from 'ui-component/cards/Skeleton/ImagePlaceholder';
import { gridSpacing } from 'store/constant';
import UpdatePassword from './UpdatePassword';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { updateProfile } from 'store/slices/user';
import { useDispatch, useSelector } from 'store';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
import moment from 'moment/moment';
import { Markup } from 'interweave';

// assets
import DateRangeIcon from '@mui/icons-material/DateRange';
import Cover from 'assets/images/background/profile-banner.jpg';
import { IconEdit, IconMail, IconPhone } from '@tabler/icons';
import { LoadingButton } from '@mui/lab';

const Profile = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { user, getUserInfo } = useAuth();
    const { borderRadius } = useConfig();

    const [isEdit, setIsEdit] = useState(false);

    const { error } = useSelector((state) => state.user);

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const validationSchema = yup.object().shape({
        first_name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        address: yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        email: yup.string().email('Invalid Format').required('Required'),
        birth_date: yup.date().nullable(),
        phone_number: yup.string().min(9).max(13).nullable()
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            address: user.address,
            phone_number: user.phone_number,
            email: user.email
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(updateProfile(values));
            await getUserInfo();
            if (!error) {
                setIsEdit(false);
            }
        }
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    contentSX={{
                        p: 1.5,
                        [theme.breakpoints.down('lg')]: {
                            textAlign: 'center'
                        }
                    }}
                >
                    {isLoading ? (
                        <ImagePlaceholder
                            sx={{
                                borderRadius: `${borderRadius}px`,
                                overflow: 'hidden',
                                mb: 3,
                                height: { xs: 85, sm: 150, md: 260 }
                            }}
                        />
                    ) : (
                        <CardMedia component="img" image={Cover} sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', mb: 3 }} />
                    )}
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md>
                            {isLoading ? (
                                <ImagePlaceholder
                                    sx={{
                                        margin: '-70px 0 0 auto',
                                        borderRadius: '16px',
                                        [theme.breakpoints.down('lg')]: {
                                            margin: '-70px auto 0'
                                        },
                                        [theme.breakpoints.down('md')]: {
                                            margin: '-60px auto 0'
                                        },
                                        width: { xs: 72, sm: 100, md: 140 },
                                        height: { xs: 72, sm: 100, md: 140 }
                                    }}
                                />
                            ) : (
                                <Avatar
                                    alt="User Avatar"
                                    color="secondary"
                                    sx={{
                                        margin: '-70px 0 0 auto',
                                        [theme.breakpoints.down('lg')]: {
                                            margin: '-70px auto 0'
                                        },
                                        [theme.breakpoints.down('md')]: {
                                            margin: '-60px auto 0'
                                        },
                                        width: { xs: 72, sm: 100, md: 140 },
                                        height: { xs: 72, sm: 100, md: 140 }
                                    }}
                                />
                            )}
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h4">{user?.full_name}</Typography>
                                    {user.role === '29' && <Typography variant="subtitle2">Administrator</Typography>}
                                    {user.role === '10' && <Typography variant="subtitle2">Warehouse</Typography>}
                                    {user.role === '20' && <Typography variant="subtitle2">Agent</Typography>}
                                    {user.role === '22' && <Typography variant="subtitle2">Partner</Typography>}
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Grid
                                        container
                                        spacing={1}
                                        sx={{
                                            justifyContent: 'flex-end',
                                            [theme.breakpoints.down('lg')]: {
                                                justifyContent: 'center'
                                            }
                                        }}
                                    >
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                startIcon={<IconEdit color={theme.palette.secondary.main} />}
                                                onClick={() => setIsEdit(true)}
                                            >
                                                Edit Profile
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>

            <Grid item xs={12}>
                {error && (
                    <Box sx={{ my: 2 }}>
                        <Alert severity="error">
                            <strong>Error: </strong>
                            <Markup content={error} />
                        </Alert>
                    </Box>
                )}
                <MainCard>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                        Personal Information
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <Typography>Birth Date</Typography>
                                        <MobileDatePicker
                                            value={formik.values.birth_date}
                                            inputFormat="dd/MM/yyyy"
                                            disabled={!isEdit}
                                            onChange={(date) => formik.setFieldValue('birth_date', moment(date).format())}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    disabled={!isEdit}
                                                    name="birth_date"
                                                    value={formik.values.birth_date}
                                                    required
                                                    error={formik.touched.birth_date && Boolean(formik.errors.birth_date)}
                                                    helperText={formik.touched.birth_date && formik.errors.birth_date}
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
                                            disabled={!isEdit}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconMail />
                                                    </InputAdornment>
                                                )
                                            }}
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
                                            value={formik.values.phone_number}
                                            onChange={(e) => formik.setFieldValue('phone_number', e.target.value.replace(/[^0-9]/g, ''))}
                                            error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                            helperText={formik.touched.phone_number && formik.errors.phone_number}
                                            disabled={!isEdit}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconPhone />
                                                    </InputAdornment>
                                                )
                                            }}
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
                                            disabled={!isEdit}
                                        />
                                    </Stack>
                                </Grid>
                                {isEdit && (
                                    <Grid container justifyContent="end" sx={{ mt: 3 }}>
                                        <Grid item>
                                            <Stack direction="row" alignItems="flex-end" spacing={2}>
                                                <Button variant="outlined" color="error" onClick={() => setIsEdit(false)}>
                                                    Cancel
                                                </Button>
                                                <LoadingButton
                                                    loading={formik.isSubmitting}
                                                    type="submit"
                                                    color="tertiary"
                                                    variant="contained"
                                                    sx={{ color: theme.palette.text.light }}
                                                >
                                                    Update Profile
                                                </LoadingButton>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </LocalizationProvider>
                    </form>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h3" sx={{ my: 2 }}>
                        Account Security
                    </Typography>
                    <UpdatePassword />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Profile;
