import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = blue[300];


const Error = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/movies")
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                Oops!!
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                Something went wrong!!
            </Typography>

            <Button variant="contained" onClick={handleClick}>Back Home</Button>
        </Box>
    );
}

export default Error;