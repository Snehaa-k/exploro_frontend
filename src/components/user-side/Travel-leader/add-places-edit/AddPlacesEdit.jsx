import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';

const EditPlaceModal = ({ open, onClose, place, onSave }) => {
  const [updatedPlace, setUpdatedPlace] = useState(place);

  const handleSave = () => {
    onSave(updatedPlace);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Place</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place Name"
              value={updatedPlace.placeName}
              onChange={(e) => setUpdatedPlace({ ...updatedPlace, placeName: e.target.value })}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPlaceModal;
