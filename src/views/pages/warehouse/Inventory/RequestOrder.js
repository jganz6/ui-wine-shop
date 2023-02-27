import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Checkbox,
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
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';
import { useDispatch, useSelector } from 'store';
import { getTransactions } from 'store/slices/warehouse';
import useAuth from 'hooks/useAuth';

// assets
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { IconBoxSeam, IconChevronDown, IconCornerUpRight, IconEdit, IconFilter, IconPrinter, IconTrashX } from '@tabler/icons';
import Avatar from 'ui-component/extended/Avatar';

// Table Header
const headCells = [
    {
        id: 'user_name',
        numeric: false,
        label: "Buyer's Name",
        align: 'left',
        sortable: true
    },
    {
        id: 'request_date',
        numeric: false,
        label: 'Date',
        align: 'left',
        sortable: true
    },
    {
        id: 'id',
        numeric: false,
        label: 'Number',
        align: 'left',
        sortable: true
    },
    {
        id: 'qty',
        numeric: false,
        label: 'Qty',
        align: 'left',
        sortable: false
    },
    {
        id: 'total',
        numeric: false,
        label: 'Total',
        align: 'left',
        sortable: false
    },
    {
        id: 'status_payment',
        numeric: false,
        label: 'Payment Status',
        align: 'left',
        sortable: false
    }
];

const RequestOrder = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);
    // const [selectedItem, setSelectedItem] = useState('');
    // const [openEditDialog, setOpenEditDialog] = useState(false);
    // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const { transactions } = useSelector((state) => state.warehouse);

    // get inventory list
    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    useEffect(() => {
        setRows([]);
    }, [transactions]);

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

    // Action  button
    const [anchorEl2, setAnchorEl2] = useState(null);
    const openAction = Boolean(anchorEl2);
    const handleClickAction = (event, row) => {
        setAnchorEl2(event.currentTarget);
        console.log(row);
        // setSelectedItem(row);
    };
    const handleCloseAction = () => {
        setAnchorEl2(null);
    };

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ color: theme.palette.tertiary.main }}>
                        Request Order
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="medium" color="secondary" />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'user_name'], rows, setRows, transactions)}
                        placeholder="Search Item"
                        value={search}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        {user?.role === '10' && (
                            <Button
                                startIcon={<IconBoxSeam />}
                                sx={{ color: theme.palette.text.light, borderRadius: 30 }}
                                color="tertiary"
                                variant="contained"
                                // onClick={() => navigate('/admin/agent/add')}
                            >
                                + Add Request Order
                            </Button>
                        )}
                        <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="outlined"
                            color="secondary"
                            sx={{ borderRadius: 30 }}
                            // disableElevation
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
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Paid
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Overdue
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Open
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
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Avatar />
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                >
                                                    {row.user_name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>{row.request_date}</TableCell>
                                        <TableCell
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`sales-invoice?search=${row.id}`, { state: row })}
                                        >
                                            <Typography sx={{ color: theme.palette.tertiary.main }}>Sales Invoice</Typography>
                                            <Typography sx={{ color: theme.palette.tertiary.main }}>{row.id}</Typography>
                                        </TableCell>
                                        <TableCell>Rp {row.qty}</TableCell>
                                        <TableCell>Rp {row.total.toLocaleString('id')}</TableCell>
                                        <TableCell>
                                            {row.status_payment === 1 && (
                                                <Stack direction="row" alignItems="center" gap={1}>
                                                    <div className="dots dots-success" />
                                                    <>Paid</>
                                                </Stack>
                                            )}
                                            {row.status_payment === 2 && (
                                                <Stack direction="row" alignItems="center" gap={1}>
                                                    <div className="dots dots-warning" />
                                                    <>Open</>
                                                </Stack>
                                            )}
                                            {row.status_payment === 3 && (
                                                <Stack direction="row" alignItems="center" gap={1}>
                                                    <div className="dots dots-error" />
                                                    <>Overdue</>
                                                </Stack>
                                            )}
                                        </TableCell>

                                        <TableCell align="center">
                                            <IconButton
                                                size="large"
                                                id="demo-customized-button"
                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                // disableElevation
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
                                                        setAnchorEl2(null);
                                                    }}
                                                    disableRipple
                                                >
                                                    <IconPrinter
                                                        color={theme.palette.secondary.main}
                                                        stroke={1.5}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    Print Offical Letter
                                                </MenuItem>
                                                <MenuItem
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                    }}
                                                >
                                                    <IconCornerUpRight
                                                        color={theme.palette.tertiary.main}
                                                        stroke={1.5}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    Process
                                                </MenuItem>
                                                <MenuItem
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                    }}
                                                >
                                                    <IconEdit color={theme.palette.warning.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Edit
                                                </MenuItem>
                                                <MenuItem
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                    }}
                                                >
                                                    <IconTrashX color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Delete
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

export default RequestOrder;
