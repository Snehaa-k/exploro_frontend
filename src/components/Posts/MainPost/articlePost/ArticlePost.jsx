import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import CommentModal from '../CommentModal/CommentModal';
import TravelLeaderCard from '../MainCard/MainCard';
const TravelArticleCard = ({ post, likes, handleLike }) => {
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
    }
    handleCloseCommentModal();
  };

  return (
    <Box p={2} sx={{ marginTop: '100px', marginX: 'auto' }}>

    <Card sx={{ width:'450px' ,marginLeft:'40px' }}>
      {/* Travel Leader Information */}
      <TravelLeaderCard
        avatarUrl={post.travelead_profile_image}
        post={post}
        name="John Doe" 
        time={post.created_at}
      />

      {/* Article Content */}
      {post.article && (
        <CardContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {post.article}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => handleLike('article')}>
              <Favorite />
            </IconButton>
            <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
              {/* {likes.article} likes */}
            </Typography>
            <IconButton onClick={handleCommentClick} sx={{ marginLeft: 2 }}>
              <Comment />
            </IconButton>
          </Box>
        </CardContent>
      )}

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

export default TravelArticleCard;
