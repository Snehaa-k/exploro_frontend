import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, CardMedia } from "@mui/material";
import { format } from "date-fns";
import api from "../../../../axios-interceptors/AxiosInterceptors";
import { API_URL } from "../../../../apiservice/Apiservice";

const CancelledTrips = () => {
  const [cancelledTrips, setCancelledTrips] = useState([]);
  const [error, setError] = useState("");
  console.log(cancelledTrips, "haii cancelled");

  useEffect(() => {
    api
      .get("/showbookedtrip/")
      .then((response) => {
        setCancelledTrips(response.data.booked_trips);
      })
      .catch((err) => {
        setError("Failed to fetch booked trips");
      });
  }, []);

  const filteredTrips = cancelledTrips.filter(
    (trip) => trip.status === "cancelled",
  );

  return (
    <Grid
      container
      spacing={2}
      style={{ marginTop: "50px", marginLeft: "30px" }}
    >
      {filteredTrips.length > 0 ? (
        filteredTrips.map((trip, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ height: "350px", position: "relative" }}>
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
                  Start Date: {format(new Date(trip.start_date), "PPP")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Date: {format(new Date(trip.end_date), "PPP")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: Cancelled
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No cancelled trips</Typography>
      )}
    </Grid>
  );
};

export default CancelledTrips;
