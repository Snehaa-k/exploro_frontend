import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const TourPlan = ({tripId}) => {
   const token  = localStorage.getItem('accessToken')
    const [place,setPlace] = useState([])
    console.log(place);
    
    useEffect(()=>{
    
        const fetchPlace = async () => {
          const response = await api.get(`/placedetails/${tripId}/`);
          setPlace([response.data.trip]);
        };
    
        fetchPlace();
      }, [tripId]);
    

//   const tourPlanData = [
//     {
//       day: 1,
//       title: "Edakkal Caves",
//       description: "5 Star Accommodation | Breakfast",
//       details: "A scenic trek leading to the ancient Edakkal Caves."
//     },
//     {
//       day: 2,
//       title: "Pookode Lake",
//       description: "Boating and sightseeing at the serene Pookode Lake.",
//       details: "5 Star Accommodation | Breakfast"
//     },
//     {
//       day: 3,
//       title: "Rest",
//       description: "Enjoy a day of leisure at the resort.",
//       details: "5 Star Accommodation | Breakfast"
//     }
//   ];

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Tour Plan
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, mb: 2, width: '1050px', height: '600px' }}>
          {place.length > 0 && place[0].length > 0 ?(
            <List>
              {place.flat().map((item, index) => (
                <ListItem key={index} sx={{ alignItems: 'flex-start', position: 'relative', marginTop: index > 0 ? '5px' : '0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', minWidth: '40px' }}>
                    {`0${index + 1}`}
                  </Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      position: 'absolute',
                      left: '20px',
                      top: '30px',
                      bottom: '0',
                      borderWidth: '2px',
                      borderColor: '#000',
                      borderLeftStyle: 'dotted',
                      height: '100px',
                      marginTop: '10px'
                    }}
                  />
                  <ListItemText sx={{fontWeight: 'bold'}}
                    primary={`Day ${index + 1}:${item.place_name}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {item.description}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                         Accomodation: {item.accomodation}
                        </Typography><br/>
                        <Typography component="span" variant="body2" color="text.secondary">
                          Transportaion:{item.Transportation}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>):(<Box sx={{ textAlign: 'center', mt: 10 }}>
                                <img src="" alt="No places available" style={{ maxWidth: '100%', height: 'auto' }} />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    No places available for this tour.
                                </Typography>
                            </Box>)}
          </Paper>
        </Grid>

        {/* <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
            Travel Summary
          </Typography>
          <Paper elevation={3} sx={{ padding: 3, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">
                <strong>Accommodation:</strong> Apartments, Hotel
              </Typography>
              <Typography variant="body1">
                <strong>{place.length} day Trip:</strong> Edakkal Caves, Pookode Lake
              </Typography>
              <Typography variant="body1">
                <strong>Transportation:</strong> Bus, Car
              </Typography>
            </Box>
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default TourPlan;
