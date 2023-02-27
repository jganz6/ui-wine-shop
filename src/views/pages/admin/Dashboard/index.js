import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Card, CardContent, Divider, Box, Avatar, Typography, IconButton, MenuItem } from '@mui/material';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

// third party
import ReactApexChart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DashboardCountCard from 'ui-component/cards/DashboardCountCard';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';

// assets
import { IconEdit, IconReportAnalytics, IconTransform, IconTrashX } from '@tabler/icons';
import IconAgen from 'assets/images/dashboard/iconAgen.png';
import IconBestAgen from 'assets/images/dashboard/iconBestAgen.png';
import IconMitra from 'assets/images/dashboard/iconMitra.png';
import IconBestMitra from 'assets/images/dashboard/iconBestMitra.png';
import IconWerehouse from 'assets/images/dashboard/iconWerehouse.png';
import IconCar from 'assets/images/dashboard/iconCar.png';
import IconLocate from 'assets/images/dashboard/iconLocate.png';
import Food1 from 'assets/images/dashboard/food1.png';
import Food2 from 'assets/images/dashboard/food2.png';
import Food3 from 'assets/images/dashboard/food3.png';
import Food4 from 'assets/images/dashboard/food4.png';
import Food5 from 'assets/images/dashboard/food5.png';
import Person1 from 'assets/images/dashboard/person1.png';
import Person2 from 'assets/images/dashboard/person2.png';
import Person3 from 'assets/images/dashboard/person3.png';

