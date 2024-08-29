import React, { useState } from 'react';
import { Box, TextField, Paper, IconButton, Avatar, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { PhotoCamera, Article, Send } from '@mui/icons-material';
import EmojiPicker from 'emoji-picker-react';

const CreatePost = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Text'); // Default post type
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      content,
      postType,
      chosenEmoji,
      image,
    };

    if (onPostSubmit) {
      onPostSubmit(newPost);
    }

    setContent('');
    setPostType('Text');
    setChosenEmoji(null);
    setImage(null);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setContent(content + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 2 ,width:'600px',marginLeft:'450px',marginTop:'120px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Avatar sx={{ marginRight: 1 }} src="https://i.pravatar.cc/300" alt="User" />
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
              <IconButton onClick={handleSubmit}>
                <Send />
              </IconButton>
            ),
          }}
          sx={{ backgroundColor: '#f5f5f5', borderRadius: 1 }}
        />
      </Box>

      {/* Bottom row with post type selection and icons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, backgroundColor: '#e6f7ff', borderRadius: '0 0 8px 8px' }}>
        <Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-image">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <IconButton>
            <Article />
          </IconButton>
        </Box>

        {/* Post Type Selection */}
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Post Type' }}
            style={{width:'200px',height:'50px'}}
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Photo">Photo</MenuItem>
            <MenuItem value="Article">Article</MenuItem>
          </Select>
        </FormControl>

        {/* Emoji picker */}
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😊
          </IconButton>
          {showEmojiPicker && (
            <Box sx={{ position: 'absolute', top: '40px', right: '0', zIndex: 1 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Display selected image */}
      {image && (
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Selected Image: {image.name}
        </Typography>
      )}
    </Paper>
  );
};

export default CreatePost;
