import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import Comment from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../../../axios-interceptors/AxiosInterceptors";
import CommentModal from "../../../../components/Posts/MainPost/CommentModal/CommentModal";
import EditPostModal from "./EditModal";
const LeadersPost = ({ post, likes, handleLike, onPostUpdate, fetchPosts }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const contentTypeId = 13;
        const response = await api.get("/commentview/", {
          params: {
            content_type: contentTypeId,
            object_id: post.id,
          },
        });
        if (response.status === 200) {
          setComments(response.data);
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [token, reload]);

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      const newComment = {
        text: comment,
        timestamp: new Date().toLocaleString(),
      };
      setComment("");
      handleCloseCommentModal();
      CommentSubmit(post.id, newComment);
    }
  };

  const CommentSubmit = async (postId, newComment) => {
    try {
      const contentTypeId = 13;
      const response = await api.post("/commentcreate/", {
        content_type: contentTypeId,
        object_id: postId,
        text: newComment,
      });

      if (response && response.status === 201) {
        console.log("Comment saved successfully:", response.data);
        setReload(!reload);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handlePostUpdate = async (updatedPost) => {
    try {
      const response = await api.put(
        `/edit-post-view/${post.id}/`,
        updatedPost,
      );
      if (response.status === 200) {
        console.log("Post updated successfully:", response.data);
        fetchPosts();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Box p={1} sx={{ margin: "10px auto" }}>
      <Card sx={{ width: "300px", margin: "0 auto", borderRadius: "8px" }}>
        {/* Post Image */}
        <CardMedia
          component="img"
          height="150"
          image={post.post_image}
          alt="Post Image"
        />

        {/* Post Description */}
        <CardContent>
          <Typography variant="body2" noWrap>
            {post.description}
          </Typography>

          {/* Like and Comment Section */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Box>
              <IconButton onClick={handleCommentClick}>
                <Comment />
              </IconButton>
            </Box>
            <Typography variant="caption" color="textSecondary">
              {likes || 0} likes
            </Typography>
          </Box>

          {/* Edit Button */}
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </Box>
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

        {/* Edit Post Modal */}
        <EditPostModal
          isOpen={isEditModalOpen}
          handleClose={handleCloseEditModal}
          post={post}
          onPostUpdate={handlePostUpdate}
        />
      </Card>
    </Box>
  );
};

export default LeadersPost;