export default function Dashboard() {
    const theme = useTheme();

    const topMenu = [
        {
            name: 'Mie Yamin Meeroket',
            price: '50.000',
            stock: 89,
            image: Food1
        },
        {
            name: 'Mocha Float Meeroket',
            price: '25.000',
            stock: 89,
            image: Food2
        },
        {
            name: 'Chicken Steak Meeroket',
            price: '35.000',
            stock: 89,
            image: Food3
        },
        {
            name: 'Melon Juice Meeroket',
            price: '17.500',
            stock: 89,
            image: Food4
        },
        {
            name: 'Bubur Ayam Special Meeroket',
            price: '21.000',
            stock: 89,
            image: Food5
        }
    ];

    const listWerehouse = [
        {
            name: 'Gudang A01',
            locate: 'Jakarta Timur'
        },
        {
            name: 'Gudang A02',
            locate: 'Balikpapan'
        },
        {
            name: 'Gudang A03',
            locate: 'Aceh'
        },
        {
            name: 'Gudang A04',
            locate: 'Yogyakarta'
        },
        {
            name: 'Gudang A05',
            locate: 'Manado'
        },
        {
            name: 'Gudang A06',
            locate: 'Jakarta Barat'
        }
    ];

    const listPerson = [
        {
            name: 'John Kusnaidi',
            item: 4,
            info: 'Akan diantarkan pada jam 11 : 24 AM',
            address: 'Jalan Maguwoharjo Yogyakarta',
            city: 'Indonesia',
            img: Person1
        },
        {
            name: 'Margaretha',
            item: 2,
            info: 'Akan diantarkan pada jam 11 : 24 AM',
            address: 'Jalan Harapan Indah Bekasi',
            city: 'Indonesia',
            img: Person2
        },
        {
            name: 'Richard Lee',
            item: 4,
            info: 'Akan diantarkan pada jam 11 : 24 AM',
            address: 'Jalan Graha Raya Tangerang',
            city: 'Indonesia',
            img: Person3
        }
    ];

    // chart
    const charts = {
        series: [
            {
                name: 'Penghasilan',
                data: [500000, 1000000, 400000, 6000000, 4000000, 5000000, 4000000],
                colors: ['#FD9A3E', '#FD9A3E', '#FD9A3E']
            }
        ],
        options: {
            colors: ['#E8312F'],
            chart: {
                type: 'area',
                height: 200,
                zoom: {
                    enabled: false
                }
            },
            fill: {
                colors: ['#E8312F']
            },
            markers: {
                colors: ['#E8312F']
            },
            dataLabels: {
                enabled: false,
                style: {
                    colors: ['#E8312F']
                }
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
            }
        }
    };

    // button menu
    const [anchorEl, setAnchorEl] = useState(null);
    const openAction = Boolean(anchorEl);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={2}>
            {/* left side */}
            <Grid item xs={12} sm={7}>
                <Stack gap={2}>
                    {/* top */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* agen */}
                            <DashboardCountCard title="Jumlah Agen" img={IconAgen} value={459} type="count" />
                        </Grid>
                        <Grid item xs={6}>
                            {/* mitra */}
                            <DashboardCountCard title="Jumlah Mitra" img={IconMitra} value={1200} type="count" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* best agen */}
                            <DashboardCountCard title="Agen Terbaik" img={IconBestAgen} value="Irwan Cahyadi" type="name" />
                        </Grid>
                        <Grid item xs={6}>
                            {/* best mitra */}
                            <DashboardCountCard title="Mitra Terbaik" img={IconBestMitra} value="Rendy Orton" type="name" />
                        </Grid>
                    </Grid>
                    {/* bottom */}
                    <Grid container spacing={2}>
                        {/* left side */}
                        <Grid item xs={12} sm={6}>
                            <Card
                                sx={{
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <CardContent>
                                    <Stack gap={3}>
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                sx={{ fontSize: { xs: '1.1rem', sm: '0.8rem', md: '0.9rem', lg: '1.2rem' } }}
                                            >
                                                Menu Yang Terlaris
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: { xs: '0.8rem', sm: '0.6rem', md: '0.7rem', lg: '0.9rem' } }}
                                            >
                                                Berikut menu yang paling diminati
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <Stack spacing={2}>
                                                    {/* list */}
                                                    {topMenu?.map((item, i) => (
                                                        <Box key={i} sx={{ width: '100%' }}>
                                                            <Grid container gap={{ xs: 1, sm: 1, lg: 3 }} key={i}>
                                                                <Grid
                                                                    item
                                                                    xs={1}
                                                                    sm={0.1}
                                                                    md={0.2}
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                >
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            fontSize: {
                                                                                xs: '1.2rem',
                                                                                sm: '0.9rem',
                                                                                md: '0.8rem',
                                                                                lg: '1.5rem'
                                                                            }
                                                                        }}
                                                                    >
                                                                        #{i + 1}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={8} sm={7} md={8}>
                                                                    <Stack gap={1} p={1}>
                                                                        <Typography
                                                                            variant="h5"
                                                                            sx={{ fontSize: { sm: '0.7rem', md: '0.5rem', lg: '1.1rem' } }}
                                                                        >
                                                                            {item.name}
                                                                        </Typography>
                                                                        <Stack
                                                                            flexDirection={{ xs: 'row', sm: 'column', md: 'row' }}
                                                                            justifyContent="space-between"
                                                                        >
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    fontSize: { sm: '0.6rem', md: '0.5rem', lg: '0.9rem' }
                                                                                }}
                                                                            >
                                                                                Rp. {item.price}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                sx={{
                                                                                    fontSize: { sm: '0.6rem', md: '0.5rem', lg: '0.9rem' }
                                                                                }}
                                                                            >
                                                                                Order{' '}
                                                                                <span style={{ fontWeight: 'bold', color: '#000' }}>
                                                                                    {item.stock}x
                                                                                </span>
                                                                            </Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    sm={3.2}
                                                                    md={2}
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                >
                                                                    <Box
                                                                        component="img"
                                                                        alt={item.name}
                                                                        src={item.image}
                                                                        sx={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* right side */}
                        <Grid item sm={6}>
                            <Card
                                sx={{
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <CardContent>
                                    <Stack gap={3}>
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                sx={{ fontSize: { xs: '1.1rem', sm: '0.8rem', md: '0.9rem', lg: '1.2rem' } }}
                                            >
                                                Daftar Werehouse
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ fontSize: { xs: '0.8rem', sm: '0.6rem', md: '0.7rem', lg: '0.9rem' } }}
                                            >
                                                Daftar gudang yang tersedia
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={{ sm: 1, md: 2 }}>
                                            {listWerehouse.map((item, i) => (
                                                <Box key={i} sx={{ width: '100%' }} pl={3}>
                                                    <Grid item xs={12} sm={12}>
                                                        <Stack spacing={2}>
                                                            <Grid container gap={{ xs: 2, sm: 1, lg: 3 }}>
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    sm={4}
                                                                    md={2}
                                                                    lg={1.5}
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                >
                                                                    <Box
                                                                        component="img"
                                                                        src={IconWerehouse}
                                                                        sx={{ width: '100%', height: 'auto' }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={9} sm={7} md={9} lg={9.5}>
                                                                    <Stack gap={1} p={1}>
                                                                        <Typography
                                                                            variant="h5"
                                                                            sx={{
                                                                                fontSize: {
                                                                                    xs: '0.9rem',
                                                                                    sm: '0.7rem',
                                                                                    md: '0.8rem',
                                                                                    lg: '1rem'
                                                                                },
                                                                                textAlign: { sm: 'center', md: 'left' }
                                                                            }}
                                                                        >
                                                                            {item.name}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant="h6"
                                                                            sx={{
                                                                                color: theme.palette.secondary.main,
                                                                                fontSize: {
                                                                                    xs: '0.8rem',
                                                                                    sm: '0.6rem',
                                                                                    md: '0.7rem',
                                                                                    lg: '0.9rem'
                                                                                },
                                                                                textAlign: { sm: 'center', md: 'left' }
                                                                            }}
                                                                        >
                                                                            {item.locate}
                                                                        </Typography>
                                                                    </Stack>
                                                                </Grid>
                                                            </Grid>
                                                            <Divider />
                                                        </Stack>
                                                    </Grid>
                                                    <Divider />
                                                </Box>
                                            ))}
                                        </Grid>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>

            {/* right side */}
            <Grid item xs={12} sm={5}>
                <Stack gap={2}>
                    {/* top card */}
                    <MainCard
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                            }
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} sm={7}>
                                <Stack gap={1}>
                                    <Typography variant="h5" sx={{ fontSize: { sm: '0.5rem', md: '0.8rem', lg: '1.5rem' } }}>
                                        Penghasilan Hari ini
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontSize: { sm: '0.5rem', md: '0.6rem', lg: '0.8rem' } }}>
                                        Laporan penghasilan yang dapat difilter berdasarkan kebutuhan
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Stack gap={1}>
                                    <Typography
                                        variant="h4"
                                        sx={{ fontSize: { sm: '0.7rem', md: '0.8rem', lg: '1.5rem' }, textAlign: 'right' }}
                                    >
                                        Rp. 15.000.000
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { sm: '0.5rem', md: '0.6rem', lg: '0.8rem' },
                                            textAlign: 'right',
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        0,5% lebih tinggi dari hari kemarin
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container mt={1} mb={{ xs: -5, sm: -2.5 }}>
                            <Grid item xs={12} sm={12}>
                                <ReactApexChart options={charts.options} series={charts.series} type="area" width="100%" height={200} />
                            </Grid>
                        </Grid>
                    </MainCard>

                    {/* bot card */}
                    <MainCard
                        sx={{
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
                            }
                        }}
                    >
                        <Stack gap={1}>
                            <Grid container>
                                <Grid item xs={11} sm={11}>
                                    <Stack gap={1}>
                                        <Typography variant="h5" sx={{ fontSize: { sm: '0.8rem', lg: '1.5rem' } }}>
                                            Peta Outlet
                                        </Typography>
                                        <Typography variant="caption" sx={{ fontSize: { sm: '0.6rem', lg: '0.8rem' } }}>
                                            Berikut adalah peta outlet meeroket yang tersedia
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={1} sm={1}>
                                    <IconButton
                                        size="large"
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreHorizTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                    </IconButton>
                                    <EnhancedMenu
                                        id="demo-customized-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'demo-customized-button'
                                        }}
                                        anchorEl={anchorEl}
                                        open={openAction}
                                        onClose={handleClose}
                                    >
                                        <MenuItem disableRipple>
                                            <IconTransform color={theme.palette.primary.main} stroke={1.5} style={{ marginRight: 5 }} />
                                            Manage Role
                                        </MenuItem>
                                        <MenuItem disableRipple>
                                            <IconEdit color={theme.palette.tertiary.main} stroke={1.5} style={{ marginRight: 5 }} />
                                            Edit Agent
                                        </MenuItem>
                                        <MenuItem disableRipple>
                                            <IconReportAnalytics
                                                color={theme.palette.secondary.main}
                                                stroke={1.5}
                                                style={{ marginRight: 5 }}
                                            />
                                            Report
                                        </MenuItem>
                                        <MenuItem disableRipple>
                                            <IconTrashX color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                            Delete Agent
                                        </MenuItem>
                                    </EnhancedMenu>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} sm={12}>
                                    <ReactApexChart options={charts.options} series={charts.series} type="area" width="100%" height={200} />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <Stack gap={2}>
                                        <Grid container display="flex" alignItems="center" gap={2}>
                                            <Grid item xs={2} sm={1.2} md={1.3}>
                                                <Box component="img" src={IconCar} sx={{ width: '100%', height: 'auto' }} />
                                            </Grid>
                                            <Grid item xs={9} sm={9.8} md={9.8}>
                                                <Typography variant="h4" sx={{ fontSize: { xs: '0.8rem', sm: '0.6rem', md: '0.7rem' } }}>
                                                    Jadwal Pengambilan Barang / Item
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                        {listPerson?.map((item, i) => (
                                            <Box key={i} sx={{ width: '100%' }}>
                                                <Grid container display="flex" alignItems="center" gap={{ xs: 1.5, sm: 0.5, md: 0.8 }}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={1.1}
                                                        md={1.3}
                                                        lg={1}
                                                        display="flex"
                                                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                                    >
                                                        <Avatar
                                                            alt={item.name}
                                                            src={item.img}
                                                            sx={{ width: { xs: '20%', sm: '100%' }, height: 'auto' }}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={4.4}
                                                        md={4.3}
                                                        display="flex"
                                                        flexDirection="column"
                                                        gap={{ lg: 1 }}
                                                    >
                                                        <Stack
                                                            flexDirection="row"
                                                            gap={{ sm: 0.5, lg: 1 }}
                                                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                                        >
                                                            <Typography
                                                                variant="h5"
                                                                sx={{ fontSize: { sm: '0.33rem', md: '0.4rem', lg: '0.6rem' } }}
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                variant="h5"
                                                                sx={{
                                                                    fontSize: { sm: '0.33rem', md: '0.4rem', lg: '0.6rem' },
                                                                    color: theme.palette.secondary.main
                                                                }}
                                                            >
                                                                ({item.item} Items)
                                                            </Typography>
                                                        </Stack>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{ fontSize: { sm: '0.33rem', md: '0.4rem', lg: '0.6rem' } }}
                                                        >
                                                            {item.info}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={5.5} md={5.5}>
                                                        <Grid
                                                            container
                                                            display="flex"
                                                            justifyContent={{ xs: 'center', sm: 'flex-end' }}
                                                            alignItems="center"
                                                            sx={{ textAlign: { xs: 'center', sm: 'right' } }}
                                                            gap={{ xs: 2, sm: 1 }}
                                                        >
                                                            <Grid item xs={12} sm={8} md={8}>
                                                                <Typography
                                                                    variant="h5"
                                                                    sx={{ fontSize: { sm: '0.33rem', md: '0.4rem', lg: '0.6rem' } }}
                                                                >
                                                                    {item.address}
                                                                </Typography>
                                                                <Typography
                                                                    variant="h5"
                                                                    sx={{ fontSize: { sm: '0.33rem', md: '0.4rem', lg: '0.6rem' } }}
                                                                >
                                                                    {item.city}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                sm={3}
                                                                md={2}
                                                                display="flex"
                                                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                                            >
                                                                <Avatar
                                                                    alt={item.address}
                                                                    src={IconLocate}
                                                                    sx={{
                                                                        width: { xs: '20%', sm: '100%', md: 25, lg: '100%' },
                                                                        height: { xs: '20%', sm: '100%', md: 25, lg: 'auto' }
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>
                    </MainCard>
                </Stack>
            </Grid>
        </Grid>
    );
}
