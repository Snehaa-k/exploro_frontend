

import React from 'react'
import { CardMedia, CardContent, Typography, Button,Card ,Avatar,Box} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { API_URL } from '../../../../apiservice/Apiservice';

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#F50057',
    color: '#fff',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: '#c51162',
    },
  }));

const CustomCard = styled(Card)(({ theme }) => ({
   
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  }));

const MainView = ({ trip }) => (
  <CustomCard>
  <CardMedia
    component="img"
    alt={trip.location}
    height="200"
    image={trip.Trip_image}
  />
  <CardContent>
    <Typography variant="h6" gutterBottom>{trip.location}</Typography>

    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <Avatar
        alt={trip.travelLeadName}
        src={trip.travelead_profile_image}
        style={{ marginRight: '8px' }}
      />
       
      <Box component="span" display="flex" alignItems="center">
      <Typography variant="body2" color="textSecondary">

      Hosted by {trip.travelead_username}      </Typography>

      <CheckCircleIcon style={{ color: 'blue', marginLeft: '4px', fontSize: '16px' }} />
    
  </Box>
    </div>

    
    <Typography variant="h6" gutterBottom>Amount: ₹{trip.amount}</Typography>
    <CustomButton variant="contained">Book Now</CustomButton>
  </CardContent>
</CustomCard>
  );



export default MainView


