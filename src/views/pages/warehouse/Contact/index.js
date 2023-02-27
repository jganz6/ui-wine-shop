import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Checkbox,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TablePagination,
    TextField,
    InputAdornment
} from '@mui/material';

// project imports
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import { useDispatch, useSelector } from 'store';
import { getAgents } from 'store/slices/agent';

// assets
import CallWA from 'assets/images/warehouse/callWA.png';
import SearchIcon from '@mui/icons-material/Search';

// Table Header
const headCells = [
    {
        id: 'name',
        numeric: false,
        label: 'Display Name',
        align: 'left',
        sortable: true
    },
    {
        id: 'type',
        numeric: false,
        label: 'Type',
        align: 'center',
        sortable: true
    },
    {
        id: 'email',
        numeric: false,
        label: 'Email',
        align: 'center'
    },
    {
        id: 'phone',
        numeric: false,
        label: 'Handphone No.',
        align: 'center'
    },
    {
        id: 'address',
        numeric: false,
        label: 'Address',
        align: 'center'
    },
    {
        id: 'action',
        numeric: false,
        label: 'Send Message to',
        align: 'center'
    }
];

const Contact = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const { agents } = useSelector((state) => state.agent);

    // get user list
    useEffect(() => {
        dispatch(getAgents());
    }, [dispatch]);

    useEffect(() => {
        setRows(agents);
    }, [agents]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
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
                    onChange={(e) =>
                        handleSearch(
                            e,
                            setSearch,
                            ['id', 'first_name', 'last_name', 'phone_number', 'email', 'address'],
                            rows,
                            setRows,
                            agents
                        )
                    }
                    placeholder="Search Item"
                    value={search}
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
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
                            rowCount={rows?.length}
                            selected={selected}
                            action={false}
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
                                            <TableCell>
                                                <>{`${row.first_name} ${row.last_name}`}</>
                                            </TableCell>
                                            <TableCell align="center">Agent</TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">{row.phone_number}</TableCell>
                                            <TableCell align="center">{row.address}</TableCell>
                                            <TableCell align="center">
                                                <Button href={`https://wa.me/${row.phone_number}`} target="_blank">
                                                    <Box component="img" src={CallWA} height={40} />
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
            </Grid>
        </Grid>
    );
};

export default Contact;
