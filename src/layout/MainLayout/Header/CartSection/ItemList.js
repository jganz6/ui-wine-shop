import { Fragment, useState, useEffect } from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project import
import { useDispatch, useSelector } from 'store';
import { deleteItem } from 'store/slices/cart';

// assets
import { IconBox, IconTrash } from '@tabler/icons';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.background.default
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const ItemList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { listItem } = useSelector((state) => state.cart);

    const [existItem, setExistItem] = useState(listItem);
    useEffect(() => {
        setExistItem(listItem);
    }, [listItem]);

    return (
        <List
            sx={{
                width: '100%',
                minWidth: 300,
                maxWidth: 400,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 400
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {existItem.length > 0 ? (
                existItem.map((item, key) => (
                    <Fragment key={key}>
                        <ListItemWrapper>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            color: theme.palette.success.dark,
                                            backgroundColor: theme.palette.success.light,
                                            border: 'none',
                                            borderColor: theme.palette.success.main
                                        }}
                                    >
                                        <IconBox stroke={1.5} size="1.3rem" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={<Typography variant="subtitle1">{item.title}</Typography>} />
                            </ListItem>
                            <Grid container direction="column" className="list-container">
                                <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item>
                                            <IconButton color="error" variant="contained" onClick={() => dispatch(deleteItem(item))}>
                                                <IconTrash stroke={1.5} size="2rem" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItemWrapper>
                        <Divider />
                    </Fragment>
                ))
            ) : (
                <>
                    <Typography variant="subtitle2" sx={{ textAlign: 'center', p: 2 }}>
                        no items selected
                    </Typography>
                </>
            )}
        </List>
    );
};

export default ItemList;
