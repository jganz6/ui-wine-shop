import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
// ==============================|| LOCALIZATION ||============================== //

const ManageProfileSection = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    [theme.breakpoints.down('md')]: {
                        ml: 1
                    }
                }}
            >
                <Button
                    variant="contained"
                    color="tertiary"
                    sx={{ borderRadius: 54, color: theme.palette.text.light, py: 1 }}
                    onClick={() => navigate('/user/profile')}
                >
                    Manage Profile
                </Button>
            </Box>
        </>
    );
};

export default ManageProfileSection;
