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
import { format, isAfter } from 'date-fns';
import Swal from 'sweetalert2';

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

  const today = format(new Date(), 'yyyy-MM-dd');

  const handleAddTrip = (newTrip) => {
    setTrips([...trip, newTrip]);
  };

  const handleEditTrip = (tripId, updatedTrip) => {
    setTrips(trip.map((trip) => (trip.id === tripId ? updatedTrip : trip)));
  };

  const handleAddPlace = (tripId) => {
    setSelectedID(tripId);
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

  const handleViewPlacesClick = (trip) => {
    setSelectedTrip(trip);
    setViewPlacesOpen(true);
  };

  const handleDeleteTrip = async (tripId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel the trip?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    });

    if (result.isConfirmed) {
      try {
        await api.post(`/trip_cancel/${tripId}`);
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
        Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'The trip has been canceled.',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error('Error canceling trip:', error.message);
        setError('Error canceling trip');
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was a problem canceling the trip.',
        });
      }
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
  }, [editTripOpen, trip]);

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
              <TableCell>Duration</TableCell>
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
                plans.flat().map((trip) => {
                  const isCompleted = isAfter(new Date(today), new Date(trip.end_date));
                  const isCancelled = trip.is_completed === "cancelled";

                  return (
                    <TableRow key={trip.id}>
                      <TableCell>
                        <StyledImage src={trip.Trip_image} alt={trip.location} />
                      </TableCell>
                      <TableCell>{trip.location}</TableCell>
                      <TableCell>{trip.accomodation}</TableCell>
                      <TableCell>{trip.transportation}</TableCell>
                      <TableCell>{trip.participant_limit}</TableCell>
                      <TableCell>{trip.duration}</TableCell>
                      <TableCell>{trip.amount}</TableCell>
                      <TableCell>{trip.start_date}</TableCell>
                      <TableCell>{trip.end_date}</TableCell>
                      <TableCell>
                        {isCancelled ? (
                          <div style={{color:'red'}}>Cancelled</div>
                        ) : isCompleted ? (
                          <div >Completed</div>
                        ) : (
                          <>
                            <IconButton onClick={() => handleEditTripClick(trip)}>
                              <EditIcon />
                            </IconButton>
                            <StyledButton variant="contained" onClick={() => handleAddPlace(trip.id)}>
                              Add Place
                            </StyledButton>
                            <StyledButton variant="contained" onClick={() => handleViewPlacesClick(trip)}>
                              View Places
                            </StyledButton>
                            <IconButton onClick={() => handleDeleteTrip(trip.id)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
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
