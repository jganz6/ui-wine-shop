import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, DialogContent, Stack } from '@mui/material';

import RocketImg from 'assets/images/icons/rocket.png';
import { LoadingButton } from '@mui/lab';

// ===============================|| UI DIALOG - SWEET ALERT ||=============================== //

export default function AlertDialog({ children, btnCancel, btnConfirm, open, onClose, onConfirm, loading }) {
    const theme = useTheme();
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                maxWidth="sm"
                sx={{ '& .MuiPaper-root': { overflow: 'visible' }, zIndex: 99999 }}
            >
                {open && (
                    <>
                        <Box
                            component="img"
                            src={RocketImg}
                            sx={{
                                position: 'absolute',
                                width: '10%',
                                transform: 'translate(-50%,  -50%)',
                                zIndex: 999,
                                top: '5%',
                                left: '50%'
                            }}
                        />
                        <DialogContent sx={{ pt: 5, textAlign: 'center' }}>{children}</DialogContent>

                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                            {onConfirm && (
                                <LoadingButton
                                    loading={loading}
                                    variant="contained"
                                    size="small"
                                    onClick={onConfirm}
                                    color="tertiary"
                                    sx={{ color: theme.palette.text.light }}
                                >
                                    {btnConfirm || 'Yes'}
                                </LoadingButton>
                            )}
                            <Button autoFocus onClick={onClose} variant="outlined" size="small" color="error">
                                {btnCancel || 'Cancel'}
                            </Button>
                        </Stack>
                    </>
                )}
            </Dialog>
        </>
    );
}

AlertDialog.propTypes = {
    children: PropTypes.node,
    btnCancel: PropTypes.string,
    btnConfirm: PropTypes.string,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func
};
