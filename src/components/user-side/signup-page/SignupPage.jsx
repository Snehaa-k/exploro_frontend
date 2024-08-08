import React, { useState } from 'react'
import './Signup.css'
import { TextField,Button } from '@mui/material'
import OtpVerification from '../otp-veification/OtpVerification'
import { useNavigate } from 'react-router'


const SignupPage = () => {
    const [openOtpDialog, setOpenOtpDialog] = useState(false);
    const navigate  = useNavigate()
    const handleSignupClick = () => {
       
        setOpenOtpDialog(true);
      };
      const handleCloseOtpDialog = () => {
        setOpenOtpDialog(false); 
      };
      const handleOtpVerify = (otp) => {
    
        console.log('OTP Entered:', otp);
        handleCloseOtpDialog();
        navigate('/role-selection'); 
      };
  return (
    <div>
        <h4 className='text-container'>Sign Up</h4>
        <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '40px', 
        marginLeft: '125px', 
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
       }} id="outlined-basic" label="Enter  username" variant="outlined"  type='text' /><br/>
        <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '20px', 
        marginLeft: '125px', 
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
       }} id="outlined-basic" label="Enter Email Address" variant="outlined" type='email' /><br/>
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '20px', 
        marginLeft: '125px', 
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
       }} id="outlined-basic" label="Password" variant="outlined" type="password" /> <br/>
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '20px', 
        marginLeft: '125px', 
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
       }} id="outlined-basic" label="Confirm Password" variant="outlined" type="password" />   <br/>
        <Button sx={{
      position: 'fixed',
      marginTop: '45px',
      marginLeft: '210px',
      bgcolor: 'black'
      
    }} variant='contained' onClick={handleSignupClick}>SIGN UP</Button>

      <OtpVerification
        open={openOtpDialog}
        onClose={handleCloseOtpDialog}
        onVerify={handleOtpVerify}
      />
       
    </div>
  )
}

export default SignupPage