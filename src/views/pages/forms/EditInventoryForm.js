/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/material/styles';
import { Alert, Avatar, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// project imports
import { useDispatch, useSelector } from 'store';
import { useDropzone } from 'react-dropzone';
import formatBytes from 'utils/formatBytes';
import MainCard from 'ui-component/cards/MainCard';
import CurrencyInput from 'ui-component/extended/CurrencyInput';
import { editInventory, getInventories } from 'store/slices/inventory';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
import { IconPhotoPlus, IconTrash } from '@tabler/icons';

const EditInventoryForm = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { errorUpdate } = useSelector((state) => state.inventory);
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
            name: data.name || '',
            description: data.description || '',
            weight: data.weight || '',
            satuan_unit: data.satuan_unit || '0',
            cost: data.cost || '',
            retail_price: data.retail_price || '',
            agent_price: data.agent_price || '',
            mitra_price: data.mitra_price || '',
            logo: null,
            photo_item: data.photo_item || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            const body = { ...values };
            if (!values.photo_item) {
                body.photo_item = '';
            }
            setIsDone(false);
            await dispatch(editInventory(data.id, body));
            await dispatch(getInventories());
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorUpdate && isDone) {
            onClose();
        }
    }, [isDone, errorUpdate, onClose]);

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
        <Stack spacing={2}>
            <Typography variant="h3">Edit Inventory</Typography>
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
                            <Typography>Capital Price</Typography>
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
                        {(formik.values.logo || formik.values?.photo_item) && (
                            <Button
                                endIcon={<IconTrash />}
                                onClick={() => {
                                    formik.setFieldValue('logo', null);
                                    formik.setFieldValue('photo_item', null);
                                }}
                                color="error"
                            >
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
                                    <Box component="img" src={URL.createObjectURL(formik.values.logo)} sx={{ width: 68, height: 68 }} />
                                ) : formik.values.photo_item ? (
                                    <Box
                                        component="img"
                                        src={process.env.REACT_APP_FILE_URL + formik.values.photo_item}
                                        sx={{ width: 68, height: 68 }}
                                    />
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

EditInventoryForm.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func
};

export default EditInventoryForm;
