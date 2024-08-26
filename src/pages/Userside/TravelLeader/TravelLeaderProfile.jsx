import { useState } from 'react'; 
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import Navbar from '../../../components/Navbar/Navbar';
import React from 'react'
import TabContainer from '../../../components/Profile-Components/Contents/TabContainer';
import Actions from '../../../components/Profile-Components/Actions/Actions';
import ViewProfile from '../../../components/Profile-Components/Viewprofile/ViewProfile';




const TravelLeaderProfile = () => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const tabs = [
      { value: 'one', label: 'Created Trips', content: <div>Content for Created Trips</div> },
      { value: 'two', label: 'Manage Bookings', content: <div>Content for Manage Bookings</div> },
    ];
    const menuItems = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Logout', icon: <LogoutIcon />, onClick: () => console.log('Logout clicked') },
      ];
  
  return (
    <div>
      <Navbar/>
      <Actions
      avatarSrc="https://via.placeholder.com/100"
      menuItems={menuItems}
    />
      <ViewProfile
      profilePic="https://via.placeholder.com/100"
      name="John Doe"
      description="A seasoned travel leader with years of experience guiding travelers to amazing destinations."
      followersCount={500}
      tabLabels={['Upcoming Trips', 'Reviews']}
      onFollowersClick={() => console.log('Travel Leader followers clicked')}
    >
      
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
        John has led over 50 successful trips worldwide.
      </Typography>
    </ViewProfile>
    <TabContainer value={value} handleChange={handleChange} tabs={tabs}/>
    </div>
  )
}

export default TravelLeaderProfile