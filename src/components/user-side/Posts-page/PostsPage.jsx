import React, { useEffect, useState } from 'react'
import { ListItem,ListItemText,List,Box,Typography,Paper ,Avatar,ListItemIcon} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'; 
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import './Postspage.css'
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../../Navbar/Navbar';
import DashboardOverview from '../../Posts/Sidebar/SideBar';
import Sidebar from '../../Posts/RightSideBar/RightSide';
import MainPost from '../../Posts/MainPost/MainPost';
import CreatePost from '../../Posts/CreatePost/CreatePost';
import { fetchuser } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { API_URL } from '../../../apiservice/Apiservice';



const PostsPage = () => {
  const dispatch = useDispatch()
  const [user,setUser] = useState([])
  const [profile,setProfile] = useState([])
  console.log(profile,"imagee")
  const token = localStorage.getItem('accessToken')
  console.log(user,"hai user");
  
  useEffect(()=>{
  
  const fetchUserData = async () => {
    try {
      const response = await dispatch(fetchuser()); 
      console.log(response.payload);
      
      if (response) {
        setUser(response.payload.user); 
        setProfile(response.payload.profile)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  fetchUserData();
}, [dispatch])


  
  const items = [
    {
      icon: <PeopleIcon color="primary" />,
      primaryText: `${user.is_travel_leader?"followers":"followeing"}`,
      secondaryText: '0',
    },
    {
      icon: <CheckCircleIcon color="success" />,
      primaryText: 'Completed Trips',
      secondaryText: '2',
    },
    
  ];
  const menuItems = [
    {
      icon: <ChatIcon color="" />,
      text: 'Chats'
    },
    {
      icon: <NotificationsIcon color="" />,
      text: 'Notifications'
    },
   
  ];
  const handleCommentChange = (event) => {
    
    console.log(event.target.value);
  };

  return (
    <div>

      
    
     <div className='dashboard'>
    
      <DashboardOverview items={items} />
      </div>
    
    

    <div className='right-side-container'>
     <Sidebar profileImage={`${API_URL}${profile.profile_image}`}
        name={user.username}
        role={user.is_travel_leader?"Travel Leader" : "Traveller"}
        menuItems={menuItems} />
    </div>
    <div className='create-post'>
   {user.is_travel_leader && (
        <div className='create-post'>
          <CreatePost />
        </div>
      )}
   </div>
   <div className='main-container' >
    <MainPost  
        name={user.username}
        onComment={handleCommentChange} />
    </div>
    
    

    </div>

   
  )
}

export default PostsPage