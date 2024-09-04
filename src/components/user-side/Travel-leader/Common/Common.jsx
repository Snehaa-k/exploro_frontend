import React from 'react';
import Actions from '../../../Profile-Components/Actions/Actions';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/Logout';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Navbar from '../../../Navbar/Navbar'
import './Common.css';


const CommonLayout = ({ children }) => {



  const menuItemsNavbar = [
    { label: 'Home', onClick: () => console.log('Home clicked') },
    { label: 'Create', onClick: () => console.log('Create clicked') },
    { label: 'Destination', onClick: () => console.log('Destination clicked') },
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
          <Actions   menuItems={menuItemsActions} />
        </div>
        <div className="trip-creation medium-size">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
