import React from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Button, ButtonBase, Card, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material';

// third-party

// project imports
import { gridSpacing } from 'store/constant';
import useConfig from 'hooks/useConfig';
import MailerSubscriber from './MailerSubscriber';

// assets
import { IconBrandDribbble } from '@tabler/icons';

import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import BookIcon from '@mui/icons-material/Book';

import logo from 'assets/images/logo.png';
import logoDark from 'assets/images/logo-dark.png';
import imageBackground from 'assets/images/maintenance/img-soon-bg.svg';
import imageGrid from 'assets/images/maintenance/img-soon-bg-grid.svg';
import imageDarkGrid from 'assets/images/maintenance/img-soon-bg-grid-dark.svg';
import imageSoon2 from 'assets/images/maintenance/img-soon-2.svg';
import imageSoon4 from 'assets/images/maintenance/img-soon-4.svg';
import imageSoon5 from 'assets/images/maintenance/img-soon-5.svg';
import imageSoon6 from 'assets/images/maintenance/img-soon-6.svg';
import imageSoon7 from 'assets/images/maintenance/img-soon-7.svg';
// styles
const CardMediaWrapper = styled('div')(({ theme }) => ({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative',
    [theme.breakpoints.down('xl')]: {
        marginTop: 30
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: 450
    },
    [theme.breakpoints.down('lg')]: {
        display: 'none'
    }
}));

const PageContentWrapper = styled('div')(({ theme }) => ({
    maxWidth: 550,
    margin: '0 0 0 auto',
    [theme.breakpoints.down('lg')]: {
        margin: '0 auto'
    },
    [theme.breakpoints.up(1400)]: {
        maxWidth: 600
    }
}));

const ComingSoonCard = styled(Card)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
        display: 'block'
    },
    [theme.breakpoints.up(1200)]: {
        overflow: 'hidden',
        maxHeight: '100vh'
    },
    [theme.breakpoints.up(1400)]: {
        alignItems: 'center'
    }
}));

const CardMediaGrid = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 3
});

const CardMediaWidget = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '5s wings ease-in-out infinite',
    zIndex: 5,
    '&:nth-of-type(3)': {
        animationDelay: '2s'
    },
    '&:nth-of-type(4)': {
        animationDelay: '1s'
    },
    '&:nth-of-type(5)': {
        animationDelay: '3s'
    },
    '&:nth-of-type(9)': {
        animationDelay: '5s'
    },
    '&:nth-of-type(10)': {
        animationDelay: '6s'
    },
    '&:nth-of-type(7)': {
        animation: '3s blink ease-in-out infinite',
        animationDelay: '1s'
    },
    '&:nth-of-type(6)': {
        animation: '3s blink ease-in-out infinite',
        animationDelay: '2s'
    }
});

// ===========================|| COMING SOON 1 ||=========================== //

const ComingSoon1 = () => {
    const theme = useTheme();

    const { rtlLayout } = useConfig();

    return (
        <ComingSoonCard>
            <CardContent sx={{ p: 0 }}>
                <CardContent sx={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        image={imageBackground}
                        title="Slider5 image"
                        sx={{
                            position: 'absolute',
                            bottom: -40,
                            left: 90,
                            width: 400,
                            transform: 'rotate(135deg)'
                        }}
                    />
                    {theme.palette.mode === 'light' && (
                        <img
                            src={logo}
                            alt="Wine Shop"
                            style={{ position: rtlLayout ? 'relative' : 'initial', top: rtlLayout ? 30 : 'initial' }}
                            width="100"
                        />
                    )}
                    {theme.palette.mode === 'dark' && (
                        <img
                            src={logoDark}
                            alt="Wine Shop"
                            width="100"
                            style={{ position: rtlLayout ? 'relative' : 'initial', top: rtlLayout ? 30 : 'initial' }}
                        />
                    )}
                </CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={imageBackground}
                                title="Slider5 image"
                                sx={{ position: 'relative', zIndex: 1 }}
                            />
                            <CardMediaGrid src={theme.palette.mode === 'dark' ? imageDarkGrid : imageGrid} title="Slider5 image" />
                            <CardMediaWidget src={imageSoon2} title="Slider5 image" />
                            <CardMediaWidget src={imageSoon4} title="Slider5 image" />
                            <CardMediaWidget src={imageSoon5} title="Slider5 image" />
                            <CardMediaWidget src={imageSoon6} title="Slider5 image" />
                            <CardMediaWidget src={imageSoon7} title="Slider5 image" />
                        </CardMediaWrapper>
                    </Grid>
                </Grid>
            </CardContent>
            <CardContent sx={{ padding: { xs: 3, xl: 10 }, margin: '0 auto' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <PageContentWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h2" component="div" color="primary">
                                        Coming Soon
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h1" component="div">
                                                DKingdom Wine Shop - Alcoholic drink shop by Jodie
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography sx={{ fontSize: '1.125rem' }}>
                                                DKingdom Wine Shop is here order alcohol drink fast, convenient, delicious, and crafted to
                                                perfection by Jodie's expert chefs!
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem' }} />
                                                Fast
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem' }} />
                                                Easy
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                color="secondary"
                                                sx={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <FiberManualRecordTwoToneIcon sx={{ mr: 0.625, fontSize: '1rem' }} />
                                                Delicous
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <MailerSubscriber />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="outlined" color="secondary" href="/login">
                                        Login for Developer
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                                        <Grid item xs={12} sx={{ position: 'relative' }}>
                                            <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                                <Grid item xs={12}>
                                                    <Grid container justifyContent="flex-end" spacing={1}>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://meeroket.gitbook.io/"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.secondary.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.secondary.main
                                                                                : theme.palette.secondary.dark
                                                                    }}
                                                                >
                                                                    <BookIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase component={Link} href="https://www.facebook.com/" target="_blank">
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.primary.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.primary.main
                                                                                : theme.palette.primary.dark
                                                                    }}
                                                                >
                                                                    <FacebookIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase component={Link} href="https://twitter.com/" target="_blank">
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.warning.light,
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.warning.dark
                                                                                : theme.palette.warning.dark
                                                                    }}
                                                                >
                                                                    <TwitterIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase
                                                                component={Link}
                                                                href="https://github.com/orgs/MaheswaraTeknologi/"
                                                                target="_blank"
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.grey[200],
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.light
                                                                                : theme.palette.grey[800]
                                                                    }}
                                                                >
                                                                    <GitHubIcon />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                        <Grid item>
                                                            <ButtonBase component={Link} href="https://dribbble.com/" target="_blank">
                                                                <Avatar
                                                                    sx={{
                                                                        ...theme.typography.commonAvatar,
                                                                        ...theme.typography.mediumAvatar,
                                                                        bgcolor:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.dark.main
                                                                                : theme.palette.grey[100],
                                                                        color:
                                                                            theme.palette.mode === 'dark'
                                                                                ? theme.palette.grey[600]
                                                                                : theme.palette.grey[500]
                                                                    }}
                                                                >
                                                                    <IconBrandDribbble />
                                                                </Avatar>
                                                            </ButtonBase>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container alignItems="center" justifyContent="flex-end" spacing={1}>
                                                        <Grid item>
                                                            <Typography variant="body1" align="right" component="div">
                                                                Project By
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="title" align="right" component="div">
                                                                Jodie
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </PageContentWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ComingSoonCard>
    );
};

export default ComingSoon1;
