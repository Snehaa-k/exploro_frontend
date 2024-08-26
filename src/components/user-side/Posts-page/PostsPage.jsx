import React from 'react'
import { ListItem,ListItemText,List,Box,Typography,Paper ,Avatar,ListItemIcon} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Postspage.css'
import MainPost from '../main-post/MainPost'
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../../Navbar/Navbar';



const PostsPage = () => {
  return (
    <div>
 <Navbar/>
      
    
    <div className='sidebar-container'>
     
      <div className='side-bar'>
        <Box p={2} sx={{ backgroundColor: '#f9f9f9', height: 'vh' ,marginTop:'50px',paddingLeft:'40px' }}>
      <List>
      <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Dashboard Overview
          </Typography>
      <ListItem>
              <ListItemIcon>
                <PeopleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={`Following Travel Leaders`} secondary={0} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={`Completed Trips`} secondary={2} />
            </ListItem>
      </List>
      
    </Box>

    </div>
    

    <div className='right-side-container'>
    <Box p={2} sx={{ backgroundColor: '#f9f9f9', height: 'vh', marginLeft:'1050px',marginTop:'-330px', width:'300px' }}>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1,marginTop:'-4px' }}>
  <Avatar
    src="https://via.placeholder.com/50"
    alt="Steve Jobs"
    sx={{ marginRight: 2 }}
  />
  
  <Typography variant="body2" style={{marginTop:'-20px'}}>Travel Leader</Typography>
  <Typography variant="body2" sx={{ marginTop: '50px' ,marginLeft:'-85px'}} style={{marginTop:'20px'}}>bio</Typography>
</Box>
</Paper>
      <Paper sx={{ padding: 2, marginTop: 2 }}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <MailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
      </Paper>
      
      {/* <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Try Premium for free</Typography>
        <Typography variant="body2">One month free</Typography>
      </Paper> */}
    </Box>
    
    </div>
    <div className='main-container' style={{marginLeft:'450px',width:'200%',height:'100%',marginTop:'-240px' }}>
    <MainPost/>
    <MainPost/>
    <MainPost/>

    </div>
    </div>
    </div>
   
  )
}

export default PostsPage