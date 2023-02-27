import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material ui
import {
    Button,
    Checkbox,
    Grid,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getReceiveList } from 'store/slices/transaction';
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';

// third party
import moment from 'moment';

// assets
import SearchIcon from '@mui/icons-material/Search';

// Table Header
const headCells = [
    {
        id: 'created',
        numeric: false,
        label: 'Order Date',
        align: 'left',
        sortable: true
    },
    {
        id: 'id',
        numeric: false,
        label: 'Receive Number',
        align: 'left',
        sortable: true
    },
    {
        id: 'vendor',
        numeric: false,
        label: 'Vendor',
        align: 'left',
        sortable: true
    },
    {
        id: 'warehouse',
        numeric: false,
        label: 'Warehouse',
        align: 'left',
        sortable: true
    },
    {
        id: 'total',
        numeric: false,
        label: 'Total Cost Price',
        align: 'center',
        sortable: false
    }
];

const OnProcess = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('none');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const { receiveList } = useSelector((state) => state.transaction);

    // get inventory list
    const type = '00';
    useEffect(() => {
        dispatch(getReceiveList({ user, id, type }));
    }, [dispatch]);

    useEffect(() => {
        setRows(receiveList);
    }, [receiveList]);
    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="medium" color="secondary" />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => handleSearch(e, setSearch, ['id'], rows, setRows, receiveList)}
                        placeholder="Search Item"
                        value={search}
                        size="small"
                    />
                </Grid>
            </Grid>
            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        headCells={headCells}
                        theme={theme}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={(e) => handleSelectAllClick(e, rows, selected, setSelected)}
                        onRequestSort={(e, property) => handleRequestSort(e, property, order, setOrder, orderBy, setOrderBy)}
                        rowCount={rows.length}
                        selected={selected}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            padding="checkbox"
                                            sx={{ pl: 3 }}
                                            onClick={(event) => handleClick(event, row.id, selected, setSelected)}
                                        >
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.id, selected, setSelected)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {moment(row.created).format('DD MMMM YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            <Stack>
                                                <Typography sx={{ color: theme.palette.tertiary.main }}>Purchase Invoice</Typography>
                                                <Typography sx={{ color: theme.palette.tertiary.main }}>#{row.id}</Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{row.vendor}</TableCell>
                                        <TableCell>{row.warehouse_name}</TableCell>
                                        <TableCell align="center">Rp{row?.total_cost_price?.toLocaleString('id')}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                color="tertiary"
                                                variant="contained"
                                                sx={{ color: theme.palette.text.light }}
                                                onClick={() => navigate(`receive/${row.id}`, { state: row })}
                                                disabled={user?.role !== '10'}
                                            >
                                                Receive
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
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
        </>
    );
};

export default OnProcess;
