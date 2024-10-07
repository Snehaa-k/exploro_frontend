import React, { useEffect, useState } from "react";
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

  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams, useNavigate } from "react-router"; 
import api from "../../../axios-interceptors/AxiosInterceptors";
import moment from 'moment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReportIcon from '@mui/icons-material/Report';


const ITEMS_PER_PAGE = 3; 

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [tabValue, setTabValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const handleOpenReportModal = () => {
    setOpenReportModal(true);
  };

  const handleCloseReportModal = () => {
    setOpenReportModal(false);
  };

  const handleSubmitReport = () => {
    if (reportMessage.trim() === "") {
      return;
    }

    api.post(`/report/${id}/`, { reason: reportMessage })
      .then(response => {
        handleCloseReportModal();  
        alert("Report submitted successfully!");
      })
      .catch(error => {
        console.error("Error submitting report:", error);
      });
  };

  
  const today = moment();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const upcomingTrips = details.filter(trip => 
    moment(trip.end_date).isAfter(today) && trip.is_completed === "pending"
  );

  const completedTrips = details.filter(trip =>
    moment(trip.end_date).isBefore(today) && trip.is_completed !== "cancelled"
  );

  const displayedTrips = tabValue === 0 ? upcomingTrips : completedTrips;
  const paginatedTrips = displayedTrips.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    api.get(`/adminviewtrip/${id}`)
       .then(response => {
          setDetails(response.data);
       })
       .catch(error => {
          console.error('Error fetching details:', error);
       });

       api.get(`/follow/${id}`)
       .then(response => {
          setIsFollowing(response.data.is_following);
          setTotalFollowers(response.data.total_followers);
       })
       .catch(error => {
          console.error('Error fetching follow status:', error);
       });
 }, [isFollowing]);

 const handleCardClick = (id) => {
    navigate(`/viewdestination/${id}`);
  };

  const handleFollow = () => {
    api.post(`/follow/${id}`)
      .then(response => {
        setIsFollowing(!isFollowing); 
      })
      .catch(error => {
        console.error('Error following/unfollowing user:', error);
      });
  };

  const travelLeader = details.length > 0 ? details[0] : {};
  
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Box
        sx={{
          height: "150px",
          backgroundImage: "url(https://wallpapers.com/images/featured/solid-grey-background-ag4wgs25q8m35u89.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Avatar
          src={travelLeader.travelead_profile_image}
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

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
        <Typography variant="h5">{travelLeader.travelead_username}</Typography>
        <Typography variant="body2" color="text.secondary">
          Travel Leader
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {travelLeader.travelead_bio}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {travelLeader.travelead_address}
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
          onClick={handleFollow}
        >
        {isFollowing ? "Unfollow" : "Follow"}
        </Button>
       
        <Typography variant="body2" color="text.secondary" style={{marginTop:'-30px',marginLeft:'60px'}}>
          {totalFollowers}  Followers
        </Typography>
      </Box>
      <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "20px",
            backgroundColor: "#BBF2E8",
            marginTop:'-60px',
            marginLeft:'850px',
            color: "#000",
            "&:hover": {
              backgroundColor: "#A0DED4",
            },
          
          }}
          onClick={handleOpenReportModal}
        >
          <ReportIcon />
        </Button>

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
          {paginatedTrips.length > 0 ? (
            paginatedTrips.map((trip, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ 
                    boxShadow: 3, 
                    cursor: trip.is_completed === "pending" && moment(trip.start_date).isAfter(today) ? "pointer" : "default" 
                  }} 
                  onClick={() => {
                    if (trip.is_completed === "pending" && moment(trip.start_date).isAfter(today)) {
                      handleCardClick(trip.id); 
                    }
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        height: "200px",
                        backgroundImage: `url(${trip.Trip_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Box>

                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {trip.location}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      <CalendarTodayIcon />
                      <Typography variant="body2" ml={1}>
                        {trip.start_date} ➔ {trip.end_date}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {trip.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center',marginLeft:'700px' }}>
              {tabValue === 0 ? "No Upcoming Trips" : "No Completed Trips"}
            </Typography>
          )}
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {displayedTrips.length > 0 && (
          <Pagination
            count={Math.ceil(displayedTrips.length / ITEMS_PER_PAGE)}
            page={currentPage}
            onChange={handlePageChange}
          />
        )}
      </Box>
      <Dialog 
      open={openReportModal} 
      onClose={handleCloseReportModal}
      >
        <DialogTitle>Report User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for reporting this user:
          </DialogContentText>
          <textarea
            rows={4}
            style={{ width: '100%' }}
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
            placeholder="Type your message here..."
          />
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleCloseReportModal}
          >Cancel</Button>
          <Button 
          onClick={handleSubmitReport} 
          color="primary">
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
