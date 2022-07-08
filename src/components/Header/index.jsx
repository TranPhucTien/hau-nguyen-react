import { AccountCircle, Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Login from '~/features/Auth/components/Login';
import Register from '~/features/Auth/components/Register';
import { logout } from '~/features/Auth/userSlice';

const classes = {
    root: {},
    linkStyle: {
        textDecoration: 'none',
        color: '#fff',
    },
    avatar: {},
    submit: {},
    closeButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        color: '#9CB4CC',
        zIndex: 1,
    },
};

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function ButtonAppBar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
        handleCloseMenu()
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <CodeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ ...classes.linkStyle }}>
                            EZ SHOP
                        </Link>
                    </Typography>
                    <NavLink to="/todos" style={{ ...classes.linkStyle }}>
                        <Button color="inherit">todos</Button>
                    </NavLink>
                    <NavLink to="/albums" style={{ ...classes.linkStyle }}>
                        <Button color="inherit">Albums</Button>
                    </NavLink>
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                keepMounted
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            <Dialog open={open} disableEscapeKeyDown>
                <IconButton style={{ ...classes.closeButton }} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here
                                </Button>
                            </Box>
                        </>
                    )}
                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
