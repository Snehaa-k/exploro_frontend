import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Typography } from '@mui/material';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const AddPlaceModal = ({ open, onClose, onSave, tripId }) => {
  const [place_name, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [Transportation, setTransportation] = useState('');
  const [accomodation, setAccomodation] = useState('');
  const [image, setImage] = useState(null); // State for the image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview URL for the selected image
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL); // Set the preview URL for the image
    }
  };

  const handleAdd = async () => {
    setLoading(true);
    setError(null);

    // Create FormData to include the image file
    const formData = new FormData();
    formData.append('place_name', place_name);
    formData.append('description', description);
    formData.append('Transportation', Transportation);
    formData.append('accomodation', accomodation);
    formData.append('trip', tripId);
    formData.append('tripId', tripId);
    if (image) {
      formData.append('place_image', image); // Append the image file if it's selected
    }

    try {
      const response = await api.post('/addplaces/', formData)
      onSave(response.data);
      onClose();
      setPlaceName('');
      setDescription('');
      setAccomodation('');
      setTransportation('');
      setImage(null);
      setImagePreview(null); // Reset image preview after saving
    } catch (err) {
      console.error('Error saving place:', err);
      setError('Failed to save place.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Place</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place Name"
              value={place_name}
              onChange={(e) => setPlaceName(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Accommodation"
              value={accomodation}
              onChange={(e) => setAccomodation(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Transportation"
              value={Transportation}
              onChange={(e) => setTransportation(e.target.value)}
              variant="outlined"
              margin="normal"
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '16px' }}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div style={{ marginTop: '16px' }}>
                <Typography variant="subtitle1">Image Preview:</Typography>
                <img
                  src={imagePreview}
                  alt="Selected Place"
                  style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleAdd} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaceModal;
