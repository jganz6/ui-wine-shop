import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    Grid,
    IconButton,
    InputAdornment,
    LinearProgress,
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
import { getComparator, stableSort, handleSearch } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';
import { useDispatch, useSelector } from 'store';
import { getWarehouses, deleteWarehouse } from 'store/slices/warehouse';
import EditWarehouseForm from 'views/pages/forms/EditWarehouseForm';
import AlertDialog from 'ui-component/extended/AlertDialog';
import MainCard from 'ui-component/cards/MainCard';
import WarehouseChart from './WarehouseChart';

// third-party
import Chart from 'react-apexcharts';

// assets
import WarehouseImage from 'assets/images/icons/warehouse.png';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import {
    IconBuilding,
    IconChevronDown,
    IconDownload,
    IconEdit,
    IconFilter,
    IconMapPin,
    IconMessage,
    IconPhone,
    IconReceipt,
    IconTrashX
} from '@tabler/icons';
import Avatar from 'ui-component/extended/Avatar';

// Table Header
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'Warehouse ID',
        align: 'left',
        sortable: true
    },
    {
        id: 'name',
        numeric: false,
        label: 'Warehouse Name',
        align: 'left',
        sortable: true
    },
    {
        id: 'address',
        numeric: false,
        label: 'Warehouse Address',
        align: 'left',
        sortable: true
    },
    {
        id: 'report',
        numeric: false,
        label: 'Warehouse Report',
        align: 'center',
        sortable: false
    }
];

