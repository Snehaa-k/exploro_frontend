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
import { useNavigate, useParams } from 'react-router-dom';
import { logoutUser } from '../../../redux/reducers/authReducers';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from '../../../axios-interceptors/AxiosInterceptors';
import UpcomingTrips from '../../../components/user-side/Profiletabs/UpcomingTrips/UpcommingTrips';
import PastTrips from '../../../components/user-side/Profiletabs/Completed-trips/CompletedTrips';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatDrawer from '../../../components/user-side/ChatDialog/ChatDialog';
import CancelledTrips from '../../../components/user-side/Profiletabs/Cancelled-trips/CancelledTrips';





const TravellerProfile = () => {
  // const { userId, travelLeadId } = useParams();
  // console.log(travelLeadId,"idd")
  const token = localStorage.getItem("accessToken")
  const [receiverId, setReceiverId] = useState(null); 
  const [isChatOpen, setIsChatOpen] = useState(false);

  console.log(token);

  const handleOpenChat = (receiverId) => {
    setReceiverId(receiverId);
    setIsChatOpen(true);
  };
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setReceiverId(null); // Reset receiver ID on chat close
  };

  const navigate = useNavigate()
  const [profile,setProfile] = useState(null)
  const [error, setError] = useState(null);
  const [value, setValue] = useState('one');
  const dispatch = useDispatch()
  console.log(profile,"users pro");
  

  const HandleProfile = ()=>{
    navigate('/travellerprofile')
  }
  const HandleDestination = ()=>{
    navigate('/destination')
  }
  const HandleHome = ()=>{
    navigate('/posts')
  }
 
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
        { value: 'one', label: 'Upcoming Trips', content: <UpcomingTrips/>},
        { value: 'two', label: 'Past Trips', content: <PastTrips/> },
        { value: 'three', label: 'Cancelled Trips', content: <CancelledTrips/> },
      ];
    const menuItems = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Messages', icon: <MessageIcon />, onClick:handleOpenChat },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
        { text: 'Logout', icon: <LogoutIcon />, onClick:handlelogout },
      ];
    
      const menuItemsLeader = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, 
        { text: 'Inbox', icon: <MessageIcon />,  onClick:handleOpenChat},
        { text: 'Alerts', icon: <NotificationsIcon />, path: '/alerts' },
        { text: 'Planned Trips', icon: <FlightTakeoffIcon />, path: '/viewtrip', }, 
        { text: 'Create Trip', icon: <EventNoteIcon />, path: '/triplan' },
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
    { label: 'Home', onClick: HandleHome },
    { label: 'Destination', onClick: HandleDestination },
    { label: 'Profile', onClick:HandleProfile  },
  ];
  
  const menuItemsLead = [
    { label: 'Home', onClick:HandleHome },
    { label: 'Destination', onClick:HandleDestination  },
    { label: 'Profile', onClick: HandleProfile },
  ];


  return (
    <div style={{marginTop:'120px'}}>
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
      <ChatDrawer isOpen={isChatOpen} onClose={handleCloseChat} currentUserId={profile?.user?.id} receiverId={receiverId} receiverName={null} />

    </div>
  )
}

export default TravellerProfile