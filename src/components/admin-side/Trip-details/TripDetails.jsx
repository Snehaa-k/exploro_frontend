import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Collapse, IconButton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import AdminHome from '../Common/AdminHome';
import { useNavigate, useParams } from 'react-router';
import { API_URL } from '../../../apiservice/Apiservice';
import axios from 'axios';
import moment from 'moment';

const TripDetails = () => {
   const { id } = useParams();
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(4);
   const [details, setDetails] = useState([]);
   const [openRows, setOpenRows] = useState({});
   console.log(details);

   const navigate = useNavigate();

   useEffect(() => {
      axios.get(`${API_URL}/adminviewtrip/${id}`)
         .then(response => {
            setDetails(response.data);
         })
         .catch(error => {
            console.error('Error fetching details:', error);
         });
   }, [id]);

   const isTripCompleted = (endDate) => {
      const today = moment();
      const tripEndDate = moment(endDate);
      return tripEndDate.isBefore(today);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleToggleRow = (tripId) => {
      setOpenRows(prev => ({ ...prev, [tripId]: !prev[tripId] }));
   };

   const paginatedTrips = details.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

   // Function to calculate the total amount for non-cancelled customers
   const calculateTotalAmount = (trip) => {
      const nonCancelledCustomers = trip.booked_customers.filter(
         (customer) => customer.status !== 'cancelled'
      );
      return Number.isFinite(trip.amount) && nonCancelledCustomers.length > 0
         ? trip.amount * nonCancelledCustomers.length
         : 0;
   };

   return (
      <>
         <AdminHome />
         <div style={{ textAlign: 'center', marginTop: '-350px' }}>
            <Typography variant='h4' style={{ fontWeight: 'bold' }}>Trip Details</Typography>
         </div>
         <div>
            <TableContainer component={Paper} style={{ width: '70%', margin: '50px auto', marginLeft: '350px' }}>
               <Table aria-label="simple table">
                  <TableHead>
                     <TableRow>
                        <TableCell />
                        <TableCell style={{ fontWeight: 'bold' }}>Location</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Start Date</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>End Date</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Amount</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Booked Customers</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Payment</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {paginatedTrips.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={7} align="center">
                              No trips available
                           </TableCell>
                        </TableRow>
                     ) : (
                        paginatedTrips.map((trip) => (
                           <React.Fragment key={trip.id}>
                              <TableRow>
                                 <TableCell>
                                    <IconButton onClick={() => handleToggleRow(trip.id)}>
                                       {openRows[trip.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                 </TableCell>
                                 <TableCell component="th" scope="row">{trip.location}</TableCell>
                                 <TableCell>{new Date(trip.start_date).toLocaleDateString()}</TableCell>
                                 <TableCell>{new Date(trip.end_date).toLocaleDateString()}</TableCell>
                                 <TableCell>Rs {trip.amount}</TableCell>
                                 {isTripCompleted(trip.end_date) ? 
                                    <TableCell>Trip Completed</TableCell> : 
                                    <TableCell>{trip.is_completed ? 'Ongoing' : 'Planned'}</TableCell>}
                                 <TableCell>{trip.booked_customers.length}</TableCell>
                                 <TableCell>{calculateTotalAmount(trip)}</TableCell>
                                 <TableCell>
                                    <Button variant="contained">Refund</Button>
                                 </TableCell>
                              </TableRow>

                              {/* Collapse row to show booked customer details */}
                              <TableRow>
                                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                    <Collapse in={openRows[trip.id]} timeout="auto" unmountOnExit>
                                       <Table size="small" aria-label="booked-customers" style={{ marginLeft: '50px', marginTop: '20px' }}>
                                          <TableHead>
                                             <TableRow>                                         
                                                <TableCell style={{ fontWeight: 'bold' }}>Payment Id</TableCell>


                                                <TableCell style={{ fontWeight: 'bold' }}>Customer Name</TableCell>

                                                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>

                                                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Payment Type</TableCell>


                                             </TableRow>
                                          </TableHead>
                                          <TableBody>
                                             {trip.booked_customers.length === 0 ? (
                                                <TableRow>
                                                   <TableCell colSpan={4} align="center">
                                                      No one booked
                                                   </TableCell>
                                                </TableRow>
                                             ) : (
                                                trip.booked_customers.map((customer) => (
                                                   <TableRow key={customer.id}>
                                                      <TableCell>{customer.id}</TableCell>

                                                      <TableCell>{customer.user_username}</TableCell>
                                                      <TableCell>{customer.user_email}</TableCell>
                                                      <TableCell>{customer.status}</TableCell>
                                                      <TableCell>{customer.payment_type}</TableCell>
                                                   </TableRow>
                                                ))
                                             )}
                                          </TableBody>
                                       </Table>
                                    </Collapse>
                                 </TableCell>
                              </TableRow>
                           </React.Fragment>
                        ))
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               component="div"
               count={details.length}
               page={page}
               onPageChange={handleChangePage}
               rowsPerPage={rowsPerPage}
               onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
               style={{ marginLeft: '12px' }}
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '16px',
                  marginLeft: '10px',
                  '& .MuiTablePagination-select': {
                     backgroundColor: '#f5f5f5',
                     borderRadius: '4px',
                  },
                  '& .MuiTablePagination-actions': {
                     '& .MuiIconButton-root': {
                        color: '#1976d2',
                     },
                  },
               }}
            />
         </div>
      </>
   );
};

export default TripDetails;
