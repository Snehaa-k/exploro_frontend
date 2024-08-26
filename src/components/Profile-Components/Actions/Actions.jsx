import React from 'react';
import { Avatar, Box, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Actions = ({ avatarSrc, menuItems }) => {
  const navigate = useNavigate();

  const handleItemClick = (onClick, path) => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  const handleAvatarClick = () => {
    navigate('/travellerprofile'); 
  };

  return (
    <div style={{ marginLeft: '40px', marginTop: '50px' }}>
      <Box p={2} sx={{ backgroundColor: '#f9f9f9', height: '500px', paddingLeft: '50px', width: '300px' }}>
        <List>
          <Box
            onClick={handleAvatarClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Avatar
              alt="User Avatar"
              src={avatarSrc}
              sx={{ width: 56, height: 56, marginRight: '10px' }}
            />
            <Typography variant="h6" component="span">
              Profile
            </Typography>
          </Box>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleItemClick(item.onClick, item.path)}
              sx={{
                marginBottom: '20px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Actions;
