import React, { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import Comment from '@mui/icons-material/Comment';
import CommentModal from '../CommentModal/CommentModal';
import TravelLeaderCard from '../MainCard/MainCard';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const TravelPostCard = ({ post, likes, handleLike }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [comment, setComment] = useState('');

    const [comments, setComments] = useState([]);
    const [like,setLike] = useState(post.likes)
    console.log(like,"kiess");
    console.log(post,"my postsss")
    console.log(comments,"comments")
    const [reload,setload] = useState(false)
    
    const isUser = like.includes(post.travel_leader)
    console.log(isUser,"hai user");

    useEffect(() => {
      const fetchComments = async () => {
          try {
              const contentTypeId = 13; 
              const response = await api.get('/commentview/', {
                  params: {
                      content_type: contentTypeId,
                      object_id: post.id,
                  },
              });
              if (response.status === 200) {
                  setComments(response.data);
              } else {
                  console.error('Unexpected response:', response);
              }
          } catch (error) {
              console.error('Error fetching comments:', error);
          }
      };

      fetchComments();
  }, [reload]);
    
    
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
        // setComments([...comments, newComment]);
        setComment('');
        handleCloseCommentModal();
        CommentSubmit(post.id, newComment);

      }
    };


    const CommentSubmit = async(postId, newComment) => {
      try {
        const contentTypeId = 13
        
        const response = await api.post('/commentcreate/', {
          content_type: contentTypeId,
          object_id: postId,
          text: newComment,
        });
    
        if (response && response.status === 201) {
          console.log('Comment saved successfully:', response.data);
          setload(true)
        } else {
          console.error('Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error saving comment:', error);
      }
  }

    const handleLikeClick = () => {
      let updatedLikes;

      if (isUser) {
          updatedLikes = like.filter(id => id !== post.travel_leader);
      } else {
          updatedLikes = [...like, post.travel_leader];
      }

      setLike(updatedLikes); // Update local like state
      handleLike(post.id);    // Call parent function to update global state
  };
  
    return (
      <Box p={2} sx={{ marginTop: '250px', marginX: 'auto' }}>

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
            <IconButton onClick={handleLikeClick}>
            <Favorite sx={{ color: isUser ? 'red' : 'grey' }} />
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
