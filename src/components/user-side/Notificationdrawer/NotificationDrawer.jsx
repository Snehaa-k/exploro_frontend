import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationDrawer = ({ isOpen, onClose, notifications }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: '300px' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <List>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListItem key={index} button>
                <ListItemText primary={notification.message} secondary={notification.time} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
