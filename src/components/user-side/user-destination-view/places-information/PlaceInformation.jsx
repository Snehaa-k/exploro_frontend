import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import api from "../../../../axios-interceptors/AxiosInterceptors";
import { useNavigate } from "react-router";
import ChatDrawer from "../../ChatDialog/ChatDialog";
import NotificationSystem from "../../Notification/Notification";

const TripDetails = ({ tripId }) => {
  const [trip, setTrip] = useState({});
  const [user, setUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/viewonetrip/${tripId}/`);
        setTrip(response.data.trip);
        setUser(response.data.userId);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTrip();
  }, [tripId]);

  const handleAvatarClick = () => {
    const destination = trip.travelead === user ? "/travellerprofile" : `/userprofile/${trip.travelead}`;
    navigate(destination);
  };

  const handleOpenChat = () => {
    setSelectedPartner({ id: trip.travelead, username: trip.travelead_username });
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "auto", borderRadius: 2 }}>
      {/* Location */}
      <Stack direction="row" alignItems="center" spacing={1} sx={{ marginBottom: 2 }}>
        <LocationOnIcon fontSize="small" />
        <Typography variant="h6" fontWeight="bold">
          {trip.location}
        </Typography>
      </Stack>

      {/* Trip Host Details */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 3 }}>
        <Avatar
          src={trip.travelead_profile_image}
          sx={{ width: 60, height: 60 }}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        />
        <Typography variant="body1">
          Hosted by {trip.travelead_username}
        </Typography>
        {user !== trip.travelead && (
          <IconButton color="primary" onClick={handleOpenChat}>
            <ChatBubbleOutlineIcon />
          </IconButton>
        )}
      </Stack>

      {/* Trip Image */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
        <img
          src={trip.Trip_image}
          alt="Trip"
          style={{
            width: '100%', 
            height: 'auto',
            maxHeight: 400, 
            objectFit: 'cover',
            borderRadius: 8,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>

      {/* Trip Description */}
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {trip.description}
      </Typography>
      <Typography variant="body1" ml={1} sx={{ fontStyle: "italic", color: "#777" }}>
        Starting from {trip.start_date} ➔ {trip.end_date}
      </Typography>

      {/* Trip Details */}
      <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: 3 }}>
        <Box>
          <Typography variant="h6">Amount</Typography>
          <Typography variant="h5" color="primary">
            ₹{trip.amount}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Duration</Typography>
          <Typography variant="h5" color="primary">
            {trip.duration}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">Slots</Typography>
          <Typography variant="h5">{trip.participant_limit} Only</Typography>
        </Box>
      </Stack>

      {/* Trip Leader Contact Info */}
      <Box
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Avatar
          src={trip.travelead_profile_image}
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />
        <Box>
          <Typography variant="body1">For more concerns, your trip leader:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {trip.travelead_username} | Contact: {trip.travelead_email}
          </Typography>
        </Box>
      </Box>

      {/* Chat Drawer */}
      {user !== trip.travelead && (
        <ChatDrawer
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          currentUserId={user}
          receiverId={selectedPartner?.id}
          receiverName={trip.travelead_username}
        />
      )}

      {/* Notification System */}
      <NotificationSystem
        open={isNotificationOpen}
        onClose={handleCloseNotification}
        userId={user}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TripDetails;
