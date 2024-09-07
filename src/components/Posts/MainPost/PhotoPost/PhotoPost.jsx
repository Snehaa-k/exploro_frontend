import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import CommentModal from '../CommentModal/CommentModal';
import TravelLeaderCard from '../MainCard/MainCard';

const TravelPostCard = ({ post, likes, handleLike }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
  
    const handleCommentClick = () => {
      setIsCommentModalOpen(true);
    };
  
    const handleCloseCommentModal = () => {
      setIsCommentModalOpen(false);
    };
  
    const handleCommentSubmit = () => {
      if (comment) {
        const newComment = {
          text: comment,
          timestamp: new Date().toLocaleString(),
        };
        setComments([...comments, newComment]);
        setComment('');
        handleCloseCommentModal();
      }
    };
  
    return (
      <Box p={2} sx={{ marginTop: '100px', marginX: 'auto' }}>

      <Card sx={{ width:'450px' ,marginLeft:'40px'}}>
        {/* Travel Leader Information */}
        <TravelLeaderCard
          avatarUrl={post.travelead_profile_image}
          post={post}
          name="John Doe" 
          time={post.created_at}
        />
  
        {/* Post Image */}
        <CardMedia
          component="img"
          height="200"
          image={post.post_image}
          alt="Post Image"
        />
  
        {/* Post Description */}
        <Typography variant="body1" style={{ marginLeft: '10px' }}>
          {post.description}
        </Typography>
  
        {/* Like and Comment Section */}
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton onClick={() => handleLike(post.id)}>
              <Favorite />
            </IconButton>
            <IconButton onClick={handleCommentClick}>
              <Comment />
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary">
          {likes || 0 } likes
          </Typography>
        </CardContent>
  
        {/* Comment Modal */}
        <CommentModal
          isOpen={isCommentModalOpen}
          handleClose={handleCloseCommentModal}
          comments={comments}
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
        />
      </Card>
      </Box>
    );
  };
export default TravelPostCard;
