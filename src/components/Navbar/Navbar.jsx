import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ title = 'Exploro', menuItems = [], onMenuClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuItemClick = (onClick) => {
    onClick();
    if (isMobile) setDrawerOpen(false);
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index} onClick={() => handleMenuItemClick(item.onClick)}>
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <Divider />
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1, 
      position: 'fixed',
      top: 0,
      left: 0,
     
      width: '100%',
      backgroundColor: '#fff', 
      zIndex: 1100, 
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)', 
    }}>
      <AppBar position="static" style={{ backgroundColor: '#025E73' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuClick || toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {isMobile ? (
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {renderMenuItems()}
            </Drawer>
          ) : (
            <div style={{ marginRight: '150px' }}>
              {menuItems.map((item, index) => (
                <Button key={index} color="inherit" onClick={item.onClick}  sx={{ textTransform: 'none' }} >
                   {item.icon}
                   <Typography variant="body1" sx={{ marginTop: '4px' }}>{item.label}</Typography>
                </Button>
              ))}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    
  );
};

export default Navbar;
