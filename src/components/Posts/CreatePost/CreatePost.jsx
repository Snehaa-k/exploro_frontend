import React, { useState } from 'react';
import { Box, TextField, Paper, IconButton, Avatar, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { PhotoCamera, Article, Send } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';
import PhotoModal from './PhotoModal'; // Import the new PhotoModal component

const CreatePost = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Text');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { content, postType, chosenEmoji, image };

    if (onPostSubmit) onPostSubmit(newPost);

    setContent(''); setPostType('Text'); setChosenEmoji(null); setImage(null);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setContent(content + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handlePhotoSubmit = ({ photo, description }) => {
    setImage(photo);
    setContent(description);
    setPostType('Photo');
  };

  return (
    <Paper sx={{ padding: 1.5, borderRadius: 2, boxShadow: 2, width: '600px', marginLeft: '450px', marginTop: '100px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Avatar sx={{ marginRight: 1, width: 30, height: 30 }} src="https://i.pravatar.cc/300" alt="User" />
        <TextField
          placeholder="Write something ..."
          variant="outlined"
          fullWidth
          multiline
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSubmit} size="small">
                <Send fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{ backgroundColor: '#f5f5f5', borderRadius: 1, fontSize: 12 }}
        />
      </Box>

      {/* Bottom row with post type selection and icons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, backgroundColor: '#e6f7ff', borderRadius: '0 0 8px 8px' }}>
        <Box>
          <IconButton onClick={() => setOpenModal(true)} size="small">
            <PhotoCamera fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <Article fontSize="small" />
          </IconButton>
        </Box>

        {/* Post Type Selection */}
        <FormControl sx={{ minWidth: 80 }}>
          <Select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Post Type' }}
            sx={{ width: 100, height: 30, fontSize: 12 }}
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Photo">Photo</MenuItem>
            <MenuItem value="Article">Article</MenuItem>
          </Select>
        </FormControl>

        {/* Emoji picker */}
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} size="small">
            😊
          </IconButton>
          {showEmojiPicker && (
            <Box sx={{ position: 'absolute', top: 25, right: 0, zIndex: 1 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          )}
        </Box>
      </Box>

     

      {/* Include the PhotoModal */}
      <PhotoModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onPhotoSubmit={handlePhotoSubmit}
      />
    </Paper>
  );
};

export default CreatePost;
