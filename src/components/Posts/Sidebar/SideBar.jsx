import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DashboardOverview = ({ items }) => {
  return (
   
    <Box p={2} sx={{ backgroundColor: '#f9f9f9', marginTop: '120px', paddingLeft: '40px', height:'350px',width:'300px'}}>
      <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.primaryText} secondary={item.secondaryText} />
          </ListItem>
        ))}
      </List>
    </Box>
  
  );
};

export default DashboardOverview;
