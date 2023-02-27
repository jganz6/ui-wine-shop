import PropTypes from 'prop-types';

// material-ui
import { Box, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

const EnhancedTableHeadSimple = ({ headCells, order, orderBy, onRequestSort, action }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const theme = useTheme();
    return (
        <TableHead stickyheader="true" style={{ zIndex: 3, position: 'sticky', top: '0px' }}>
            <TableRow sx={{ background: theme.palette.secondary.main, borderRadius: 20 }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ top: 0, zIndex: 2, position: 'sticky' }}
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                sx={{ color: theme.palette.text.light }}
                            >
                                <Typography sx={{ color: theme.palette.text.light }}>{headCell.label}</Typography>
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            <Typography sx={{ color: theme.palette.text.light }}>{headCell.label}</Typography>
                        )}
                    </TableCell>
                ))}
                {action && (
                    <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                        <Typography sx={{ color: theme.palette.text.light }}>Action</Typography>
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHeadSimple.propTypes = {
    headCells: PropTypes.array.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    action: PropTypes.bool
};

export default EnhancedTableHeadSimple;
