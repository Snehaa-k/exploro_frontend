import React from 'react';
import { ListItem, ListItemText, List, Box, Typography, Card, CardContent, CardMedia, Avatar, IconButton, TextField } from '@mui/material';
import { Favorite, Comment } from '@mui/icons-material';

// Destructure props for reusability
const MainPost = ({ avatarUrl, username, role, postImage, likes }) => {
  return (
    <Box p={2} style={{ marginTop: '350px', marginLeft: '550px',width:'420px' }}>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={avatarUrl || "https://via.placeholder.com/50"}
            alt={username}
            sx={{ marginRight: 2 }}
          />
          <Box>
            <Typography variant="h6">{username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {role || "Travel Leader"}
            </Typography>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          height="200"
          image={postImage || "https://via.placeholder.com/300x200"}
          alt="Post Image"
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
            {likes || "0"} likes
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
  );
};

export default MainPost;
