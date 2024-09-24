import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Modal, Paper, Typography, Tab, Tabs } from '@mui/material';
import api from '../../../axios-interceptors/AxiosInterceptors';


const ViewProfile = ({
  profilePic,
  name,
  description,
  followersCount,
  onFollowersClick,
  Followers,
  children,
  following_r,
  tripsCompleted,
  Address,
  CS

}) => {
  const [value, setValue] = useState('one');
  const [open, setOpen] = useState(false);
  const [travelLeaders,setTravelLeaders] = useState([])
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  console.log(travelLeaders,"travel leaders");
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    if (onFollowersClick) onFollowersClick();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchFollowedLeaders = async () => {
      try {
        const response = await api.get('/following-leaders/')

        setTravelLeaders(response.data.followed_travel_leaders);
        setTotalFollowing(response.data.total_following);
        setLoading(false); 
      } catch (error) {
        setError('Unable to fetch followed travel leaders');
        console.error('Error fetching travel leaders:', error);
      }
    };

    fetchFollowedLeaders();
  }, []);

  return (
    <div>
     
      
      <Box ml={4} p={2} sx={{ flex: 1, backgroundColor: '#f9f9f9', borderRadius: '8px', width: '500px', marginLeft: '450px', marginTop: '-520px' }}>
        {/* Modal for Followers */}
        <Modal open={open} onClose={handleClose} aria-labelledby="followers-modal-title" aria-describedby="followers-modal-description">
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: 4,
              width: 300,
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Typography id="followers-modal-title" variant="h6">
              {following_r}
            </Typography>
            <Typography id="followers-modal-description" sx={{ mt: 2 }}>
              List of {following_r}...
              <ul>
              {travelLeaders.length === 0 ? (
        <p>You are not following any travel leaders yet.</p> 
      ) : (
        <ul>
          {travelLeaders.map((leader) => (
            <li key={leader.id}>
              <div>
                <img
                  src={leader.profile_image || 'default-avatar.png'}
                  alt={`${leader.username}'s profile`}
                  width="50"
                  height="50"
                />
                <div>
                  <h3>{leader.full_name}</h3>
                  <p>{leader.username}</p>
                  <p>{leader.bio}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      </ul>
            </Typography>
          </Paper>
        </Modal>

        <Avatar src={profilePic} alt={name} sx={{ marginRight: 2, width: 100, height: 100, marginLeft: '170px' }} />

        {/* Profile Details */}
        <Box mt={2} style={{ marginLeft: '60px',marginRight:'40px' }}>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {Address},{CS}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '80px', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{marginLeft:'-40px'}}>
                {Followers} :{followersCount}
            </Button>
            <Box sx={{ borderLeft: '1px solid #000', height: '24px', marginLeft: '16px', marginRight: '16px' }} />
            <Typography variant="body1">
                Trips Completed: {tripsCompleted}
            </Typography>
        </Box>

        {children && <Box mt={2}>{children}</Box>}
      </Box>

      {/* Trip Count or other content */}
      {/* <div className="trip-page" style={{ marginLeft: '970px' }}>
        <Box ml={4} p={2} sx={{ width: '500px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '-310px', height: '550px' }}>
          <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="tabs example">
            {tabLabels.map((label, index) => (
              <Tab key={index} value={`tab${index}`} label={label} />
            ))}
          </Tabs>
        </Box>
      </div> */}
    </div>
  );
};

export default ViewProfile;
