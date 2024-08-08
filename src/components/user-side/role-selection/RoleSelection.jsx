import { Button } from '@mui/material'
import React from 'react'
import './RoleSelection.css'

const RoleSelection = () => {
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
      
    }} variant='contained'>Traveller</Button>
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
     
      
    }} variant='contained'>
      <img src="" alt="" />
      <h5>Travel Leader</h5></Button>
      </div>
      </div>
        
    </div>
  )
}

export default RoleSelection