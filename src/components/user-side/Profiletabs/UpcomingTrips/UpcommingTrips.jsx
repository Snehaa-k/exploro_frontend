import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid,CardMedia } from '@mui/material';
import { format, isAfter } from 'date-fns'; 
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { useNavigate } from 'react-router';
import { API_URL } from '../../../../apiservice/Apiservice';

const UpcomingTrips = () => {
    const navigate = useNavigate();
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [cancel,setCancelTrip] = useState(false)
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/showbookedtrip/')
          .then(response => {
            setUpcomingTrips(response.data.booked_trips);
          })
          .catch(err => {
            setError('Failed to fetch booked trips');
          });
      }, [cancel]);

    const handleViewTrip = (id) => {
        navigate(`/viewdestination/${id}`);
    };
   
    const handleCancelTrip = (tripId) => {
        api.post('/canceltrip/', { trip_id: tripId })
          .then(response => {
              // Remove the canceled trip from the list of upcoming trips
              setUpcomingTrips(upcomingTrips.filter(trip => trip.id !== tripId));
              alert('Trip canceled Successful');
              setCancelTrip(true)
          })
          .catch(err => {
              console.error('Error canceling trip:', err);
              alert('Failed to cancel the trip.');
              setCancelTrip(true)
          });
    };

    const today = new Date();

    const filteredTrips = upcomingTrips.filter(
        (trip) => isAfter(new Date(trip.end_date), today) && trip.status !== 'cancelled'
    );

    return (
        <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '10px'  }}>
            {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card
                            sx={{ height: '350px', position: 'relative', cursor: 'pointer' }}
                            // onClick={() => handleViewTrip(trip.id)}
                        >
                             <CardMedia
                                component="img"
                                height="100"
                                image={`${API_URL}${trip.image_url}`}  
                                alt={trip.name}
                                // sx={{ cursor: 'pointer' }} // Add pointer cursor for visual feedback
                                onClick={() => handleViewTrip(trip.id)}
                            />
                            <CardContent>
                                <Typography variant="h6">{trip.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Destination: {trip.destination}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Start date: {format(new Date(trip.start_date), 'PPP')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    End date: {format(new Date(trip.end_date), 'PPP')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Status: Scheduled
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ position: 'absolute', bottom: '16px', right: '16px' }}
                                    onClick={() => handleCancelTrip(trip.id)}
                                >
                                    Cancel trip
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography>No upcoming trips</Typography>
            )}
        </Grid>
    );
};

export default UpcomingTrips;
