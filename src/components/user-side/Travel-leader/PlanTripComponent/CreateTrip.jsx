import React, { useState } from 'react';
import { Box, Button, TextField, InputAdornment, Grid, MenuItem } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './CreateTrip.css';

const CreateTrip = () => {
  const tripTypes = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'leisure', label: 'Leisure' },
    { value: 'cultural', label: 'Cultural' },
  ];

  return (
    <div className="trip-container">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 150,
              backgroundImage: 'url(https://via.placeholder.com/400x200)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                },
              }}
            >
              <UploadIcon />
              <input type="file" hidden />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            select
            label="Type of Trip"
            variant="outlined"
            margin="normal"
          >
            {tripTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Start date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="End date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Duration"
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={4}>
          <TextField
            fullWidth
            label="Accommodation"
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={6} sm={4} md={4}>
          <TextField
            fullWidth
            label="Transportation"
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <TextField
            fullWidth
            label="Add Amount"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <TextField
            fullWidth
            label="Participant limit"
            type="number"
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            sx={{
              width: '100%',
              height: '40px',
              bgcolor: 'black',
              mt: 3,
            }}
            variant="contained"
            type="submit"
          >
            CREATE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTrip;
