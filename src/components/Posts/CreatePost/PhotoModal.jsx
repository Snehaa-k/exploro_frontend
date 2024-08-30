import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const PhotoModal = ({ open, handleClose, onPhotoSubmit }) => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file)); // Show preview of the image
    }
  };

  const handleSubmit = () => {
    if (onPhotoSubmit) {
      onPhotoSubmit({ photo, description });
    }
    handleClose();
    setPhoto(null);
    setDescription('');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ padding: 4, backgroundColor: '#fff', margin: '10% auto', maxWidth: '400px', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add a Photo and Description
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: 200,
            backgroundColor: '#f0f0f0',
            borderRadius: 2,
            border: '1px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {photo ? (
            <img
              src={photo}
              alt="Uploaded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
              }}
            />
          ) : (
            <IconButton
              component="label"
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 1,
                padding: 2,
                zIndex: 1,
              }}
            >
              <PhotoCamera fontSize="large" />
              <input
                accept="image/*"
                type="file"
                onChange={handlePhotoChange}
                hidden
              />
            </IconButton>
          )}
        </Box>

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
          Add Post
        </Button>
      </Box>
    </Modal>
  );
};

export default PhotoModal;
