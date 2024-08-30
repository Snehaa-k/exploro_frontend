import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DashboardOverview = ({ items }) => {
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: '#f9f9f9',
        marginTop: { xs: '20px', sm: '120px' }, // Margin on top adjusts for different screen sizes
        paddingLeft: { xs: '10px', sm: '40px' }, // Padding adjusts for different screen sizes
        height: { xs: 'auto', sm: '350px' }, // Height adjusts for different screen sizes
        width: { xs: '100%', sm: '300px' }, // Width adjusts for different screen sizes
        overflowY: 'auto' // Ensure content scrolls if needed
      }}
    >
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
