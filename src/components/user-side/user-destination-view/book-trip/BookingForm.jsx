import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, IconButton } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import LightningBoltIcon from '@mui/icons-material/FlashOn';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { loadStripe } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const stripePromise = loadStripe('pk_test_51PxSrYJiQplpQ67p3kTF3bBrVzigdJZPFHmLiY67aVcv66vff1cTyW4g9NCtjn1ZCbiMVi23UmvSyflOGJiiejIF005mqPKxuk'); 

const TripCard = ({tripId}) => {
  const [trips,setTrip] = useState([])
  const [wallet, setWallet] = useState(null);
  const [walletError, setWalletError] = useState(null); 
  const [walletSuccess, setWalletSuccess] = useState(null); 
  const [is_booked,setBooked] = useState(null)
  const[user,setUser] = useState()
  console.log(is_booked,"booked");
  console.log(trips,"ya trip");
  
  
  const navigate = useNavigate()
  
  
  
  
  

  useEffect(()=>{
    const fetchTrip = async () => {
      const response = await api.get(`/viewonetrip/${tripId}/`);
      setTrip(response.data.trip);
      setBooked(response.data.is_booked)
      setUser(response.data.userId)
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

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await api.get('/showwallet/');
        if (response) {
          setWallet(response.data.wallet);
        }
      } catch (error) {
        console.error('Failed to fetch wallet data:', error.message);
      }
    };
    fetchWallet();
  }, []);

  const handleWalletPaymentClick = async () => {
    if (!wallet) {
      Swal.fire("Error", "No wallet found! You cannot use wallet payment.", "error");
      return;
    }

    if (wallet.wallet < trips.amount) {
      Swal.fire("Insufficient Balance", "Your wallet balance is insufficient to complete this payment.", "error");
      return;
    }

    try {
      const response = await api.post('/wallet_payment/', {
        trip_id: tripId,
      });

      if (response.data.success) {
        Swal.fire("Success", "Payment completed successfully using your wallet!", "success");
        navigate('/success')
        
      } else {
        Swal.fire("Error", "Payment failed due to insufficient balance.", "error");
      }
    } catch (error) {
      console.error('Wallet Payment Error:', error);
      Swal.fire("Error", "An error occurred while processing wallet payment.", "error");
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
      <Typography variant="h6" style={{ color: is_booked ? 'red' : 'inherit' }}>
  {is_booked && is_booked ? 'You have already booked' : ''}
</Typography>      <Grid container justifyContent="space-between" alignItems="center">
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
          onClick={handleWalletPaymentClick}
          disabled={is_booked}
        >
          Wallet Pay
        </Button>



        <Button
          variant="contained"
          fullWidth
          color="success"
          sx={{ marginTop: 2 }}
          onClick={handleReserveClick}
          disabled={is_booked}
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
