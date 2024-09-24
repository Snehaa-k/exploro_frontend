import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, TablePagination } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyTrips = [
  { id: 1, tripName: 'Paris Adventure', bookedUsers: 10, totalSeats: 20, amountReceived: 2000, completed: true },
  { id: 2, tripName: 'Beach Escape', bookedUsers: 5, totalSeats: 15, amountReceived: 1000, completed: false },
  { id: 3, tripName: 'Mountain Hiking', bookedUsers: 8, totalSeats: 12, amountReceived: 1500, completed: true },
  { id: 4, tripName: 'City Lights Tour', bookedUsers: 12, totalSeats: 15, amountReceived: 2500, completed: false },
];

const DashBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const completedTrips = dummyTrips.filter(trip => trip.completed).length;
  const totalTrips = dummyTrips.length;

  const data = {
    labels: ['Completed Trips', 'Total Trips Created'],
    datasets: [
      {
        label: 'Trips Data',
        data: [completedTrips, totalTrips],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedTrips = dummyTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Travel Leader Dashboard</h2>

        {/* Chart for completed trips vs total trips */}
        <div style={{ width: '60%', margin: '0 auto', marginBottom: '30px' }}>
          <Bar data={data} />
        </div>

        {/* Table for trip details */}
        <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Trip Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Booked Users</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Total Seats</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Amount Received ($)</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTrips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>{trip.tripName}</TableCell>
                  <TableCell>{trip.bookedUsers}</TableCell>
                  <TableCell>{trip.totalSeats}</TableCell>
                  <TableCell>{trip.amountReceived}</TableCell>
                  <TableCell>{trip.completed ? 'Completed' : 'Ongoing'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={dummyTrips.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          // onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </>
  );
};

export default DashBoard;
