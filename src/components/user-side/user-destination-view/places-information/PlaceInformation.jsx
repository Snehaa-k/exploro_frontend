import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Avatar, Button, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const TripDetails = ({tripId}) => {
  console.log(tripId);
  const [trip,setTrip] = useState([])
  console.log(trip,"my trips");
  
  

  useEffect(()=>{
    const fetchTrip = async () => {
      const response = await api.get(`/viewonetrip/${tripId}/`);
      setTrip(response.data.trip);
    };

    fetchTrip();
  }, [tripId]);



  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      {/* Title */}
      {/* <Typography variant="h4" fontWeight="bold" gutterBottom>
        Discovering Two Places: Chapter Two of Our Global Adventure
      </Typography> */}

      {/* Location */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 2 }}>
        <LocationOnIcon fontSize="small" />
        <Typography variant="h6" fontWeight="bold">{trip.location}</Typography>

      </Stack>


   
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
        <Avatar src={trip.travelead_profile_image} sx={{ width: 56, height: 56 }} />
        <Typography variant="body1">Hosted by {trip.travelead_username}</Typography>
        <IconButton color="primary">
         <ChatBubbleOutlineIcon/>
        </IconButton>
      </Stack>

      <Box sx={{ display: 'flex', marginBottom: 3 }}>
        <img
          src={trip.Trip_image}
          alt="Trip"
          style={{ width: 200, height: 150, marginRight: 20, objectFit: 'cover'}}
        />

        <Typography variant="body1">
         {trip.description}
        </Typography>

      </Box>
      <Typography variant="h6"><b>Starting from </b>    {trip.start_date}</Typography>


      <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 3 }}>
        <Box>
          <Typography variant="h6">Amount</Typography>
          <Typography variant="h5" color="primary">
            ₹{trip.amount}
          </Typography>
          </Box>
          <Box>
    <Typography variant="h6">Duration</Typography>
    <Typography variant="h5" color="primary">
      {trip.duration}
    </Typography>
  </Box>
        <Box>
          <Typography variant="h6">Slots</Typography>
          <Typography variant="h5">{trip.participant_limit} Only</Typography>
        </Box>
      </Stack>

     

      <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar src={trip.travelead_profile_image} sx={{ width: 40, height: 40, marginRight: 2 }} />
        <Box>
          <Typography variant="body1">For more concerns, your trip leader</Typography>
          <Typography variant="body2">{trip.travelead_username} | Contact: {trip.travelead_email}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TripDetails;
