import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import PostsPage from '../../../components/user-side/Posts-page/PostsPage'
import './UserPost.css'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';

const UserPost = () => {
  const navigate = useNavigate()
  const HandleProfile = ()=>{
    navigate('/travellerprofile')
  }
  const HandleDestination = ()=>{
    navigate('/destination')
  }
  const HandleHome = ()=>{
    navigate('/posts')
  }
  const handleClick = (id) => {
    navigate(`/viewdestination/${id}`);
  };

  const menuItemsLead = [
    { label: 'Home',icon: <HomeIcon />, onClick: HandleHome },
    { label: 'Profile', icon: <ExploreIcon />, onClick:HandleProfile },
    { label: 'Destination',icon: <AccountCircleIcon />, onClick:HandleDestination },
  ];
  return (

    <div >
      <div style={{position:'fixed',width:'100%',zIndex: 3}}>
        <Navbar menuItems={menuItemsLead} />
        </div>
        <PostsPage/>
    </div>
  )
}

export default UserPost