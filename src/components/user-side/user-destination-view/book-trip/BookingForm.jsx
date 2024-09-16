import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, IconButton } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import LightningBoltIcon from '@mui/icons-material/FlashOn';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PxSrYJiQplpQ67p3kTF3bBrVzigdJZPFHmLiY67aVcv66vff1cTyW4g9NCtjn1ZCbiMVi23UmvSyflOGJiiejIF005mqPKxuk'); 

const TripCard = ({tripId}) => {
  const [trips,setTrip] = useState([])

  useEffect(()=>{
    const fetchTrip = async () => {
      const response = await api.get(`/viewonetrip/${tripId}/`);
      setTrip(response.data.trip);
    };

    fetchTrip();
  }, [tripId]);

  const handleReserveClick = async () => {
    try {
      const stripe = await stripePromise;

      const response = await api.post('/create-checkout-session/', {
        trip_id: tripId,  
      });

      const sessionId = response.data.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error('Stripe Checkout Error:', result.error.message);
      }
    } catch (error) {
      console.error('Error reserving spot:', error);
    }
  };



  return (
    <Card sx={{ maxWidth: 400, padding: 2, borderRadius: 3, boxShadow: 3 ,marginLeft:'300px',marginTop:'40px'}}>
      <Box display="flex" alignItems="center" mb={2}>
        <CalendarTodayIcon />
        <Typography variant="body2" ml={1}>
          {trips.start_date} ➔ {trips.end_date}
        </Typography>
      </Box>

      {/* Trip Type */}
      <Box display="flex" alignItems="center" mb={2}>
     
      </Box>

      {/* Total Price */}
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">TOTAL PRICE</Typography>
          <Typography variant="h5" color="primary"> Rs {trips.amount}</Typography>
        </Grid>
        <Typography variant="body2" color="textSecondary">
          Join with our Journey
        </Typography>

        {/* Reserve Button */}
        <Button
          variant="contained"
          fullWidth
          color="success"
          sx={{ marginTop: 2 }}
          onClick={handleReserveClick}
        >
          RESERVE SPOT
        </Button>

        {/* Instant Booking */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box display="flex" alignItems="center">
            <LightningBoltIcon color="warning" />
            <Typography variant="body2" ml={1}>
              Instant Booking
            </Typography>
          </Box>
          <Typography variant="body2" color="error">
            {trips.participant_limit} spots left
          </Typography>
        </Box>

        {/* Free Cancellation */}
        <Typography variant="body2" color="textSecondary" mt={2}>
          Free 4 Days Cancellation
        </Typography>

        {/* Lock Icon */}
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <IconButton color="default">
            <LockIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
