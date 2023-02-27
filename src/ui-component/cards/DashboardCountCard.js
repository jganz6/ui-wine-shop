// material-ui
import { Stack, Box, Grid, Card, Typography } from '@mui/material';

export default function DashboardCountCard({ title, img, value, type }) {
    return (
        <Card
            sx={{
                px: 2,
                py: 1,
                width: '100%',
                height: 'fit-content',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Stack flexDirection={{ xs: 'column-reverse', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Stack
                    gap={type === 'count' ? 1 : 2}
                    pt={{ md: 0.5, lg: 2 }}
                    pb={{ xs: 2, sm: 0 }}
                    sx={{ width: '100%', textAlign: { xs: 'center', sm: 'left' } }}
                >
                    <Typography variant="caption" sx={{ fontSize: { xs: '0.6rem', sm: '0.6rem', md: '0.6rem', lg: '1rem' } }}>
                        {title}
                    </Typography>
                    {type === 'count' ? (
                        <Typography variant="h1" sx={{ fontSize: { xs: '1.2rem', sm: '1rem', md: '1.7rem', lg: '2.5rem' } }}>
                            {value}
                        </Typography>
                    ) : (
                        <Typography variant="h4" sx={{ fontSize: { xs: '0.7rem', sm: '0.6rem', md: '0.8rem', lg: '1.5rem' } }}>
                            {value}
                        </Typography>
                    )}
                </Stack>
                {type === 'count' ? (
                    <Box component="img" src={img} sx={{ width: { xs: '60%', sm: '50%', md: '55%', lg: '60%' }, height: 'auto' }} />
                ) : (
                    <Box component="img" src={img} sx={{ width: { xs: '50%', sm: '40%', md: '40%', lg: '40%' }, height: 'auto' }} />
                )}
            </Stack>
        </Card>
    );
}
