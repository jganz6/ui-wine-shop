import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Checkbox,
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
import { getComparator, stableSort, handleSearch, handleRequestSort, handleSelectAllClick, handleClick } from 'utils/tableHelper';
import EnhancedTableHead from 'ui-component/extended/EnhancedTableHead';
import EnhancedMenu from 'ui-component/extended/EnhancedMenu';
import { useDispatch, useSelector } from 'store';
import { getAgents, deleteAgent } from 'store/slices/agent';
import EditAgentForm from 'views/pages/forms/EditAgentForm';
import ManageRoleForm from 'views/pages/forms/ManageRoleForm';
import AlertDialog from 'ui-component/extended/AlertDialog';

// assets
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import {
    IconArchive,
    IconChevronDown,
    IconEdit,
    IconFilter,
    IconMessage,
    IconReportAnalytics,
    IconTransform,
    IconTrashX,
    IconUsers
} from '@tabler/icons';

// Table Header
const headCells = [
    {
        id: 'id',
        numeric: false,
        label: 'User ID',
        align: 'left',
        sortable: true
    },
    {
        id: 'name',
        numeric: false,
        label: 'Full Name',
        align: 'left',
        sortable: true
    },
    {
        id: 'phone',
        numeric: false,
        label: 'Phone',
        align: 'left',
        sortable: true
    },
    {
        id: 'address',
        numeric: false,
        label: 'Address',
        align: 'left',
        sortable: true
    },
    {
        id: 'inventory',
        numeric: false,
        label: 'Inventory',
        align: 'center',
        sortable: false
    },
    {
        id: 'performance',
        numeric: false,
        label: 'Performance',
        align: 'center',
        sortable: false
    }
];

const Agent = () => {
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

    // Filter  button
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickFilter = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setAnchorEl(null);
    };
    // EDIT USER STATE
    const [selectedUser, setSelectedUser] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openManageRoleDialog, setOpenManageRoleDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // Action  button
    const [anchorEl2, setAnchorEl2] = useState(null);
    const openAction = Boolean(anchorEl2);
    const handleClickAction = (event, row) => {
        setAnchorEl2(event.currentTarget);
        setSelectedUser(row);
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
                        onChange={(e) => handleSearch(e, setSearch, ['id', 'name', 'email', 'address', 'role'], rows, setRows, agents)}
                        placeholder="Search Agent"
                        value={search}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button
                            startIcon={<IconUsers />}
                            sx={{ color: theme.palette.text.light, borderRadius: 30 }}
                            color="tertiary"
                            variant="contained"
                            onClick={() => navigate('/admin/agent/add')}
                        >
                            + Add New Agent
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
                                                {row.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <>
                                                {row.first_name} {row.last_name}
                                            </>
                                            <Typography variant="subtitle2">{row.email}</Typography>
                                        </TableCell>
                                        <TableCell>{row.phone_number}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                startIcon={<IconArchive />}
                                                onClick={() => navigate(`inventory?search=${row.name}`)}
                                            >
                                                Inventory
                                            </Button>
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
                                        <TableCell align="center" sx={{ pr: 3 }}>
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
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                        setOpenManageRoleDialog(true);
                                                    }}
                                                >
                                                    <IconTransform
                                                        color={theme.palette.primary.main}
                                                        stroke={1.5}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    Manage Role
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                        setOpenEditDialog(true);
                                                    }}
                                                    disableRipple
                                                >
                                                    <IconEdit color={theme.palette.tertiary.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Edit Agent
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                        navigate('report');
                                                    }}
                                                    disableRipple
                                                >
                                                    <IconReportAnalytics
                                                        color={theme.palette.secondary.main}
                                                        stroke={1.5}
                                                        style={{ marginRight: 5 }}
                                                    />
                                                    Report
                                                </MenuItem>
                                                <MenuItem
                                                    disableRipple
                                                    onClick={() => {
                                                        setAnchorEl2(null);
                                                        setOpenDeleteDialog(true);
                                                    }}
                                                >
                                                    <IconTrashX color={theme.palette.error.main} stroke={1.5} style={{ marginRight: 5 }} />
                                                    Delete Agent
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

            {/* Edit User Dialog */}
            <Dialog
                maxWidth="md"
                open={openEditDialog}
                onClose={() => {
                    setSelectedUser('');
                    setOpenEditDialog(false);
                }}
                sx={{ '& .MuiDialog-paper': { p: 3 } }}
            >
                {openEditDialog && (
                    <EditAgentForm
                        data={selectedUser}
                        onClose={() => {
                            setSelectedUser('');
                            setOpenEditDialog(false);
                        }}
                    />
                )}
            </Dialog>

            {/* Manage Role Dialog */}
            <Dialog
                maxWidth="md"
                open={openManageRoleDialog}
                onClose={() => {
                    setSelectedUser('');
                    setOpenManageRoleDialog(false);
                }}
                sx={{ '& .MuiDialog-paper': { p: 3 } }}
            >
                {openManageRoleDialog && (
                    <ManageRoleForm
                        data={selectedUser}
                        onClose={() => {
                            setSelectedUser('');
                            setOpenManageRoleDialog(false);
                        }}
                    />
                )}
            </Dialog>

            {/* Delete user confirm dialog */}
            {openDeleteDialog && (
                <AlertDialog
                    open={openDeleteDialog}
                    onClose={() => {
                        setSelectedUser('');
                        setOpenDeleteDialog(false);
                    }}
                    onConfirm={async () => {
                        await dispatch(deleteAgent(selectedUser));
                        setOpenDeleteDialog(false);
                    }}
                >
                    <Typography>Are you sure want to delete {selectedUser.name}?</Typography>
                </AlertDialog>
            )}
        </>
    );
};

export default Agent;
