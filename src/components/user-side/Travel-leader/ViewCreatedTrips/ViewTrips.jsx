import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import AddPlaceModal from '../add-places/AddPlace';
import EditTripModal from '../EditTrip/EditTrip';
import EditPlaceModal from '../add-places-edit/AddPlacesEdit';
import EditIcon from '@mui/icons-material/Edit';

// Styled components
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

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [addPlaceOpen, setAddPlaceOpen] = useState(false);
  const [editTripOpen, setEditTripOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [places, setPlaces] = useState([]);
  const [editPlaceOpen, setEditPlaceOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleAddTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
  };

  const handleEditTrip = (tripId, updatedTrip) => {
    setTrips(trips.map((trip) => (trip.id === tripId ? updatedTrip : trip)));
  };

  const handleAddPlace = (tripId) => {
    setSelectedTrip(tripId);
    setAddPlaceOpen(true);
  };

  const handleEditTripClick = (trip) => {
    setSelectedTrip(trip);
    setEditTripOpen(true);
  };

  const handleEditPlaceClick = (place) => {
    setSelectedPlace(place);
    setEditPlaceOpen(true);
  };

  return (
    <div>
      
      
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell>
                  <StyledImage src={trip.image} alt={trip.location} />
                </TableCell>
                <TableCell>{trip.location}</TableCell>
                <TableCell>{trip.participants}</TableCell>
                <TableCell>{trip.startDate}</TableCell>
                <TableCell>{trip.endDate}</TableCell>
                <TableCell>
                  <StyledButton variant="contained" onClick={() => handleEditTripClick(trip)}>
                    <EditIcon />
                  </StyledButton>
                  <StyledButton variant="contained" onClick={() => handleAddPlace(trip.id)}>
                    Add Place
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {selectedTrip && (
        <AddPlaceModal
          open={addPlaceOpen}
          onClose={() => setAddPlaceOpen(false)}
          onSave={(newPlace) => {
            // Handle saving the place to the trip
          }}
        />
      )}
      {selectedTrip && (
        <EditTripModal
          open={editTripOpen}
          onClose={() => setEditTripOpen(false)}
          trip={selectedTrip}
          onSave={handleEditTrip}
        />
      )}
      {selectedPlace && (
        <EditPlaceModal
          open={editPlaceOpen}
          onClose={() => setEditPlaceOpen(false)}
          place={selectedPlace}
          onSave={(updatedPlace) => {
            setPlaces(places.map((place) =>
              place.id === updatedPlace.id ? updatedPlace : place
            ));
          }}
        />
      )}
    </div>
  );
};

export default TripList;
