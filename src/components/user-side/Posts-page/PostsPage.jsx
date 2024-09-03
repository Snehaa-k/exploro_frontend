import React from 'react'
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



const PostsPage = () => {
  const items = [
    {
      icon: <PeopleIcon color="primary" />,
      primaryText: 'Following Travel Leaders',
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
     <Sidebar profileImage="https://via.placeholder.com/50"
        name="Steve Jobs"
        role="Travel Leader"
        bio="Bio information goes here"
        menuItems={menuItems} />
    </div>
    <div className='create-post'>
   <CreatePost/>
   </div>
   <div className='main-container' >
    <MainPost  profileImage="https://via.placeholder.com/50"
        name="Karim Saif"
        role="Travel Leader"
        postImage="https://via.placeholder.com/300x200"
        likes="99 likes"
        onComment={handleCommentChange} />
    </div>
    <div className='main-container'>
    <MainPost  profileImage="https://via.placeholder.com/50"
        name="Karim Saif"
        role="Travel Leader"
        postImage="https://via.placeholder.com/300x200"
        likes="99 likes"
        onComment={handleCommentChange} />
    </div>
    <div className='main-container'>
    <MainPost  profileImage="https://via.placeholder.com/50"
        name="Karim Saif"
        role="Travel Leader"
        postImage="https://via.placeholder.com/300x200"
        likes="99 likes"
        onComment={handleCommentChange} />
    </div>
    
    

    </div>

   
  )
}

export default PostsPage