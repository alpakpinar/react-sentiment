import React, { useState } from 'react';

import { 
    Box,
    Typography,
    LinearProgress,
} from '@material-ui/core';

export default function LinearProgressWithLabel(props) {
    return (
        <Box 
            display="flex" 
            mx="auto" 
            my={2} 
            width={props.width}
            alignItems="center"
        >
            <Box width={1} mr={1}>
                <LinearProgress 
                    variant='buffer'
                    value={props.score}
                />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="primary">
                    {`${Math.round(props.score)}%`}
                </Typography>
            </Box>
        </Box>
    )
}