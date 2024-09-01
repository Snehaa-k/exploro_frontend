import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import api from '../../../../axios-interceptors/AxiosInterceptors';

const AddPlaceModal = ({ open, onClose, onSave, tripId }) => {
  const [place_name, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [Transportation, setTransportation] = useState('');
  const [accomodation, setAccomodation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
 
  const handleAdd = async () => {
    setLoading(true);
    setError(null);

    const placeData = {
      place_name,
      description,
      Transportation,
      accomodation,
      trip:tripId,
      tripId,
    };

    try {
      const response = await api.post('/addplaces/', placeData);
      onSave(response.data); 
      onClose();
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
            /> <TextField
            fullWidth
            label="Transportation"
            value={Transportation}
            onChange={(e) => setTransportation(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlaceModal;
