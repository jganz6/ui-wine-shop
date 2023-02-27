import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
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

// project imports
import {
    getComparator,
    stableSort,
    handleSearch,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleFilter
} from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';
import { useDispatch, useSelector } from 'store';
import { getPurchaseOrder } from 'store/slices/transaction';

// third party
import moment from 'moment';

// assets
import SearchIcon from '@mui/icons-material/Search';
import { IconChevronDown, IconFilter, IconReceipt } from '@tabler/icons';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

// Table Header
const headCells = [
    {
        id: 'created',
        numeric: false,
        label: 'Date',
        align: 'left',
        sortable: true
    },
    {
        id: 'id',
        numeric: false,
        label: 'INV Number',
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
        id: 'warehouse_name',
        numeric: false,
        label: 'Warehouse',
        align: 'left',
        sortable: true
    },
    {
        id: 'total',
        numeric: false,
        label: 'Total',
        align: 'center',
        sortable: false
    },
    {
        id: 'status',
        numeric: false,
        label: 'Status',
        align: 'center',
        sortable: false
    }
];

const PurchaseOrder = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('none');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const { purchaseOrderList, fetching } = useSelector((state) => state.transaction);

    // get transaction list
    useEffect(() => {
        dispatch(getPurchaseOrder());
    }, [dispatch]);

    useEffect(() => {
        setRows(purchaseOrderList);
    }, [purchaseOrderList]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // Filter  button
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickFilter = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setAnchorEl(null);
    };

    // ITEM STATE
    const [selectedItem, setSelectedItem] = useState('');

    // Action  button
    const [anchorEl2, setAnchorEl2] = useState(null);
    const openAction = Boolean(anchorEl2);
    const handleClickAction = (event, row) => {
        setAnchorEl2(event.currentTarget);
        setSelectedItem(row);
    };
    const handleCloseAction = () => {
        setAnchorEl2(null);
    };

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
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'name'], rows, setRows, purchaseOrderList)}
                        placeholder="Search Item"
                        value={search}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            startIcon={<IconReceipt />}
                            sx={{ color: theme.palette.text.light, borderRadius: 30 }}
                            color="tertiary"
                            variant="contained"
                            onClick={() => navigate('add')}
                        >
                            + Create New Order
                        </Button>

                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="outlined"
                            color="secondary"
                            sx={{ borderRadius: 30 }}
                            onClick={handleClickFilter}
                            startIcon={<IconFilter />}
                            endIcon={<IconChevronDown />}
                        >
                            Filter
                        </Button>
                        <EnhancedMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button'
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseFilter}
                        >
                            <MenuItem
                                onClick={() => handleFilter(null, setSearch, ['status'], setRows, purchaseOrderList, setAnchorEl)}
                                disableRipple
                            >
                                All
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleFilter('01', setSearch, ['status'], setRows, purchaseOrderList, setAnchorEl)}
                                disableRipple
                            >
                                Received
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleFilter('00', setSearch, ['status'], setRows, purchaseOrderList, setAnchorEl)}
                                disableRipple
                            >
                                On Progress
                            </MenuItem>
                        </EnhancedMenu>
                    </Stack>
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
                        action
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
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                            >
                                                {moment(row.created).format('DD MMMM YYYY')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <>{row.id}</>
                                        </TableCell>
                                        <TableCell>{row.vendor}</TableCell>
                                        <TableCell>{row.warehouse_name}</TableCell>
                                        <TableCell align="center">Rp {parseFloat(row.total_cost_price).toLocaleString('id')}</TableCell>
                                        <TableCell align="center">
                                            {row.status === '00' && (
                                                <Chip
                                                    label="On Progress"
                                                    color="warning"
                                                    // sx={{ transform: 'skew(-10deg)', borderRadius: 0 }}
                                                />
                                            )}
                                            {row.status === '01' && (
                                                <Chip
                                                    label="Received"
                                                    color="success"
                                                    // sx={{ transform: 'skew(-10deg)', borderRadius: 0 }}
                                                />
                                            )}
                                            {row.status === '02' && (
                                                <Chip
                                                    label="Canceled"
                                                    color="error"
                                                    // sx={{ transform: 'skew(-10deg)', borderRadius: 0 }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell align="center" sx={{ pr: 3 }}>
                                            <IconButton
                                                size="large"
                                                id="demo-customized-button"
                                                aria-controls={openAction ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openAction ? 'true' : undefined}
                                                onClick={(e) => handleClickAction(e, row)}
                                            >
                                                <MoreHorizTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                            </IconButton>
                                            <EnhancedMenu
                                                id="demo-customized-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button'
                                                }}
                                                anchorEl={anchorEl2}
                                                open={openAction}
                                                onClose={handleCloseAction}
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        navigate(`invoice?id=${selectedItem.id}`, { state: { ...selectedItem } });
                                                    }}
                                                    disableRipple
                                                >
                                                    <IconReceipt
                                                        color={theme.palette.tertiary.main}
                                                        stroke={1.5}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    Transaction Detail
                                                </MenuItem>
                                            </EnhancedMenu>
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
                        {rows.length === 0 && fetching ? (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.length === 0 &&
                            !fetching && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="subtitle2">No Data Available</Typography>
                                    </TableCell>
                                </TableRow>
                            )
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

export default PurchaseOrder;
