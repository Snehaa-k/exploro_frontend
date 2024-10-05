import React, { useEffect } from 'react'
import Actions from '../../../components/Profile-Components/Actions/Actions'
import TabContainer from '../../../components/Profile-Components/Contents/TabContainer'
import ViewProfile from '../../../components/Profile-Components/Viewprofile/ViewProfile'
import { useState,useMemo } from 'react'; 
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography,Snackbar,Alert, CardMedia, CircularProgress,Box } from '@mui/material';
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
import NotificationSystem from '../../../components/user-side/Notification/Notification';
import NotificationDrawer from '../../../components/user-side/Notificationdrawer/NotificationDrawer';
import TravelPostCard from '../../../components/Posts/MainPost/PhotoPost/PhotoPost';
import LeadersPost from '../TravelLeader/LeadersPosts/LeadersPost';





const TravellerProfile = () => {
  // const { userId, travelLeadId } = useParams();
  // console.log(travelLeadId,"idd")
  const token = localStorage.getItem("accessToken")
  const [receiverId, setReceiverId] = useState(null); 
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [profile,setProfile] = useState(null)
  const [loading, setLoading] = useState(true); 

  const [partners,setChatPartners] = useState(0)
  console.log(partners,"hai partners..");
  const [unreadmessages,setunreadmessage] = useState(0)
  const [unreadmessagess,setunreadmessages] = useState(0)
  const [posts,setPosts ] = useState([])
  const [comment,setComment] = useState([])
  console.log(posts,"post of leaders");
  console.log(comment,"ya comments");
  const [value, setValue] = useState('one');
  const [notification,setNotificationCount] = useState(0)

  

  console.log(unreadmessages,"unread messages");
  
  

  

  const notificationCount=unreadmessages?unreadmessages:partners
  const notificationCounts=unreadmessagess?unreadmessagess:notifications

  

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
    setunreadmessages(0)
  };

  const handleNewNotification = (message) => {
    setNotificationMessage(message);
    setSnackbarOpen(true);

  };

  const handlecount = (count)=>{
    setunreadmessage(count)

  }

  const handlecounts = (count)=>{
    setunreadmessages(count)

  }
  
  const fetchPosts = async () => {
     
    try {
      const response = await api.get(`/fetchposts/`);
      
      setPosts(response.data.posts);
      setComment(response.data.post_comments)
      console.log(response.data.notification_count,"hai guyss");
      
      setNotificationCount(response.data.notification_count)
    } catch (error) {
      console.error('Error fetching trips:', error.message);
    }
  };
  
  
  useEffect(() => {
    
    
  
  fetchPosts();
  }, [token]);

  useEffect(()=>{
    const fetchChatPartners = async () => {
      try {
        const response = await api.get('/chat-partners/'); 
        console.log(response,"haiiii...res");
        
        const filteredChatPartners = response.data.filter(
          partner => partner.last_message?.receiver === profile?.user?.id
        );

        const totalUnreadCount = filteredChatPartners.reduce((total, partner) => {
          return total + (partner.unread_count || 0); 
        }, 0);
        setChatPartners(totalUnreadCount)

       
      } catch (error) {
        console.error('Error fetching chat partners:', error);
      }
    };
     fetchChatPartners()
  },[isChatOpen,profile,snackbarOpen,partners,notificationCount])

 

  console.log(token);

  const handleOpenChat = (receiverId) => {
    setReceiverId(receiverId);
    setIsChatOpen(true);
    setunreadmessage(0)
  };
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setunreadmessage(0)
    setReceiverId(null); 
  };

 


  const navigate = useNavigate()
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  console.log(profile,"users pro");
  useEffect(()=>{
    console.log('value changes');
    
      },[value])
  

  const HandleProfile = ()=>{
    navigate('/travellerprofile')
  }
  const HandleDestination = ()=>{
    navigate('/destination')
  }
  const HandleHome = ()=>{
    navigate('/posts')
  }
 
  

    
    const handlelogout = async () =>{
      
      const response = dispatch(logoutUser())
      if (response){
        navigate('/login')
  
      }
    }
   

    const tabs = useMemo(() => {
      const baseTabs = [
        { value: 'one', label: 'Upcoming Trips', content: <UpcomingTrips /> },
        { value: 'two', label: 'Past Trips', content: <PastTrips /> },
        { value: 'three', label: 'Cancelled Trips', content: <CancelledTrips /> },
      ];
    
      if (profile?.user?.is_travel_leader) {
        baseTabs.push({
          value: 'four',
          label: 'Your Posts',
          content: posts.map((post) => (
            <LeadersPost key={post.id} post={post} likes={post?.likes?.length || 0}  fetchPosts={fetchPosts}/>
          )),
        });
      }
      return baseTabs;
    }, [profile, posts]);
      
      useEffect(()=>{
    
        if (!token){
          navigate('/login')
          return
        }})
    const menuItems = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Messages', icon: <MessageIcon />, onClick:handleOpenChat,count: notificationCount },
        { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications',count: notificationCounts,onClick: () => setIsNotificationOpen(true) },
        { text: 'Logout', icon: <LogoutIcon />, onClick:handlelogout },
      ];
    
      const menuItemsLeader = [
        { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, 
        { text: 'Inbox', icon: <MessageIcon />,  onClick:handleOpenChat,count: notificationCount},
        { text: 'Alerts', icon: <NotificationsIcon />, path: '/alerts',onClick: () => setIsNotificationOpen(true),count: notificationCounts },
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
      setLoading(true);
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
      }finally {
        setLoading(false); 
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
    {loading ? (
     
     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
     <CircularProgress />
   </Box>
      
    ) : profile ? (
      <>
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
      is_travel_leader = {true}
      userid={profile?.user?.id}
      
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
      <ChatDrawer isOpen={isChatOpen} onClose={handleCloseChat} currentUserId={profile?.user?.id} receiverId={receiverId} receiverName={null}  />
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={handleCloseNotification} currentUserId={profile?.user?.id} /> 
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

      <NotificationSystem open={isNotificationOpen} onClose={handleCloseNotification}  userId={profile?.user?.id} onCount={handlecount} oncountnot= {handlecounts} />
      
      </>
    ) : (
      <Typography variant="h6" color="error">{error}</Typography>
    )}
  
  
      

    </div>
  )
}

export default TravellerProfile