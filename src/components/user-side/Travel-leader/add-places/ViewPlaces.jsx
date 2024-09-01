import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditPlaceModal from '../add-places-edit/AddPlacesEdit'; 
import api from '../../../../axios-interceptors/AxiosInterceptors'; // Ensure correct path
import { useNavigate } from 'react-router';

const ViewPlacesModal = ({ open, onClose, trip, onPlaceUpdated, onPlaceDeleted }) => {
  console.log(trip);
  
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const [editPlaceOpen, setEditPlaceOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  console.log(places);
  

  useEffect(() => {
    if (open && trip) {
      fetchPlaces();
    }
    
  }, [open, trip]);

  const fetchPlaces = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/viewplaces/${trip}/`); 
      setPlaces([response.data.trip]); 
    } catch (err) {
      console.error('Error fetching places:', err);
      setError('Failed to load places.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (place) => {
    setSelectedPlace(place);
    setEditPlaceOpen(true);
  };

//   const handleDeleteClick = async (placeId) => {
//     if (!window.confirm('Are you sure you want to delete this place?')) return;
//     try {
//       await api.delete(`/places/${placeId}`); // Adjust endpoint as needed
//       setPlaces(places.filter((place) => place.id !== placeId));
//       if (onPlaceDeleted) onPlaceDeleted(placeId);
//     } catch (err) {
//       console.error('Error deleting place:', err);
//       setError('Failed to delete place.');
//     }
//   };

  const handleEditSave = async (updatedPlace) => {
    try {
      const response = await api.put(`/places/${updatedPlace.id}`, updatedPlace); 
      setPlaces(
        places.map((place) => (place.id === updatedPlace.id ? response.data.place : place))
      );
      if (onPlaceUpdated) onPlaceUpdated(response.data.place);
      setEditPlaceOpen(false);
      setSelectedPlace(null);
    } catch (err) {
      console.error('Error updating place:', err);
      setError('Failed to update place.');
    }
  };

  const handleAddPlace = (newPlace) => {
    setPlaces([...places, newPlace]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Places for {trip?.location}</DialogTitle>
      {places && (<DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : places.length === 0 ? (
          <Typography>No places added yet.</Typography>
        ) : (
          places.map((place) => (
            <Grid
              container
              spacing={2}
              key={place.id}
              alignItems="center"
              style={{ marginBottom: '10px' }}
            >
              <Grid item xs={10}>
                <Typography variant="h6">{place.place_namee}</Typography>
                <Typography variant="body2"><strong>Description:</strong> {place.description}</Typography>
                <Typography variant="body2"><strong>Accommodation:</strong> {place.accommodation}</Typography>
                <Typography variant="body2"><strong>Transportation:</strong> {place.transportation}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleEditClick(place)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(place.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}
      </DialogContent>)}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      {/* Edit Place Modal */}
      {selectedPlace && (
        <EditPlaceModal
          open={editPlaceOpen}
          onClose={() => {
            setEditPlaceOpen(false);
            setSelectedPlace(null);
          }}
          place={selectedPlace}
          onSave={handleEditSave}
        />
      )}
    </Dialog>
  );
};

export default ViewPlacesModal;
