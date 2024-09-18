import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { format, isBefore } from 'date-fns'; // Import isBefore for date comparison
import api from '../../../../axios-interceptors/AxiosInterceptors';

const PastTrips = () => {
    const [pastTrips, setPastTrips] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/showbookedtrip/')
            .then(response => {
                setPastTrips(response.data.booked_trips);
            })
            .catch(err => {
                setError('Failed to fetch booked trips');
            });
    }, []);

    const today = new Date();

    const filteredTrips = pastTrips.filter(
        (trip) => isBefore(new Date(trip.end_date), today) && trip.status !== 'cancelled'
    );

    return (
        <Grid container spacing={2} style={{ marginTop: '50px', marginLeft: '30px' }}>
            {filteredTrips.length > 0 ? (
                filteredTrips.map((trip, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card sx={{ height: '200px', position: 'relative' }}>
                        <CardMedia
                                component="img"
                                height="140"
                                image={trip.image_url}  
                                alt={trip.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{trip.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Destination: {trip.destination}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Start Date: {format(new Date(trip.start_date), 'PPP')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    End Date: {format(new Date(trip.end_date), 'PPP')}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Status: Completed
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Typography>No past trips</Typography>
            )}
        </Grid>
    );
};

export default PastTrips;
