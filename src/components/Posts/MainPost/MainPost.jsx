import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Avatar, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, List, ListItem } from '@mui/material';
import { Favorite, Comment } from '@mui/icons-material';
import './MainPost.css';

const MainPost = ({ avatarUrl, username, role, postImage, article, imageLikes, articleLikes }) => {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({
    image: imageLikes || 0,
    article: articleLikes || 0,
  });

  const handleCommentClick = () => {
    setCommentModalOpen(true);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = {
        text: comment,
        timestamp: new Date().toLocaleString(), // Includes date and time
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  const handleLike = (type) => {
    setLikes({
      ...likes,
      [type]: likes[type] + 1,
    });
  };

  const handleClose = () => {
    setCommentModalOpen(false);
  };

  return (
    <Box p={2} sx={{ marginTop: '20px', marginX: 'auto' }}>
      <Card sx={{ marginBottom: 2, maxWidth: '100%', width: '480px' }}>
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

        {/* Article Content */}
        {article && (
          <CardContent>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {article}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleLike('article')}>
                <Favorite />
              </IconButton>
              <Typography variant="body2" color="textSecondary">
                {likes.article} likes
              </Typography>
              <IconButton onClick={handleCommentClick} sx={{ marginLeft: 2 }}>
                <Comment />
              </IconButton>
            </Box>
          </CardContent>
        )}

        {/* Post Image */}
        <CardMedia
          component="img"
          height="200"
          image={postImage || "https://via.placeholder.com/300x200"}
          alt="Post Image"
        />
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton onClick={() => handleLike('image')}>
              <Favorite />
            </IconButton>
            <IconButton onClick={handleCommentClick}>
              <Comment />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
            {likes.image} likes
          </Typography>
        </CardContent>
      </Card>

      {/* Comment Modal */}
      <Dialog open={isCommentModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {/* Display Existing Comments */}
          <List>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1">{comment.text}</Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ display: 'block', marginTop: '4px' }}>
                      {comment.timestamp} {/* Display timestamp including time */}
                    </Typography>
                  </Box>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No comments yet.
              </Typography>
            )}
          </List>
          {/* Add New Comment */}
          <TextField
            autoFocus
            margin="dense"
            label="Add a comment"
            type="text"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCommentSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MainPost;
