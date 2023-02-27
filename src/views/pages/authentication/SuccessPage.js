/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// material-ui
import { Box, CssBaseline, Button, Grid, Typography } from '@mui/material';
// Assets
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (!state?.pass) {
            navigate('/not-found');
        }
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Grid container className="App">
                <CssBaseline />
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TaskAltIcon color="primary" sx={{ fontSize: 50 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Yeay, Congrats!</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle">Your password is saved</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    navigate('/login');
                                }}
                                color="secondary"
                            >
                                Login Now
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SuccessPage;
