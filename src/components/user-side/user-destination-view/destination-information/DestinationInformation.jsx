import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import api from "../../../../axios-interceptors/AxiosInterceptors";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { API_URL } from "../../../../apiservice/Apiservice";

const TourPlan = ({ tripId }) => {
  const [place, setPlace] = useState([]);

  useEffect(() => {
    const fetchPlace = async () => {
      const response = await api.get(`/placedetails/${tripId}/`);
      setPlace([response.data.trip]);
    };

    fetchPlace();
  }, [tripId]);

  // Function to determine the transportation icon
  const getTransportationIcon = (transportation) => {
    switch (transportation.toLowerCase()) {
      case "car":
        return <DirectionsCarIcon />;
      case "bus":
        return <DirectionsBusIcon />;
      case "train":
        return <TrainIcon />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 4, width: "100%",maxWidth: "1200px", margin: "0 auto" ,backgroundColor:'white'}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Tour Plan
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              mb: 2,
              // backgroundColor: "#f5f5f5",
            }}
          >
            {place.length > 0 && place[0].length > 0 ? (
              <List>
                {place.flat().map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      alignItems: "flex-start",
                      position: "relative",
                      marginTop: index > 0 ? "10px" : "0",
                      padding: "10px",
                      // border: "1px solid #e0e0e0",
                      // borderRadius: "5px",
                      // backgroundColor: "#ffffff",
                      width: "100%", 
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <img
                          src={`${API_URL}${item.place_image}`}
                          alt={item.place_name}
                          style={{
                            width: "100%",
                            height: "200px", 
                            borderRadius: "5px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          <LocationOnIcon
                            sx={{ verticalAlign: "middle", marginRight: 1 }}
                          />
                          {`Day ${index + 1}: ${item.place_name}`}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Description:</strong> {item.description}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Accommodation:</strong> {item.accomodation}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mt: 2,
                          }}
                        >
                          {getTransportationIcon(item.Transportation)}
                          <Typography variant="body2">
                            <strong>Transportation:</strong> {item.Transportation}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    {/* Dotted Line Separator */}
                    <Divider
                      sx={{
                        borderTop: "2px dotted #ccc",
                        marginY: 2,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: "center", mt: 10 }}>
                <img
                  src=""
                  alt="No places available"
                  style={{ maxWidth: "100%", height: "auto" }}/>
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
