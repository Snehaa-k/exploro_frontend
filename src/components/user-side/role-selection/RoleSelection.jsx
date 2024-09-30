import { Button } from '@mui/material'
import React from 'react'
import './RoleSelection.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectRole } from '../../../redux/actions/authActions'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { setUser } from '../../../redux/reducers/authReducers'


const RoleSelection = () => {
 
  const users = useSelector((state) => state.reducer.user);
  if (!users) {
    return <div>Loading...</div>; 
  }
  const email = users.user.user.email
  // const email = users?.user?.email || ''; 
  // const email = "bella04@gmail.com"
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleRoleSelection = (role)=>{
     
    dispatch(selectRole({ email,role:role })).then((response) => {
     
      console.log(response,"role selection")
      if (response) {
        // dispatch(setUser(response.payload.user))
        console.log(response.payload.user)
        Swal.fire({
          icon: 'success',
          title: 'Successfully selected',
          text: 'Redirecting to appropriate page ',
          timer: 2000, 
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          if(role =="traveller"){
            navigate('/userpreference');
          }
          else if(role =="travel_leader"){
            navigate('/formsubmission');
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'selection Failed',
              text: 'selection failed. Please try again.',
            });
            navigate('/role-selection')
          }
         
        });
          
        
      } else {
        console.error('Error selecting role:', response.error || 'Unknown error');
        Swal.fire({
          icon: 'error',
          title: 'selection Failed',
          text: 'selection failed. Please try again.',
        });
       
      }
    }).catch((error) => {
      console.error('Error:', error);
    });

  }
  return (
    <div className='role-container'>
      <div className='role-container1'>

        <h5 style={{textAlign:'center',marginTop:'35px'}}>What role would you like to take on?</h5>
        <img className='image1-container' src="image/role.jpg" />
      
      <div>
      <Button sx={{
        color:'green',
        width : '150px',
        height:'150px',
      position: 'fixed',
      marginTop: '45px',
      marginLeft: '300px',
      bgcolor: '#BBF2E8'
      
    }} variant='contained' onClick={()=>handleRoleSelection("traveller")} >Traveller</Button>
      </div>
      <div className='role-container1'>
      <Button sx={{
        color:'green',
        width : '150px',
        height:'150px',
      position: 'fixed',
      marginTop: '45px',
      marginLeft: '70px',
      bgcolor: '#BBF2E8',
      
      
    }} variant='contained' onClick={()=>handleRoleSelection("travel_leader")} >
      <img src="" alt="" />
      <h5>Travel Leader</h5></Button>
      </div>
      </div>
        
    </div>
  )
}

export default RoleSelection