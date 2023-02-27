import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useAuth from 'hooks/useAuth';
import AlertDialog from 'ui-component/extended/AlertDialog';
import greeting from 'utils/greeting';

// assets
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';
import useConfig from 'hooks/useConfig';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const { borderRadius } = useConfig();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { logout, user } = useAuth();
    const [open, setOpen] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [loading, setLoading] = useState(false);

    const matchMobile = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={2}>
                {!matchMobile && (
                    <Avatar
                        sx={{
                            ...theme.typography.largeAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            color: theme.palette.secondary.main,
                            border: '2px solid transparent',
                            borderColor: 'none',
                            background: `linear-gradient(${theme.palette.secondary.light} 0 0) padding-box, linear-gradient(221.9deg, #E8312F 13.91%, rgba(253, 165, 62, 0.75) 88.76%) border-box`
                        }}
                    />
                )}
                <Chip
                    sx={{
                        height: '48px',
                        alignItems: 'center',
                        borderRadius: '54px',
                        transition: 'all .2s ease-in-out'
                    }}
                    deleteIcon={
                        <KeyboardArrowDownIcon
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                        />
                    }
                    label={user?.full_name}
                    variant="outlined"
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    onDelete={handleToggle}
                    color="secondary"
                />
            </Stack>

            <Popper
                placement="bottom"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 14]
                        }
                    }
                ]}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={handleClose}>
                        <Transitions in={open} {...TransitionProps}>
                            <Paper>
                                {open && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2, pb: 0 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Typography variant="h4">{greeting()}</Typography>
                                                    <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                        {user?.full_name}
                                                    </Typography>
                                                </Stack>
                                                {user.role === '29' && <Typography variant="subtitle2">Administrator</Typography>}
                                                {user.role === '10' && <Typography variant="subtitle2">Warehouse</Typography>}
                                                {user.role === '20' && <Typography variant="subtitle2">Agent</Typography>}
                                                {user.role === '22' && <Typography variant="subtitle2">Partner</Typography>}
                                            </Stack>

                                            <Divider />
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <Divider />
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/user/setting')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">App Setting</Typography>} />
                                                    </ListItemButton>
                                                    {matchMobile && (
                                                        <ListItemButton
                                                            sx={{ borderRadius: `${borderRadius}px` }}
                                                            selected={selectedIndex === 1}
                                                            onClick={(event) => handleListItemClick(event, 1, '/user/profile')}
                                                        >
                                                            <ListItemIcon>
                                                                <IconUser stroke={1.5} size="20px" />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={<Typography variant="body2">Manage Profile</Typography>}
                                                            />
                                                        </ListItemButton>
                                                    )}
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 2}
                                                        onClick={() => setOpenLogout(true)}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="20px" />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={
                                                                <Typography variant="body2">
                                                                    <FormattedMessage id="logout" />
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>

            <AlertDialog open={openLogout} onClose={() => setOpenLogout(false)} onConfirm={handleLogout} loading={loading}>
                {openLogout && <>Are you sure want to logout?</>}
            </AlertDialog>
        </>
    );
};

export default ProfileSection;
