import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Button, Typography } from '@mui/material';


const Header = () => {
    const LOGO = "STI3"
    const APP_TITLE = "Agenda Telefonica"
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {LOGO}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {APP_TITLE}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;