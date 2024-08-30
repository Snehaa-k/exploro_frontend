import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';

const EditTripModal = ({ open, onClose, trip, onSave }) => {
  const [updatedTrip, setUpdatedTrip] = useState(trip);

  const handleSave = () => {
    onSave(trip.id, updatedTrip);
    onClose();
  };

  const handleChange = (field, value) => {
    setUpdatedTrip({ ...updatedTrip, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Trip</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              value={updatedTrip.location}
              onChange={(e) => handleChange('location', e.target.value)}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          {/* Other fields for editing trip */}
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

export default EditTripModal;
