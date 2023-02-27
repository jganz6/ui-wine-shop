/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import { Alert, Avatar, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// project imports
import { useDispatch, useSelector } from 'store';
import { useDropzone } from 'react-dropzone';
import formatBytes from 'utils/formatBytes';
import MainCard from 'ui-component/cards/MainCard';
import CurrencyInput from 'ui-component/extended/CurrencyInput';
import { addInventory, getInventories } from 'store/slices/inventory';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// assets
import { IconPhotoPlus, IconTrash } from '@tabler/icons';

const AddInventoryForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const { errorCreate } = useSelector((state) => state.inventory);
    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        name: yup.string().min(2, 'Must be at least 2 characters').required('Required'),
        description: yup.string().min(3, 'Must be at least 3 characters').required('Required'),
        cost: yup.string().required('Required'),
        retail_price: yup.string().required('Required'),
        agent_price: yup.string().required('Required'),
        mitra_price: yup.string().required('Required'),
        satuan_unit: yup.string().notOneOf(['0'], 'You must select a units for this item').nullable().required('Required')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            description: '',
            weight: '',
            satuan_unit: '0',
            cost: '',
            retail_price: '',
            agent_price: '',
            mitra_price: '',
            logo: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(addInventory(values));
            await dispatch(getInventories(values));
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && isDone) {
            navigate('/admin/master-item');
        }
    }, [isDone, errorCreate, navigate]);

    // Drop zone
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png, image/jpg',
        maxSize: 10000000
    });

    const files = acceptedFiles.map((file) => `${`${file.path} - ${formatBytes(file.size)}`}`);

    useEffect(() => {
        if (acceptedFiles[0]) {
            formik.setFieldValue('logo', acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    {errorCreate && isDone && (
                        <Grid item xs={12}>
                            <Alert severity="error">
                                <Typography sx={{ fontWeight: 'bold' }}>Error {errorCreate?.code}</Typography>
                                {errorCreate?.message}
                            </Alert>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Typography>Product Name</Typography>
                            <TextField
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
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography>Weight</Typography>
                            <TextField
                                fullWidth
                                id="weight"
                                name="weight"
                                placeholder="Weight"
                                value={formik.values.weight}
                                onChange={(e) => formik.setFieldValue('weight', e.target.value.replace(/[^0-9]/g, ''))}
                                error={formik.touched.weight && Boolean(formik.errors.weight)}
                                helperText={formik.touched.weight && formik.errors.weight}
                                InputProps={{
                                    endAdornment: 'gram'
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                            <Typography>Units</Typography>
                            <TextField
                                fullWidth
                                id="satuan_unit"
                                name="satuan_unit"
                                placeholder="satuan_unit"
                                value={formik.values.satuan_unit}
                                onChange={formik.handleChange}
                                error={formik.touched.satuan_unit && Boolean(formik.errors.satuan_unit)}
                                helperText={formik.touched.satuan_unit && formik.errors.satuan_unit}
                                select
                            >
                                <MenuItem value="0" disabled>
                                    Choose Unit
                                </MenuItem>
                                <MenuItem value="pcs">Pcs</MenuItem>
                                <MenuItem value="pack">Pack</MenuItem>
                                <MenuItem value="box">Box</MenuItem>
                            </TextField>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <Typography>Cost</Typography>
                            <CurrencyInput
                                fullWidth
                                id="cost"
                                name="cost"
                                placeholder="000"
                                value={formik.values.cost}
                                formik={formik}
                                error={formik.touched.cost && Boolean(formik.errors.cost)}
                                helperText={formik.touched.cost && formik.errors.cost}
                                InputProps={{
                                    startAdornment: 'Rp'
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <Typography>Retail Price</Typography>
                            <CurrencyInput
                                fullWidth
                                id="retail_price"
                                name="retail_price"
                                placeholder="000"
                                value={formik.values.retail_price}
                                formik={formik}
                                error={formik.touched.retail_price && Boolean(formik.errors.retail_price)}
                                helperText={formik.touched.retail_price && formik.errors.retail_price}
                                InputProps={{
                                    startAdornment: 'Rp'
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <Typography>Agent Price</Typography>
                            <CurrencyInput
                                fullWidth
                                id="agent_price"
                                name="agent_price"
                                placeholder="000"
                                value={formik.values.agent_price}
                                formik={formik}
                                error={formik.touched.agent_price && Boolean(formik.errors.agent_price)}
                                helperText={formik.touched.agent_price && formik.errors.agent_price}
                                InputProps={{
                                    startAdornment: 'Rp'
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <Typography>Mitra Price</Typography>
                            <CurrencyInput
                                fullWidth
                                id="mitra_price"
                                name="mitra_price"
                                placeholder="000"
                                value={formik.values.mitra_price}
                                formik={formik}
                                error={formik.touched.mitra_price && Boolean(formik.errors.mitra_price)}
                                helperText={formik.touched.mitra_price && formik.errors.mitra_price}
                                InputProps={{
                                    startAdornment: 'Rp'
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <Typography>Description</Typography>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                placeholder="Description"
                                multiline
                                rows={3}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        {formik.values.logo && (
                            <Button endIcon={<IconTrash />} onClick={() => formik.setFieldValue('logo', null)} color="error">
                                Delete image
                            </Button>
                        )}
                        <MainCard
                            {...getRootProps({ className: 'dropzone' })}
                            border={false}
                            content={false}
                            sx={{ p: 2, background: theme.palette.primary.main, borderRadius: 3, cursor: 'pointer' }}
                        >
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                {formik.values.logo ? (
                                    <Box component="img" src={URL.createObjectURL(formik.values?.logo)} sx={{ width: 68, height: 68 }} />
                                ) : (
                                    <Avatar>
                                        <IconPhotoPlus />
                                    </Avatar>
                                )}
                                <Stack spacing={1}>
                                    <input {...getInputProps()} />

                                    <Typography variant="label" sx={{ color: '#fff' }}>
                                        Upload Product Image (10 MB max)
                                    </Typography>

                                    <Typography sx={{ color: '#fff' }}>
                                        {formik.values.logo ? files : 'Drop your file here or browse'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </MainCard>
                    </Grid>
                    <Grid container justifyContent="end" sx={{ mt: 3 }}>
                        <Grid item>
                            <Stack direction="row" alignItems="flex-end" spacing={2}>
                                <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
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
        </>
    );
};

export default AddInventoryForm;
