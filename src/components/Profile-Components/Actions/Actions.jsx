import React from 'react';
import { Avatar, Box, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Actions = ({ avatarSrc, menuItems }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <div
      style={{
        marginLeft: isMobile ? '10px' : '40px',
        marginTop: isMobile ? '20px' : '50px',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-start',
      }}
    >
      <Box
        p={2}
        sx={{
          backgroundColor: '#f9f9f9',
          height: isMobile ? 'auto' : '500px',
          paddingLeft: isMobile ? '20px' : '50px',
          paddingRight: isMobile ? '20px' : '50px',
          width: isMobile ? '100%' : '300px',
          boxSizing: 'border-box',
        }}
      >
        <List>
          <Box
            onClick={handleAvatarClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: isMobile ? '10px' : '20px',
              justifyContent: isMobile ? 'center' : 'flex-start',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Avatar
              alt="User Avatar"
              src={avatarSrc}
              sx={{ width: 56, height: 56, marginRight: isMobile ? '0' : '10px' }}
            />
            {!isMobile && (
              <Typography variant="h6" component="span">
                Profile
              </Typography>
            )}
          </Box>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleItemClick(item.onClick, item.path)}
              sx={{
                marginBottom: isMobile ? '10px' : '20px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer',
                },
                transition: 'background-color 0.3s ease',
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon sx={{ minWidth: isMobile ? 'auto' : undefined }}>
                {item.icon}
              </ListItemIcon>
              {!isMobile && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Actions;