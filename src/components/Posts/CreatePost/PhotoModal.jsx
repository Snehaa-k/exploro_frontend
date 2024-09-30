import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton ,InputLabel,FormControl,Select,MenuItem} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { createPosts } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { setUser } from '../../../redux/reducers/authReducers';
import { useNavigate } from 'react-router';

const PhotoModal = ({ open, handleClose, onPhotoSubmit ,setReloadPosts}) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [destinationType, setDestinationType] = useState(''); 
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate()

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {

      setPhoto(file); 
      setPhotoPreview(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async() => {
   
      const formData = new FormData();
      formData.append('post_image', photo);
      formData.append('description', description);
      formData.append('type_of_trip', destinationType);
  
      const response = await dispatch(createPosts(formData));
      
      
      if(response){

    Swal.fire({
      icon: 'success',
      title: 'Post created sucussfully',
      text: 'Redirecting to home',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      navigate('/posts');
    });
    setReloadPosts((prev) => !prev);
  } 
      handleClose();
      setPhoto(null);
      setDescription('');
      setDestinationType(''); 
  
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
            src={photoPreview}
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
         {/* <FormControl fullWidth >
          <InputLabel id="destination-type-label">Preferred Destination Type</InputLabel>
          <Select
            labelId="destination-type-label"
            onChange={(e) => setDestinationType(e.target.value)}
            label="Preferred Destination Type"
          >
            <MenuItem value="Adventures">Adventures</MenuItem>
            <MenuItem value="Natural Wonders">Natural Wonders</MenuItem>
            <MenuItem value="Cultural Experiences">Historical Sites</MenuItem>
            <MenuItem value="Beaches">Famous Cities</MenuItem>
            <MenuItem value="Mountains">Hilly areas</MenuItem>
          </Select>
        </FormControl> */}

        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} style={{marginTop:'2px'}}>
          Add Post
        </Button>
      </Box>
    </Modal>
  );
};

export default PhotoModal;
