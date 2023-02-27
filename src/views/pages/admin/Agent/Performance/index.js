import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material ui
import { useTheme } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, Button } from '@mui/material';

// project import
import { getComparator, stableSort, handleRequestSort } from 'utils/tableHelper';
import IncomeChart from './IncomeChart';
import CounterSummary from './CounterSummary';
import MainCard from 'ui-component/cards/MainCard';
import EnhancedTableHeadSimple from 'ui-component/extended/EnhancedTableHeadSimple';
import { useDispatch, useSelector } from 'store';
import { getTransactions } from 'store/slices/transaction';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import { IconMessage } from '@tabler/icons';

// Table Header
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'Transaction ID',
        align: 'left',
        sortable: true
    },
    {
        id: 'qty',
        numeric: false,
        label: 'Qty',
        align: 'left',
        sortable: true
    },
    {
        id: 'date',
        numeric: false,
        label: 'Transaction Date',
        align: 'left',
        sortable: true
    },
    {
        id: 'status',
        numeric: false,
        label: 'Transaction Status',
        align: 'left',
        sortable: true
    },
    {
        id: 'detail',
        numeric: false,
        label: 'Transaction Detail',
        align: 'center'
    }
];

const AgentPerformance = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const { transactions } = useSelector((state) => state.transaction);
    // get transaction list
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
            <IncomeChart />
            <Box sx={{ mt: 5 }} />
            <CounterSummary />
            <Box sx={{ mt: 5 }} />
            <MainCard border gradientBorder title="Transaction List">
                <TableContainer sx={{ overflowX: 'initial', overflow: 'auto' }}>
                    <PerfectScrollbar style={{ height: '100%', maxHeight: '30vh', overflowX: 'hidden' }}>
                        <Table sx={{ minWidth: 750 }}>
                            <EnhancedTableHeadSimple
                                headCells={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={(e, property) => handleRequestSort(e, property, order, setOrder, orderBy, setOrderBy)}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell>
                                                <>{row.id}</>
                                            </TableCell>
                                            <TableCell>{row.qty}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>
                                                {row.status === 1 && <Typography color="primary">Completed</Typography>}
                                                {row.status === 2 && <Typography color="action">Pending</Typography>}
                                                {row.status === 3 && <Typography color="error">Cancelled</Typography>}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    startIcon={<IconMessage />}
                                                    sx={{ color: theme.palette.text.light }}
                                                    onClick={() => navigate(`performance?search=${row.name}`)}
                                                >
                                                    Detail
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </PerfectScrollbar>
                </TableContainer>
                {/* table pagination */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </MainCard>
        </>
    );
};

export default AgentPerformance;
