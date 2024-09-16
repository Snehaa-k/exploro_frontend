import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";

const tripsData = {
  upcoming: [
    { title: "Trip to Paris", description: "A great trip to Paris with amazing views.", image: "https://via.placeholder.com/300" },
    { title: "Beach Holiday", description: "Enjoy the sun and sand on this beach holiday.", image: "https://via.placeholder.com/300" },
    { title: "Mountain Adventure", description: "An exciting adventure in the mountains.", image: "https://via.placeholder.com/300" },
    { title: "Forest Retreat", description: "Relax in the serenity of a forest retreat.", image: "https://via.placeholder.com/300" },
    { title: "City Break", description: "A fun city break with lots to explore.", image: "https://via.placeholder.com/300" },
    { title: "Desert Safari", description: "Experience the beauty of the desert.", image: "https://via.placeholder.com/300" },
    // Add more upcoming trips
  ],
  completed: [
    { title: "Hiking Adventure", description: "An unforgettable hike in the mountains.", image: "https://via.placeholder.com/300" },
    { title: "City Exploration", description: "Exploring the busy city streets.", image: "https://via.placeholder.com/300" },
    // Add more completed trips
  ],
};

const ITEMS_PER_PAGE = 3; // Number of trips per page

const UserProfile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Get the right set of trips based on tabValue and currentPage
  const displayedTrips = tabValue === 0 ? tripsData.upcoming : tripsData.completed;
  const paginatedTrips = displayedTrips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Cover Section */}
      <Box
        sx={{
          height: "150px",
          backgroundImage: "url(https://via.placeholder.com/1500x500)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Avatar
          src="https://via.placeholder.com/120"
          alt="Profile Picture"
          sx={{
            width: 120,
            height: 120,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-60px",
            border: "5px solid white",
          }}
        />
      </Box>

      {/* Username, Subscriber Info, and Action Button */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h5">John Doe</Typography>
        <Typography variant="body2" color="text.secondary">
          1M subscribers
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            marginLeft: "-150px",
            borderRadius: "20px",
            backgroundColor: "#BBF2E8",
            color: "#000",
            "&:hover": {
              backgroundColor: "#A0DED4",
            },
          }}
        >
          Follow
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: "-30px", marginLeft: "80px" }}
        >
          1M subscribers
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            "& .MuiTabs-indicator": { bgcolor: "gray" },
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "16px",
            },
          }}
        >
          <Tab label="Upcoming Trips" />
          <Tab label="Completed Trips" />
        </Tabs>
      </Box>

      {/* Card Section */}
      <Box sx={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2}>
          {paginatedTrips.map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      height: "200px",
                      backgroundImage: `url(${trip.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></Box>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {trip.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {trip.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(displayedTrips.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default UserProfile;
