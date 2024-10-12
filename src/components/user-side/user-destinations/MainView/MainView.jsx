import React from "react";
import {
  CardMedia,
  CardContent,
  Typography,
  Button,
  Card,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Styled Button
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#F50057",
  color: "#fff",
  borderRadius: 0, // Remove border radius for a sharper look
  padding: "8px 16px", // Decrease padding for a more compact button
  "&:hover": {
    backgroundColor: "#c51162",
  },
}));

// Styled Card
const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: 0, // Remove border radius
  overflow: "hidden",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Slightly reduce shadow for a more subtle effect
  transition: "transform 0.3s",
  height: "auto", // Allow height to adjust based on content
  maxWidth: "300px", // Set a maximum width for the card
  margin: "0 auto", // Center the card
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

// Main View Component
const MainView = ({ trip }) => (
  <CustomCard>
    <CardMedia
      component="img"
      alt={trip.location}
      height="140" // Decrease height of the image
      image={trip.Trip_image}
      sx={{ objectFit: "cover" }} // Ensure the image covers the card area nicely
    />
    <CardContent>
      <Typography variant="h6" gutterBottom color="#333" fontWeight="bold"> {/* Changed text color */}
        {trip.location}
      </Typography>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Avatar
          alt={trip.travelLeadName}
          src={trip.travelead_profile_image}
          style={{ marginRight: "8px", width: 36, height: 36 }} // Smaller avatar size
        />

        <Box component="span" display="flex" alignItems="center">
          <Typography variant="body2" color="#555"> {/* Changed text color for better readability */}
            Hosted by {trip.travelead_username}
          </Typography>
          <CheckCircleIcon
            style={{ color: "blue", marginLeft: "4px", fontSize: "16px" }} 
          />
        </Box>
      </div>

      <Typography variant="h6" gutterBottom color="#FF5722" fontWeight="600"> {/* Changed amount text color */}
        Amount: ₹{trip.amount}
      </Typography>
      <Typography variant="body1" gutterBottom color="#333"> {/* Changed text color */}
        Start Date: {trip.start_date}, {trip.duration} days
      </Typography>
      <Typography variant="body1" gutterBottom color="#333"> {/* Changed text color */}
        Slots Available: {trip.participant_limit} only
      </Typography>

      <CustomButton variant="contained" fullWidth>
        Book Now
      </CustomButton>
    </CardContent>
  </CustomCard>
);

export default MainView;
