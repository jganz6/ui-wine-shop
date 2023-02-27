import { useEffect, useState } from 'react';

// material ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'store';
import { getTransactions } from 'store/slices/transaction';
import MainCard from 'ui-component/cards/MainCard';
import AgentFinanceChart from './AgentFinanceChart';
import PartnerFinanceChart from './PartnerFinanceChart';
import WeeklyChartData from './WeeklyChartData';
import MonthlyChartData from './MonthlyChartData';

// third party
import Chart from 'react-apexcharts';

// assets
import MoneyImage from 'assets/images/icons/finance.png';
import { IconArrowUpRight, IconCircleCheck, IconSquareCheck } from '@tabler/icons';
import Avatar from 'ui-component/extended/Avatar';

const Finance = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);
    const [reportGraphMode, setReportGraphMode] = useState('Weekly');

    const { transactions } = useSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    useEffect(() => {
        setRows(transactions);
    }, [transactions]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12} md={6}>
                    <Stack gap={2}>
                        <MainCard sx={{ background: theme.palette.tertiary.main, color: theme.palette.text.light }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                                <Stack spacing={1}>
                                    <Typography variant="title">Net Income</Typography>
                                    <Typography>
                                        The income that the company gets from the sum of the selling prices and capital prices
                                    </Typography>
                                    <Typography variant="h2" sx={{ color: theme.palette.text.light }}>
                                        Rp 20.550.000
                                    </Typography>
                                </Stack>
                                <Box component="img" src={MoneyImage} sx={{ width: '15%' }} />
                            </Stack>
                        </MainCard>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <MainCard content={false} boxShadow sx={{ p: 2, boxShadow: '0px 4px 6px 0px #3E49540A' }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Typography variant="title">Rp 12.740.000</Typography>
                                                <Typography>Partner’s Purchase Total</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Chart {...PartnerFinanceChart} />
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MainCard content={false} boxShadow sx={{ p: 2, boxShadow: '0px 4px 6px 0px #3E49540A' }}>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Grid item xs={12} md={6}>
                                            <Stack spacing={1}>
                                                <Typography variant="title">Rp 7.809.000</Typography>
                                                <Typography>Agent's Purchase Total</Typography>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Chart {...AgentFinanceChart} />
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ p: 4, boxShadow: '0px 4px 6px 0px #3E49540A' }}>
                            <Stack>
                                <Typography variant="label">Sales Report</Typography>
                                <Typography>The following is a sales transaction report made</Typography>
                                <TableContainer sx={{ overflowX: 'initial', overflow: 'auto' }}>
                                    <Table>
                                        <TableBody>
                                            {rows &&
                                                rows.map((row, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell width={50}>
                                                            <Avatar src={row.image} />
                                                        </TableCell>
                                                        <TableCell width={200}>
                                                            <>{row.user_name}</>
                                                            <Typography variant="subtitle2">{row.role}</Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack alignItems="center">
                                                                <Stack alignItems="center" direction="row">
                                                                    <IconSquareCheck color={theme.palette.text.light} fill="#FF6175" />
                                                                    <Typography sx={{ color: '#FF6175', fontWeight: 600 }}>Qty</Typography>
                                                                </Stack>
                                                                <>{row.qty} Item</>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>Rp {row.qty * row.selling_price}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack gap={2}>
                        <MainCard content={false} boxShadow sx={{ p: 2, boxShadow: '0px 4px 6px 0px #3E49540A' }}>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Typography variant="label">Barookah Kitchen Cashflow</Typography>
                                    <Stack direction="row" alignItems="center">
                                        <RadioGroup row value={reportGraphMode} onChange={(e) => setReportGraphMode(e.target.value)}>
                                            <FormControlLabel
                                                value="Weekly"
                                                control={<Radio checkedIcon={<IconCircleCheck />} color="error" />}
                                                label="Weekly"
                                            />
                                            <FormControlLabel
                                                value="Monthly"
                                                control={<Radio checkedIcon={<IconCircleCheck />} color="error" />}
                                                label="Monthly"
                                            />
                                        </RadioGroup>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <Avatar>
                                        <IconArrowUpRight color={theme.palette.text.light} />
                                    </Avatar>
                                    <Stack>
                                        <Typography variant="subtitle2">Income</Typography>
                                        <Typography variant="label">Rp 7.459.234,08</Typography>
                                    </Stack>
                                </Stack>
                                {reportGraphMode === 'Weekly' ? <Chart {...WeeklyChartData} /> : <Chart {...MonthlyChartData} />}
                            </Stack>
                        </MainCard>
                        <MainCard content={false} sx={{ p: 4, boxShadow: '0px 4px 6px 0px #3E49540A' }}>
                            <Stack>
                                <Typography variant="label">Purchase Invoices</Typography>
                                <Typography>You have 10 purchase invoices</Typography>
                                <TableContainer sx={{ overflowX: 'initial', overflow: 'auto' }}>
                                    <Table>
                                        <TableBody>
                                            {rows &&
                                                rows.map((row, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        <TableCell width={50}>
                                                            <Avatar color="secondary" variant="rounded">
                                                                <IconArrowUpRight />
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell>
                                                            <>{row.id}</>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack alignItems="center">
                                                                <Typography>{row.date}</Typography>
                                                                <Typography>{row.time}</Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>Rp {row.qty * row.selling_price}</TableCell>
                                                        <TableCell>
                                                            {row.status === 1 && <Typography color="primary">Completed</Typography>}
                                                            {row.status === 2 && <Typography color="action">Pending</Typography>}
                                                            {row.status === 3 && <Typography color="error">Cancelled</Typography>}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Finance;
