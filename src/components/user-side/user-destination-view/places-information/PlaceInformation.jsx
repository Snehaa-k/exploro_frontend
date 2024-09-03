import React from 'react';
import { Box, Stack, Typography, Avatar, Button, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const TripDetails = () => {
  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Discovering Two Places: Chapter Two of Our Global Adventure
      </Typography>

      {/* Location */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 2 }}>
        <LocationOnIcon fontSize="small" />
        <Typography variant="h6">Wayanad</Typography>
      </Stack>

   
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
        <Avatar src="https://via.placeholder.com/100" sx={{ width: 56, height: 56 }} />
        <Typography variant="body1">Hosted by Sneha</Typography>
        <IconButton color="primary">
        {/* Replace with a real icon for messaging */}
         <ChatBubbleOutlineIcon/>
        </IconButton>
      </Stack>

      {/* Image and Description */}
      <Box sx={{ display: 'flex', marginBottom: 3 }}>
        <img
          src="https://via.placeholder.com/200"
          alt="Trip"
          style={{ width: 200, height: 150, marginRight: 20, objectFit: 'cover' }}
        />
        <Typography variant="body1">
          Hey Adventure Seekers!
          <br />
          Join us for an exciting journey to Wayanad, where you’ll experience breathtaking views...
        </Typography>
      </Box>

      {/* Amount and Slots */}
      <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 3 }}>
        <Box>
          <Typography variant="h6">Amount</Typography>
          <Typography variant="h5" color="primary">
            ₹ 1,000
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Slots</Typography>
          <Typography variant="h5">2 Only</Typography>
        </Box>
      </Stack>

      {/* Next Button */}
      <Button variant="contained" color="primary" sx={{ marginBottom: 3 }}>
        Next
      </Button>

      {/* Contact Section */}
      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar src="https://via.placeholder.com/50" sx={{ width: 40, height: 40, marginRight: 2 }} />
        <Box>
          <Typography variant="body1">For more concerns, your trip leader</Typography>
          <Typography variant="body2">Sneha | Contact: your.contact@example.com</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TripDetails;
