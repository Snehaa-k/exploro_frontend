import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TablePagination, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminHome from '../Common/AdminHome';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchLeaders } from '../../../redux/actions/authActions';




const Request = () => {
   const dispatch = useDispatch()
   const leaders = useSelector((state)=>state.reducer.user.leaders)
   console.log(leaders,"leadders")
   const id = leaders.id
   console.log(id)
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(4);
   console.log(leaders)

   const navigate = useNavigate()
   
   useEffect(() => {
    dispatch(fetchLeaders());
    
  }, [dispatch]);

  const handledetails = (id)=>{
        console.log(id)
        navigate(`/request/${id}`)
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const paginatedUsers = leaders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <>
    <AdminHome/>
    {/* <h2 style={{ textAlign: 'center', margin: '-20px 0' }}>Travel Leader Requests</h2> */}
    <div style={{ textAlign: 'center', marginTop: '-350px' }}>
        <Typography variant='h4' style={{ fontWeight: 'bold' }}>Requests</Typography>
      </div>
    
    <div>
        
        <TableContainer component={Paper} style={{ width: '70%', margin: '50px auto' ,marginLeft:'350px'}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>User Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((leader) => (
            <TableRow key={leader.id}>
              <TableCell component="th" scope="row">
                <AccountCircleIcon style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                {leader.user_id.username}
              </TableCell>
              <TableCell>{leader.user_id.email}</TableCell>
              <TableCell> {leader.is_approved === 'pending' ? <h4  style={{color:'#FABC3F'}}> Pending </h4>:
                     leader.is_approved === 'accepted' ?  <h4 className='text-warning' style={{color:'green'}}> Accepted </h4> :
                     leader.is_approved === 'rejected' ? <h4 style={{color:'red'}}>Rejected</h4>:
                     'Unknown'}</TableCell>
              <TableCell>
                
              {leader.is_approved === "pending" && (
                      <Button 
                        variant="contained" 
                        color={leader.status === 'Block' ? 'error' : 'success'} 
                        onClick={() => handledetails(leader.id)}
                      >
                        View Details
                      </Button>
                    )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
          component="div"
          count={leaders.length}  
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
         style={{marginLeft:'12px'}}   sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '16px',
          marginLeft:'10px',
          '& .MuiTablePagination-select': {
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          },
          '& .MuiTablePagination-actions': {
            '& .MuiIconButton-root': {
              color: '#1976d2',  
            },
          },
        }}/>
    </div>
    </>
  )
}

export default Request