import React from 'react';

import { 
    Box,
    AppBar, 
    Toolbar,
    Typography,
    IconButton,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

export default function AppHeader() {
    return (
        <Box flexGrow={1}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box ml={2}>
                        <Typography variant="h6">
                            Sentiment Predictor
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}