const Warehouse = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState([]);

    const { warehouses } = useSelector((state) => state.warehouse);

    // get user list
    useEffect(() => {
        dispatch(getWarehouses());
    }, [dispatch]);

    useEffect(() => {
        setRows(warehouses);
    }, [warehouses]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        const selectedIndex = selected.indexOf(row);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, row);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

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

    // EDIT WAREHOUSE STATE
    const [selectedItem, setSelectedItem] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // CHART STATE
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (selected.length > 0) {
            const data = [];
            selected.map((i) => data.push({ ...WarehouseChart, series: [i.delivery, i.request_order, i.return_item] }));
            setChartData(data);
        }
    }, [selected]);
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
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'name', 'address'], rows, setRows, warehouses)}
                        placeholder="Search Warehouse"
                        value={search}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            startIcon={<IconBuilding />}
                            sx={{ color: theme.palette.text.light, borderRadius: 30 }}
                            color="tertiary"
                            variant="contained"
                            onClick={() => navigate('/admin/warehouse/add')}
                        >
                            + Add New Warehouse
                        </Button>
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
                                Active
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                Processing
                            </MenuItem>
                            <MenuItem onClick={handleCloseFilter} disableRipple>
                                InActive
                            </MenuItem>
                        </EnhancedMenu>
                    </Stack>
                </Grid>
            </Grid>

            {rows?.length > 0 ? (
                <>
                    {/* table */}
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item xs={12} md={selected.length > 0 ? 9 : 12}>
                            <TableContainer>
                                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                    <EnhancedTableHead
                                        headCells={headCells}
                                        theme={theme}
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows?.length}
                                        selected={selected}
                                        action
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                /** Make sure no display bugs if row isn't an OrderData object */
                                                if (typeof row === 'number') return null;
                                                const isItemSelected = isSelected(row);
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
                                                            onClick={(event) => handleClick(event, row)}
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
                                                            onClick={(event) => handleClick(event, row)}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{ color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900' }}
                                                            >
                                                                {row.id}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell onClick={(event) => handleClick(event, row)}>
                                                            <>{row.name}</>
                                                        </TableCell>
                                                        <TableCell onClick={(event) => handleClick(event, row)}>{row.address}</TableCell>
                                                        <TableCell align="center">
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                startIcon={<IconDownload />}
                                                                onClick={() => navigate(`#`)}
                                                            >
                                                                Download
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ pr: 3 }}>
                                                            <IconButton
                                                                size="large"
                                                                id="demo-customized-button"
                                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? 'true' : undefined}
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
                                                                        navigate(
                                                                            `/admin/warehouse/receive-list/${selectedItem.id}?search=${selectedItem.name}`
                                                                        );
                                                                    }}
                                                                    disableRipple
                                                                >
                                                                    <IconReceipt
                                                                        color={theme.palette.primary.main}
                                                                        stroke={1.5}
                                                                        style={{ marginRight: 5 }}
                                                                    />
                                                                    Receive List
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        setAnchorEl2(null);
                                                                        navigate(
                                                                            `/admin/warehouse/detail?id=${selectedItem.id}&search=${selectedItem.name}`
                                                                        );
                                                                    }}
                                                                    disableRipple
                                                                >
                                                                    <IconMessage
                                                                        color={theme.palette.secondary.main}
                                                                        stroke={1.5}
                                                                        style={{ marginRight: 5 }}
                                                                    />
                                                                    Detail Warehouse
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        setAnchorEl2(null);
                                                                        setOpenEditDialog(true);
                                                                    }}
                                                                    disableRipple
                                                                >
                                                                    <IconEdit
                                                                        color={theme.palette.tertiary.main}
                                                                        stroke={1.5}
                                                                        style={{ marginRight: 5 }}
                                                                    />
                                                                    Edit Warehouse
                                                                </MenuItem>
                                                                <MenuItem
                                                                    disableRipple
                                                                    onClick={() => {
                                                                        setAnchorEl2(null);
                                                                        setOpenDeleteDialog(true);
                                                                    }}
                                                                >
                                                                    <IconTrashX
                                                                        color={theme.palette.error.main}
                                                                        stroke={1.5}
                                                                        style={{ marginRight: 5 }}
                                                                    />
                                                                    Delete Warehouse
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
                        </Grid>
                        {selected.length > 0 && (
                            <Grid item xs={12} md={3}>
                                <Stack spacing={2}>
                                    {selected.map((item, key) => (
                                        <Stack spacing={2} key={key}>
                                            <MainCard boxShadow sx={{ boxShadow: '0px 4px 4px 0px #0000001A' }}>
                                                <Stack spacing={2}>
                                                    <Stack alignItems="center" spacing={2}>
                                                        <Box component="img" src={WarehouseImage} sx={{ width: '45%' }} />
                                                        <Typography>{item.name}</Typography>
                                                        <Chip label="Barookah Kitchen Warehouse" color="secondary" />
                                                    </Stack>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Avatar color="tertiary">
                                                            <IconPhone />
                                                        </Avatar>
                                                        <Typography>{item.phone}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Avatar color="tertiary">
                                                            <IconMapPin />
                                                        </Avatar>
                                                        <Typography>{item.address}</Typography>
                                                    </Stack>
                                                </Stack>
                                            </MainCard>
                                            {chartData.length === selected.length && (
                                                <MainCard title="Warehouse Data" boxShadow sx={{ boxShadow: '0px 4px 4px 0px #0000001A' }}>
                                                    <Chart {...chartData[key]} />
                                                    <Stack spacing={2}>
                                                        <Stack spacing={1}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography>On Delivery</Typography>
                                                                <Typography variant="subtitle2">{selected[key].delivery}</Typography>
                                                            </Stack>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                color="tertiary"
                                                                value={
                                                                    (selected[key].delivery /
                                                                        [...chartData[key].series].reduce((a, b) => a + b, 0)) *
                                                                    100
                                                                }
                                                                sx={{ height: 10, borderRadius: 5 }}
                                                            />
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography>Request Order</Typography>
                                                                <Typography variant="subtitle2">{selected[key].request_order}</Typography>
                                                            </Stack>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                color="warning"
                                                                value={
                                                                    (selected[key].request_order /
                                                                        [...chartData[key].series].reduce((a, b) => a + b, 0)) *
                                                                    100
                                                                }
                                                                sx={{ height: 10, borderRadius: 5 }}
                                                            />
                                                        </Stack>
                                                        <Stack spacing={1}>
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography>Return Item</Typography>
                                                                <Typography variant="subtitle2">{selected[key].return_item}</Typography>
                                                            </Stack>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={
                                                                    (selected[key].return_item /
                                                                        [...chartData[key].series].reduce((a, b) => a + b, 0)) *
                                                                    100
                                                                }
                                                                sx={{
                                                                    height: 10,
                                                                    borderRadius: 5,
                                                                    bgcolor: theme.palette.tertiary.light,
                                                                    '& .MuiLinearProgress-bar1Determinate': {
                                                                        backgroundColor: theme.palette.info.light
                                                                    }
                                                                }}
                                                            />
                                                        </Stack>
                                                    </Stack>
                                                </MainCard>
                                            )}
                                        </Stack>
                                    ))}
                                </Stack>
                            </Grid>
                        )}
                    </Grid>
                </>
            ) : (
                <Stack justifyContent="center" alignItems="center" sx={{ height: '40vh' }}>
                    <Typography variant="h4">Tidak ada data</Typography>
                </Stack>
            )}

            {/* Edit Warehouse Dialog */}
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
                    <EditWarehouseForm
                        data={selectedItem}
                        onClose={() => {
                            setSelectedItem('');
                            setOpenEditDialog(false);
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
                        await dispatch(deleteWarehouse(selectedItem));
                        await dispatch(getWarehouses());
                        setOpenDeleteDialog(false);
                    }}
                >
                    <Typography>Are you sure want to delete {selectedItem.name}?</Typography>
                </AlertDialog>
            )}
        </>
    );
};

export default Warehouse;
