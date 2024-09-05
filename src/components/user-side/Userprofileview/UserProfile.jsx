import React, { useState } from 'react';
import { Avatar, Box, Grid, Typography, Tabs, Tab, Paper } from '@mui/material';

// Mock data for posts and trips
const userPosts = [
  { id: 1, imageUrl: 'https://via.placeholder.com/200', title: 'Post 1' },
  { id: 2, imageUrl: 'https://via.placeholder.com/200', title: 'Post 2' },
];

const userTrips = [
  { id: 1, imageUrl: 'https://via.placeholder.com/200', title: 'Trip 1' },
  { id: 2, imageUrl: 'https://via.placeholder.com/200', title: 'Trip 2' },
];

const UserProfile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Renders content based on selected tab
  const renderContent = () => {
    if (tabValue === 0) {
      return (
        <Grid container spacing={2}>
          {userPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {post.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    } else if (tabValue === 1) {
      return (
        <Grid container spacing={2}>
          {userTrips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <img
                  src={trip.imageUrl}
                  alt={trip.title}
                  style={{ width: '300px', height: '300px', display: 'block' }}
                />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {trip.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 3 }}>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          alt="Profile Image"
          src="https://via.placeholder.com/150" 
          sx={{ width: 100, height: 100, mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#cc4e3e' }}>
          other customer
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Bio or information
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Typography variant="body2">
            <strong>100</strong> Following
          </Typography>
          <Typography variant="body2">
            <strong>3</strong> trips created
          </Typography>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs value={tabValue} onChange={handleChange} centered sx={{ mb: 2 }}>
        <Tab label="Your Posts" />
        <Tab label="Post Trips" />
      </Tabs>

      {/* Render content based on the selected tab */}
      {renderContent()}
    </Paper>
  );
};

export default UserProfile;
