import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddPlaceModal from '../add-places/AddPlace';
import EditTripModal from '../EditTrip/EditTrip';
import EditPlaceModal from '../add-places-edit/AddPlacesEdit';
import ViewPlacesModal from '../add-places/ViewPlaces'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../../axios-interceptors/AxiosInterceptors';
import { useNavigate } from 'react-router';
import { API_URL } from '../../../../apiservice/Apiservice';

const StyledTableContainer = styled(TableContainer)({
  maxWidth: '100%',
  overflowX: 'auto',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const StyledImage = styled('img')({
  width: '100px',
  height: '60px',
  objectFit: 'cover',
});

const PlaceholderImage = styled('img')({
  width: '200px',
  height: '150px',
  objectFit: 'cover',
  margin: '20px auto',
  display: 'block',
});

const TripList = () => {
  const [plans, setPlans] = useState([]);
  const [trip, setTrips] = useState([]);
  const [addPlaceOpen, setAddPlaceOpen] = useState(false);
  const [editTripOpen, setEditTripOpen] = useState(false);
  const [viewPlacesOpen, setViewPlacesOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [places, setPlaces] = useState([]);
  const [editPlaceOpen, setEditPlaceOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedId, setSelectedID] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  console.log(plans);
  

  const handleAddTrip = (newTrip) => {
    setTrips([...trip, newTrip]);
  };

  const handleEditTrip = (tripId, updatedTrip) => {
    setTrips(trip.map((trip) => (trip.id === tripId ? updatedTrip : trip)));
  };

  const handleAddPlace = (tripId) => {
    console.log('handleAddPlace called with tripId:', tripId); 
    setSelectedID(tripId);

    setAddPlaceOpen(true);
  };
  console.log(selectedTrip);
  
  const handleEditTripClick = (trip) => {
    setSelectedTrip(trip);
    setEditTripOpen(true);
  };

  const handleEditPlaceClick = (place) => {
    setSelectedPlace(place);
    setEditPlaceOpen(true);
  };

  const handleViewPlacesClick = (trip) => {
    setSelectedTrip(trip);
    setViewPlacesOpen(true);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setTrips(trip.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error('Error deleting trip:', error.message);
      setError('Error deleting trip');
    }
  };

  const handleNavigate = () => {
    navigate('/triplan');
  };

 

  useEffect(() => {
    const fetchTrips = async () => {
      if (!token) {
        setError("profile not found");
        return;
      }
      try {
        const response = await api.get(`/viewtrip/`);
        setPlans([response.data.trip]);
      } catch (error) {
        setError('Error fetching trips');
        console.error('Error fetching trips:', error.message);
      }
    };

  fetchTrips();
  }, [editTripOpen]);

  return (
    <div>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Accommodation</TableCell>
              <TableCell>Transportation</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {plans && (
            <TableBody>
              {plans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <PlaceholderImage src="path_to_placeholder_image" alt="No trips available" />
                    <div>No trips available</div>
                    <StyledButton variant="contained" onClick={handleNavigate}>
                      Create Trip
                    </StyledButton>
                  </TableCell>
                </TableRow>
              ) : (
                plans.flat().map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>
                      <StyledImage src={trip.Trip_image} alt={trip.location} />
                    </TableCell>
                    <TableCell>{trip.location}</TableCell>
                    <TableCell>{trip.accomodation}</TableCell>
                    <TableCell>{trip.transportation}</TableCell>
                    <TableCell>{trip.participant_limit}</TableCell>
                    <TableCell>{trip.amount}</TableCell>
                    <TableCell>{trip.start_date}</TableCell>
                    <TableCell>{trip.end_date}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditTripClick(trip)}>
                        <EditIcon />
                      </IconButton>
                      <StyledButton variant="contained" onClick={() => handleAddPlace(trip.id)}>
                        Add Place
                      </StyledButton>
                      <StyledButton variant="contained" onClick={() => handleViewPlacesClick(trip.id)}>
                        View Places
                      </StyledButton>
                      <IconButton onClick={() => handleDeleteTrip(trip.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </StyledTable>
      </StyledTableContainer>
      
      <AddPlaceModal
        open={addPlaceOpen}
        onClose={() => setAddPlaceOpen(false)}
        onSave={(newPlace) => {
          setPlaces([...places, newPlace]);
          setAddPlaceOpen(false);
        }}
        tripId={selectedId}
      />

      {selectedTrip && (
        <EditTripModal
          open={editTripOpen}
          onClose={() => setEditTripOpen(false)}
          trip={selectedTrip}
          onSave={handleEditTrip}
        />
      )}

      {selectedTrip && (
        <ViewPlacesModal
          open={viewPlacesOpen}
          onClose={() => setViewPlacesOpen(false)}
          trip={selectedTrip}
          onEditPlace={handleEditPlaceClick}
        />
      )}

      {selectedPlace && (
        <EditPlaceModal
          open={editPlaceOpen}
          onClose={() => setEditPlaceOpen(false)}
          place={selectedPlace}
          onSave={(updatedPlace) => {
            setPlaces(
              places.map((place) =>
                place.id === updatedPlace.id ? updatedPlace : place
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default TripList;
