import { memo, useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { IconArrowRight } from '@tabler/icons';

// assets
import Image from 'assets/images/icons/sprinkle.png';

// project imports
import useAuth from 'hooks/useAuth';
import AlertDialog from 'ui-component/extended/AlertDialog';

// styles
const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.tertiary.main,
    marginTop: '90px',
    paddingTop: '20px',
    marginBottom: '22px',
    overflow: 'visible',
    position: 'relative',
    cursor: 'pointer'
}));

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
    const theme = useTheme();
    const [openLogout, setOpenLogout] = useState(false);

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }} onClick={() => setOpenLogout(true)}>
                <Box
                    component="img"
                    src={Image}
                    sx={{
                        position: 'absolute',
                        top: -90,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        zIndex: 2
                    }}
                />
                <Stack spacing={1}>
                    <Typography variant="label" color={theme.palette.text.light}>
                        Want to logout?
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="subtitle2" color={theme.palette.text.light}>
                            See you next time!
                        </Typography>
                        <IconArrowRight color={theme.palette.text.light} size={15} />
                    </Stack>
                </Stack>
            </CardContent>
            <AlertDialog open={openLogout} onClose={() => setOpenLogout(false)} onConfirm={handleLogout} loading={loading}>
                {openLogout && <>Are you sure want to logout?</>}
            </AlertDialog>
        </CardStyle>
    );
};

export default memo(MenuCard);
