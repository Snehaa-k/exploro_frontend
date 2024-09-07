import React, { useEffect, useState } from 'react';
import Actions from '../../../Profile-Components/Actions/Actions';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/Logout';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Navbar from '../../../Navbar/Navbar'
import './Common.css';
import { API_URL } from '../../../../apiservice/Apiservice';
import { useDispatch } from 'react-redux';
import { fetchuser } from '../../../../redux/actions/authActions';
import { useNavigate } from 'react-router';


const CommonLayout = ({ children }) => {
  const [profile,setProfile] = useState([])
  const dispatch = useDispatch()
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
  useEffect(()=>{
  
    const fetchUserData = async () => {
      try {
        const response = await dispatch(fetchuser()); 
        console.log(response.payload);
        
        if (response) {
          setProfile(response.payload.profile)
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    fetchUserData();
  }, [dispatch])

  const menuItemsNavbar = [
    { label: 'Home', onClick: HandleHome },
    { label: 'Profile', onClick:HandleProfile},
    { label: 'Destination', onClick:HandleDestination },
  ];

  const menuItemsActions = [
    { text: 'Edit Profile', icon: <EditIcon />, path: '/editprofile' },
    { text: 'Inbox', icon: <MessageIcon />, path: '/inbox' },
    { text: 'Alerts', icon: <NotificationsIcon />, path: '/alerts' },
    { text: 'Planned Trips', icon: <FlightTakeoffIcon />, path: '/viewtrip' },
    { text: 'Create Trip', icon: <EventNoteIcon />, path: '/triplan' },
    { text: 'LogOut', icon: <ExitToAppIcon /> },
  ];

  return (
    <div className="common-layout-container">
      <div className='navbar'>
        <Navbar menuItems={menuItemsNavbar} />
      </div>
      <div className="main-content">
        <div className='actions'>
          <Actions avatarSrc={`${API_URL}${profile.profile_image}`}   menuItems={menuItemsActions} />
        </div>
        <div className="trip-creation medium-size">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
