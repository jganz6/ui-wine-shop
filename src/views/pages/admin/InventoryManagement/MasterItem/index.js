import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
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
import { useDispatch, useSelector } from 'store';
import { getInventories, deleteInventory } from 'store/slices/inventory';
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EditInventoryForm from 'views/pages/forms/EditInventoryForm';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';

// assets
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { IconArchive, IconEdit, IconTrashX } from '@tabler/icons';
import AlertDialog from 'ui-component/extended/AlertDialog';

// Table Header
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'No.',
        align: 'left',
        sortable: false
    },
    {
        id: 'name',
        numeric: false,
        label: 'Item Name',
        align: 'left',
        sortable: true
    },
    {
        id: 'cost',
        numeric: false,
        label: 'Cost',
        align: 'left',
        sortable: true
    },
    {
        id: 'retail_price',
        numeric: false,
        label: 'Retail Price',
        align: 'left',
        sortable: true
    },
    {
        id: 'agent_price',
        numeric: false,
        label: 'Agent Price',
        align: 'left',
        sortable: true
    },
    {
        id: 'mitra_price',
        numeric: false,
        label: 'Mitra Price',
        align: 'left',
        sortable: true
    }
];

const MasterItem = () => {
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

    const { inventories, loading, fetching } = useSelector((state) => state.inventory);

    // get user list
    useEffect(() => {
        dispatch(getInventories());
    }, [dispatch]);

    useEffect(() => {
        setRows(inventories);
    }, [inventories]);

    // TABLE FUNCTION
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // EDIT ITEM STATE
    const [selectedItem, setSelectedItem] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
            {/* Header Toolbar */}
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
                            startIcon={<IconArchive />}
                            sx={{ color: theme.palette.text.light, borderRadius: 30 }}
                            color="tertiary"
                            variant="contained"
                            onClick={() => navigate('add')}
                        >
                            + Add New Item
                        </Button>
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
                        onCheck={false}
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
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => handleClick(event, row.id, selected, setSelected)}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <>{page * 10 + index + 1}.</>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <Avatar src={row.photo_item ? process.env.REACT_APP_FILE_URL + row.photo_item : null} />
                                                <>{row.name}</>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            Rp {row.cost.toLocaleString('id')}/{row.satuan_unit}
                                        </TableCell>
                                        <TableCell>
                                            Rp {row.retail_price.toLocaleString('id')}/{row.satuan_unit}
                                        </TableCell>
                                        <TableCell>
                                            Rp {row.agent_price.toLocaleString('id')}/{row.satuan_unit}
                                        </TableCell>
                                        <TableCell>
                                            Rp {row.mitra_price.toLocaleString('id')}/{row.satuan_unit}
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
                                                        setAnchorEl2(null);
                                                        setOpenEditDialog(true);
                                                    }}
                                                    disableRipple
                                                >
                                                    <IconEdit color={theme.palette.tertiary.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Edit Item
                                                </MenuItem>
                                                <MenuItem
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                        setOpenDeleteDialog(true);
                                                    }}
                                                >
                                                    <IconTrashX color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Delete Item
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
                                <TableCell colSpan={9} />
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

            {/* Edit Item Dialog */}
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

            {/* Delete item confirm dialog */}
            {openDeleteDialog && (
                <AlertDialog
                    loading={loading || fetching}
                    open={openDeleteDialog}
                    onClose={() => {
                        setSelectedItem('');
                        setOpenDeleteDialog(false);
                    }}
                    onConfirm={async () => {
                        await dispatch(deleteInventory(selectedItem.id));
                        await dispatch(getInventories());
                        setOpenDeleteDialog(false);
                    }}
                >
                    <Typography>Are you sure want to delete {selectedItem.name}?</Typography>
                </AlertDialog>
            )}
        </>
    );
};

export default MasterItem;
