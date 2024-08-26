import React, { useEffect } from 'react'
import Actions from '../../../components/Profile-Components/Actions/Actions'
import TabContainer from '../../../components/Profile-Components/Contents/TabContainer'
import ViewProfile from '../../../components/Profile-Components/Viewprofile/ViewProfile'
import { useState } from 'react'; 
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import Navbar from '../../../components/Navbar/Navbar';
import { API_URL } from '../../../apiservice/Apiservice';
import axios from 'axios';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/reducers/authReducers';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '../../../axios-interceptors/AxiosInterceptors';





const TravellerProfile = () => {
  const token = localStorage.getItem("accessToken")
  console.log(token);
  
  const navigate = useNavigate()
  const [profile,setProfile] = useState(null)
  const [error, setError] = useState(null);
  const [value, setValue] = useState('one');
  const dispatch = useDispatch()
 
  useEffect(()=>{
    
    if (!token){
      navigate('/login')
      return
    }})

    
    const handlelogout = async () =>{
      
      const response = dispatch(logoutUser())
      if (response){
        navigate('/login')
  
      }
    }

    const tabs = [
        { value: 'one', label: 'Upcoming Trips', content: <div>Content for Upcoming Trips</div> },
        { value: 'two', label: 'Past Trips', content: <div>Content for Past Trips</div> },
      ];
    const menuItems = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Messages', icon: <MessageIcon />, path: '/messages' },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Logout', icon: <LogoutIcon />, onClick:handlelogout },
      ];
    
      const menuItemsLeader = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Inbox', icon: <MessageIcon />, path: '/inbox' },
        { text: 'Alerts', icon: <NotificationsIcon />, path: '/alerts' },
        { text: 'Planned Journeys', icon: <FlightTakeoffIcon />, path: '/planned-journeys' }, 
        { text: 'Manage Itineraries', icon: <EventNoteIcon />, path: '/manage-itineraries' },
        { text: 'Log Out', icon: <ExitToAppIcon />, onClick: handlelogout },
      ];
      

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    
  useEffect (()=>{
    const fectchprofile = async ()=>{
      if(!token){
        console.log("error found");
        setError("profile not found")
        return
      }
      try{
        const response = await api.get(`/travellerprofile`);
        
        console.log("my response",response);
        
        setProfile(response.data);

      
      }catch(error){
        if (error.response) {
          
          console.error('Error fetching profileqqq:', error.response.data);
          setError(error.response.data.error);
      } else {
          
        console.error('Error fetching profilecd:', error.message);
        setError('Error fetching profile');
      }
      } 
    }
    fectchprofile()
  },[token])
  
  const handleMenuClick = () => {
    console.log('Menu icon clicked');
  };

  const HomePage = () => {
    const handleMenuClick = () => {
      console.log('Menu icon clicked');
    };
  }
    
  const menuItemsn = [
    { label: 'Home', icon: <HomeIcon />, onClick: () => console.log('Home clicked') },
    { label: 'Destination', icon: <ExploreIcon />, onClick: () => console.log('Destination clicked') },
    { label: 'Profile', icon: <AccountCircleIcon />, onClick: () => console.log('Profile clicked') },
  ];
  const menuItemsLead = [
    { label: 'Home', onClick: () => console.log('Home clicked') },
    { label: 'Create', onClick: () => console.log('create clicked') },
    { label: 'Destination', onClick: () => console.log('Destination clicked') },
  ];


  return (
    <div>
   {profile && (
  <>
    {profile.user.is_travel_leader?<Navbar title="Exploro" menuItems={menuItemsLead} onMenuClick={handleMenuClick} />:<Navbar title="Exploro" menuItems={menuItemsn} onMenuClick={handleMenuClick} />}
    {profile.user.is_travel_leader?<Actions
      avatarSrc={
        profile?.profile?.profile_image 
          ? `http://127.0.0.1:8000${profile.profile.profile_image}` 
          : "https://via.placeholder.com/100"
      }
      menuItems={menuItemsLeader}
    />:<Actions
    avatarSrc={
      profile?.profile?.profile_image 
        ? `http://127.0.0.1:8000${profile.profile.profile_image}` 
        : "https://via.placeholder.com/100"
    }
    menuItems={menuItems}

  />}
   {profile.user.is_travel_leader? <ViewProfile
      profilePic={
        profile?.profile?.profile_image 
          ? `http://127.0.0.1:8000${profile.profile.profile_image}` 
          : "https://via.placeholder.com/100"
      }
      name={profile?.user?.username ?? 'No username available'}
      description={profile?.profile?.bio ?? ''}
      Address={profile?.profile?.address ?? ''}
      CS = {profile?.profile?.country_state ?? '' }
      followersCount={profile?.followersCount ?? 0}
      tripsCompleted={profile?.tripsCompleted ?? 0}
      Followers="Followers"
      following_r="followers"
      onFollowersClick={() => console.log('Traveler followers clicked')}
    />:<ViewProfile
    profilePic={
      profile?.profile?.profile_image 
        ? `http://127.0.0.1:8000${profile.profile.profile_image}` 
        : "https://via.placeholder.com/100"
    }
    name={profile?.user?.username ?? 'No username available'}
    description={profile?.profile?.bio ?? ''}
    Address={profile?.profile?.address ?? ''}
    CS = {profile?.profile?.country_state ?? '' }
    followersCount={profile?.followersCount ?? 0}
    tripsCompleted={profile?.tripsCompleted ?? 0}
    Followers="Following"
    following_r="following"
    onFollowersClick={() => console.log('Traveler followers clicked')}
  />}
  </>
)}

      <TabContainer value={value} handleChange={handleChange} tabs={tabs} />
    </div>
  )
}

export default TravellerProfile