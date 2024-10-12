import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { Favorite, Comment } from "@mui/icons-material";
import api from "../../../axios-interceptors/AxiosInterceptors";
import "./MainPost.css";
import { API_URL } from "../../../apiservice/Apiservice";
import { useSelector } from "react-redux";

const MainPost = ({
  avatarUrl,
  name,
  role,
  postImage,
  article,
  imageLikes,
  articleLikes,
}) => {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const post = useSelector((state) => state.reducer);
  console.log(post, "hiii");

  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(posts, "my posts");

  const [articles, setArticle] = useState("");
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("accessToken");

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
        timestamp: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/viewposts/`);

        setPosts([response.data.posts]);
        setArticle([response.data.trip]);
      } catch (error) {
        console.error("Error fetching trips:", error.message);
      }
    };

    fetchPosts();
  }, [token]);

  // const handleAvatarClick = () => {
  //   navigate(`/userprofile/${posts.travel_leader}`);
  // };

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
    <Box p={2} sx={{ marginTop: "250px", marginX: "auto" }}>
      {posts &&
        posts.flat().map((post) => (
          <Card
            key={post.id}
            sx={{ marginBottom: 2, maxWidth: "100%", width: "480px" }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={avatarUrl || post.travelead_profile_image}
                alt={name}
                sx={{ marginRight: 2 }}
                // onClick={handleAvatarClick}
              />
              <Box>
                <Typography variant="h6">{post.travelead_username}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {"Travel Leader"}
                </Typography>
              </Box>
            </CardContent>

            {/* Article Content */}
            {/* {article && (
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
        )} */}

            {/* Post Image */}
            <CardMedia
              component="img"
              height="200"
              image={post.post_image}
              alt="Post Image"
            />
            <Typography variant="body1" style={{ marginLeft: "10px" }}>
              {post.description}
            </Typography>

            <CardContent
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <IconButton onClick={() => handleLike("image")}>
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
        ))}

      {/* Comment Modal */}
      <Dialog
        open={isCommentModalOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {/* Display Existing Comments */}
          <List>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="body1">{comment.text}</Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: "block", marginTop: "4px" }}
                    >
                      {comment.timestamp}
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
