import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import api from '../../../../axios-interceptors/AxiosInterceptors';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importing location icon
import { API_URL } from '../../../../apiservice/Apiservice'
const TourPlan = ({ tripId }) => {
  const token = localStorage.getItem('accessToken');
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await api.get(`/placedetails/${tripId}/`);
      setPlace([response.data.trip]);
    };

    fetchPlace();
  }, [tripId]);

  return (
    <Box sx={{ padding: 4 ,width:'1700px'}}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Tour Plan
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, mb: 2, maxHeight: '600px', overflowY: 'auto' }}>
            {place.length > 0 && place[0].length > 0 ? (
              <List>
                {place.flat().map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      alignItems: 'flex-start',
                      position: 'relative',
                      marginTop: index > 0 ? '5px' : '0',
                      padding: '10px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '5px',
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        {/* Display the image if available */}
                        <img
                          src={`${API_URL}${item.place_image}` || 'path/to/default/image.jpg'} // Replace with the actual path to default image
                          alt={item.place_name}
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px' }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          <LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                          {`Day ${index + 1}: ${item.place_name}`}
                        </Typography>
                        <Typography variant="body2"><strong>Description:</strong> {item.description}</Typography>
                        <Typography variant="body2"><strong>Accommodation:</strong> {item.accomodation}</Typography>
                        <Typography variant="body2"><strong>Transportation:</strong> {item.Transportation}</Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 2 }} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', mt: 10 }}>
                <img src="" alt="No places available" style={{ maxWidth: '100%', height: 'auto' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  No places available for this tour.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TourPlan;
