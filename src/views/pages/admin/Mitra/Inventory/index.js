import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    Checkbox,
    Chip,
    Grid,
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
import { getInventories } from 'store/slices/inventory';

// assets
import SearchIcon from '@mui/icons-material/Search';
import { IconChevronDown, IconFilter } from '@tabler/icons';

// Table Header
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'Item ID',
        align: 'left',
        sortable: true
    },
    {
        id: 'name',
        numeric: false,
        label: "Item's Name",
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
        id: 'description',
        numeric: false,
        label: 'Description',
        align: 'left',
        sortable: true
    },
    {
        id: 'capital_price',
        numeric: false,
        label: 'Capital Price',
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

const AgentInventory = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const { inventories } = useSelector((state) => state.inventory);

    // get inventory list
    useEffect(() => {
        dispatch(getInventories());
    }, [dispatch]);

    useEffect(() => {
        setRows(inventories);
    }, [inventories]);

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
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'name'], rows, setRows, inventories)}
                        placeholder="Search Item"
                        value={search}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
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
                                Received
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                On Delivery
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Waiting
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Canceled
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
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.id, selected, setSelected)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Avatar src={row.image} />
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                >
                                                    {row.id}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <>{row.name}</>
                                            <Typography variant="subtitle2">{row.email}</Typography>
                                        </TableCell>
                                        <TableCell>{row.qty}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell align="center">Rp {parseFloat(row.capital_price).toLocaleString('id')}</TableCell>
                                        <TableCell align="center">
                                            {row.status === 1 && (
                                                <Chip
                                                    label="Received"
                                                    color="success"
                                                    sx={{ transform: 'skew(-25deg)', borderRadius: 0 }}
                                                />
                                            )}
                                            {row.status === 2 && (
                                                <Chip
                                                    label="On Delivery"
                                                    color="orange"
                                                    sx={{ transform: 'skew(-25deg)', borderRadius: 0 }}
                                                />
                                            )}
                                            {row.status === 3 && (
                                                <Chip label="Waiting" color="warning" sx={{ transform: 'skew(-25deg)', borderRadius: 0 }} />
                                            )}
                                            {row.status === 4 && (
                                                <Chip label="Canceled" color="error" sx={{ transform: 'skew(-25deg)', borderRadius: 0 }} />
                                            )}
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

export default AgentInventory;
