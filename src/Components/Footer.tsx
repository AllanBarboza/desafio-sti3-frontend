import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" style={{
                alignItems: "center", height: '100px', display: 'flex',
                justifyContent: 'center',
            }} color="secondary">
                <Typography component="p">
                    by Allan Barboza
                </Typography>
            </AppBar>
        </Box>
    );
}

export default Footer;