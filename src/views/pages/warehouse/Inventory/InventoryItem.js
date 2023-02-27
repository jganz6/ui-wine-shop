import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Checkbox,
    Dialog,
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

// project imports
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import { useDispatch, useSelector } from 'store';
import { getInventories } from 'store/slices/inventory';
import EditInventoryForm from 'views/pages/forms/EditInventoryForm';
import EditInventoryStockForm from 'views/pages/forms/EditInventoryStockForm';
import AlertDialog from 'ui-component/extended/AlertDialog';

// assets
import SearchIcon from '@mui/icons-material/Search';
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
        id: 'retail_price',
        numeric: false,
        label: 'Capital Price',
        align: 'center',
        sortable: false
    }
];

const InventoryItem = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openEditStockDialog, setOpenEditStockDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ color: theme.palette.tertiary.main }}>
                        Inventory Item
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
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'name'], rows, setRows, inventories)}
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
                                                <Avatar src={row.photo_item ? process.env.REACT_APP_FILE_URL + row.photo_item : null} />
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
                                        <TableCell>{row.qty || 0}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell align="center">Rp {parseFloat(row.retail_price).toLocaleString('id')}</TableCell>
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

            {/* Edit Inventory Dialog */}
            <Dialog
                maxWidth="md"
                open={openEditDialog}
                onClose={() => {
                    setSelectedItem('');
                    setOpenEditDialog(false);
                }}
                sx={{ '& .MuiDialog-paper': { p: 3 } }}
            >
                {openEditDialog && (
                    <EditInventoryForm
                        data={selectedItem}
                        onClose={() => {
                            setSelectedItem('');
                            setOpenEditDialog(false);
                        }}
                    />
                )}
            </Dialog>

            {/* Edit Inventory Stock Dialog */}
            <Dialog
                maxWidth="md"
                open={openEditStockDialog}
                onClose={() => {
                    setSelectedItem('');
                    setOpenEditStockDialog(false);
                }}
                sx={{ '& .MuiDialog-paper': { p: 3 } }}
            >
                {openEditStockDialog && (
                    <EditInventoryStockForm
                        data={selectedItem}
                        onClose={() => {
                            setSelectedItem('');
                            setOpenEditStockDialog(false);
                        }}
                    />
                )}
            </Dialog>

            {/* Delete warehouse confirm dialog */}
            {openDeleteDialog && (
                <AlertDialog
                    open={openDeleteDialog}
                    onClose={() => {
                        setSelectedItem('');
                        setOpenDeleteDialog(false);
                    }}
                    onConfirm={async () => {
                        console.log('Passing delete function');
                        setOpenDeleteDialog(false);
                    }}
                >
                    <Typography>Are you sure want to delete {selectedItem.name}?</Typography>
                </AlertDialog>
            )}
        </>
    );
};

export default InventoryItem;
