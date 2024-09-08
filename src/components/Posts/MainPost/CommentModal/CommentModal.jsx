import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
const parseCommentText = (text) => {
  try {
    const jsonText = text.replace(/'/g, '"');
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error parsing comment text:', error);
    return { text: '', timestamp: '' };
  }
};


const CommentModal = ({
  isOpen,
  handleClose,
  comments,
  comment,
  setComment,
  handleCommentSubmit,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
      <List>
          {comments.length > 0 ? (
            comments.map((comment, index) => {
              const { text, timestamp } = parseCommentText(comment.text);
              return (
                <ListItem key={index} alignItems="flex-start">
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body1">{text}</Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: 'block', marginTop: '4px' }}
                    >
                      {new Date(timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })
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
  );
};

export default CommentModal;
