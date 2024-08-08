import React from 'react'
import './Login.css'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const Login = () => {


  return (
    <div>
     
        <h4 className='text-container'>LOGIN</h4>
        <input type="text" placeholder='goolge' className='inputfeild' style ={{marginTop:'40px', marginLeft:'180px'}} />
        <h6 style={{marginTop:'30px',marginLeft:'240px'}}>OR</h6>
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '40px', 
        marginLeft: '130px', 
        marginRight: '-150px', 
        // display: 'block',
        '& .MuiInputBase-input': {
          height: '30px',
          padding: '10px',
          fontSize: '14px',
        },
        '& .MuiFormLabel-root': {
          fontSize: '15px',
        },
       }} id="outlined-basic" label="Enter your email" variant="outlined"  type='email' /> 
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '20px', 
        marginLeft: '130px', 
        marginRight: '-150px', 
        // display: 'block'
        '& .MuiInputBase-input': {
          height: '30px',
          padding: '10px',
          fontSize: '14px',
        },
        '& .MuiFormLabel-root': {
          fontSize: '15px',
        },
       }} id="outlined-basic" label="Password" variant="outlined" type="password" />   <br/>
        <Button sx={{
      position: 'fixed',
      marginTop: '45px',
      marginLeft: '220px',
      bgcolor: 'black'
      
    }} variant='contained'>LOGIN</Button>
       
      </div>
      
      
    
  )
}

export default Login