import React from 'react';
import { Box, Paper, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Sidebar = ({ profileImage, name, role, bio, menuItems }) => {
  return (
    <Box p={2} sx={{ backgroundColor: '#f9f9f9',  width: '300px', position: 'fixed', right: 78,marginTop:'-300px' }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Avatar
            src={profileImage || "https://via.placeholder.com/50"}
            alt={name || "User"}
            sx={{ marginRight: 2 }}
          />
          <Box>
            <Typography variant="body2">{name || "Steve Jobs"}</Typography>
            <Typography variant="body2" color="textSecondary">{role || "Travel Leader"}</Typography>
            <Typography variant="body2" color="textSecondary">{bio || "Bio"}</Typography>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Sidebar;
