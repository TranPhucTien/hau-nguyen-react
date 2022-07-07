import { Close } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Login from '~/features/Auth/components/Login';
import Register from '~/features/Auth/components/Register';

const classes = {
    root: {},
    linkStyle: {
        textDecoration: 'none',
        color: '#fff',
    },
    avatar: {},
    submit: {},
    closeButton: {
        position: "absolute",
        top: '8px',
        right: '8px',
        color: "#9CB4CC",
        zIndex: 1,
    },
};

export default function ButtonAppBar() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <Button color="inherit" onClick={handleClickOpen}>
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            <Dialog open={open} disableEscapeKeyDown>
                <IconButton style={{...classes.closeButton}} onClick={handleClose}>
                    <Close />
                </IconButton>
                <DialogContent>
                    <Login closeDialog={handleClose} />
                    {/* <Register closeDialog={handleClose} /> */}
                </DialogContent>
            </Dialog>
        </div>
    );
}
