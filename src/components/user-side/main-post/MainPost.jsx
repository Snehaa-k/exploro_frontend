import React from 'react'
import { ListItem,ListItemText,List,Box,Typography,Card,CardContent,CardMedia,Avatar,IconButton,TextField } from '@mui/material'
import { Favorite, Comment, Share } from '@mui/icons-material';

const MainPost = () => {
  return (
    <div>
        <div className='posts-container'>

<Box p={2} style={{marginTop:'20px',marginLeft:'10px'}}>
  {/* First Post */}
  <Card sx={{ marginBottom: 2 }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        src="https://via.placeholder.com/50"
        alt="Karim Saif"
        sx={{ marginRight: 2 }}
      />
      <Box>
        <Typography variant="h6">Karim Saif</Typography>
        <Typography variant="body2" color="textSecondary">
            
          Travel leader
        </Typography>
      </Box>
    </CardContent>
    <CardMedia
      component="img"
      height="200"
      image="https://via.placeholder.com/300x200"
      alt="Healthy Tracking App"
    />
    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <IconButton>
          <Favorite />
        </IconButton>
        <IconButton>
          <Comment />
        </IconButton>
       
      </Box>
      <Typography variant="body2" color="textSecondary">
        99 likes
      </Typography>
    </CardContent>
    <CardContent>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Write a comment..."
      />
    </CardContent>
  </Card>

  
</Box>
</div>
    </div>
  )
}

export default MainPost