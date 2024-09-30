import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Collapse,
  IconButton,
  Grid,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';
import api from '../../../../axios-interceptors/AxiosInterceptors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashBoard = () => {
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [openRows, setOpenRows] = useState({});
  
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/trip_details/');
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };
    
    fetchTrips();
  }, []);

  const completedTrips = trips.filter(trip => trip.is_completed === 'completed').length;
  const ongoingTrips = trips.length - completedTrips;

  const data = {
    labels: ['Completed Trips', 'Ongoing Trips'],
    datasets: [{
      label: 'Trips Data',
      data: [completedTrips, ongoingTrips],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    }],
  };

  const handleToggleRow = (tripId) => {
    setOpenRows(prev => ({ ...prev, [tripId]: !prev[tripId] }));
  };

  const paginatedTrips = trips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item><h4 style={{ marginTop: '-20px' }}>Travel Leader Dashboard</h4></Grid>
      <Grid item style={{ width: '100%', maxWidth: '600px', marginBottom: '40px' }}>
        <Bar data={data} options={{ maintainAspectRatio: false }} height={200} />
      </Grid>
      <Grid item style={{ width: '100%', maxWidth: '900px', marginTop: '-30px' }}>
        <TableContainer component={Paper}>
          <Table aria-label="trip details">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontWeight: 'bold' }}>Trip Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Booked Users</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total Seats</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Start Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>End Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total Earnings ($)</TableCell>               
                  <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Amount Returned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { paginatedTrips?.map(trip => (
                <React.Fragment key={trip.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton onClick={() => handleToggleRow(trip.id)}>
                        {openRows[trip.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell>{trip.location} - {trip.trip_type}</TableCell>
                    <TableCell>{trip.booked_customers.length}</TableCell>
                    <TableCell>{trip.participant_limit}</TableCell>
                    <TableCell>{trip.start_date}</TableCell>
                    <TableCell>{trip.end_date}</TableCell>
                    <TableCell>{trip.booked_customers.length * trip.amount}</TableCell>
                    {/* Updated trip status logic */}
                    <TableCell>
                      {trip.is_completed === 'completed' ? 'Completed' : trip.is_completed === 'cancelled' ? 'Cancelled' : 'Ongoing'}
                    </TableCell>
                    <TableCell>{trip.amount_returned ? 'Returned' : 'Not Returned'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={openRows[trip.id]} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="booked-customers" style={{ marginLeft: '140px', marginTop: '20px' }}>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                              <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                              <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                              <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {trip.booked_customers.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={4} align="center">No customers booked</TableCell>
                              </TableRow>
                            ) : (
                              trip.booked_customers.map(customer => (
                                <TableRow key={customer.id}>
                                  <TableCell>{customer.user_username}</TableCell>
                                  <TableCell>{customer.user_email}</TableCell>
                                  <TableCell>{customer.amount}</TableCell>
                                  {/* Updated customer status logic */}
                                  <TableCell>
                                    {customer.status === 'completed'
                                      ? 'Confirmed'
                                      : customer.status === 'trip_cancelled'
                                      ? 'Trip Cancelled by Leader'
                                      : 'Cancelled'}
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item style={{ marginTop: '3px' }}>
        <TablePagination
          component="div"
          count={trips.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          rowsPerPageOptions={[4, 10, 25]}
        />
      </Grid>
    </Grid>
  );
};

export default DashBoard;
