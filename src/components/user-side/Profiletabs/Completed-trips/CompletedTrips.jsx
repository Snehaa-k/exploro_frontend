import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Pagination } from '@mui/material';
import { format, isBefore } from 'date-fns'; // Import isBefore for date comparison
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { API_URL } from '../../../../apiservice/Apiservice';

const PastTrips = () => {
    const [pastTrips, setPastTrips] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [tripsPerPage] = useState(4); // Set the number of trips per page for pagination

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

    // Pagination Logic
    const indexOfLastTrip = currentPage * tripsPerPage;
    const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
    const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: '50px', marginLeft: '30px' }}>
                {currentTrips.length > 0 ? (
                    currentTrips.map((trip, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ height: '250px', position: 'relative',width:'230px' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${API_URL}${trip.image_url}`}
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

            {/* Pagination Component */}
            {filteredTrips.length > tripsPerPage && (
                <Pagination
                    count={Math.ceil(filteredTrips.length / tripsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
                />
            )}
        </>
    );
};

export default PastTrips;
