import React, { useState } from 'react'
import './Signup.css'
import { TextField,Button,Box,LinearProgress } from '@mui/material'
import {Bounce, toast} from 'react-toastify'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/actions/authActions';
import { setUser } from '../../../redux/reducers/authReducers';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner'









const SignupPage = () => {
   
    const navigate  = useNavigate()
    const [loading, setLoading] = useState(false);
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()

    
    
    
    const validate = ()=>{
      const newErrors = {};
      if (!username.trim()) newErrors.username = 'Username is required';
      if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid Email Address';
    
      if (password.length < 4) newErrors.password = 'Password must be at least 6 characters long';
      if (password !=password2) newErrors.password2 = 'password does not matches';
      setErrors(newErrors);
    
      return Object.keys(newErrors).length === 0;

    }
    
  
    const handleSignupClick = async (e) => {
      e.preventDefault();
      
        
      if(validate()){
        setLoading(true);
        try {
          const response = await dispatch(registerUser({ username, email, password, password2 })).unwrap();
          dispatch(setUser(response));
          
          console.log(response,"user data")
          const res = response.user
         
         
          if (response){
           
           Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'Redirecting to home page...',
            timer: 2000, 
            timerProgressBar: true,
            showConfirmButton: false
          }).then(() => {
            navigate('/otp-verification');
          });
            
        }
        } catch (error) {
          console.error('Registration error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Registration failed. Please try again.',
          }).then(() => {
            navigate('/signup'); 
          });
          setLoading(false)
         
        } finally {
          setLoading(flase);
        }
      }
      };
     
     
  return (
    <div>
        <h4 className='text-container'>Sign Up</h4>
        <Box
      component="form"
      sx={{
        marginTop:'40px',
        '& .MuiTextField-root': { m: 1, width:{ xs: '100%', md: '280px' }},
        display: 'flex',
        
        flexDirection: 'column',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSignupClick}

    >
      
        <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
       marginTop: '0px', 
       marginLeft: 'auto', 
       marginRight: 'auto', 
        // display: 'block',
        '& .MuiInputBase-input': {
          height: '30px',
          padding: '10px',
          fontSize: '14px',
        },
        '& .MuiFormLabel-root': {
          fontSize: '15px',
        },
       }} id="outlined-basic" value={username} onChange={(e)=>{setUsername(e.target.value)}}   label="Enter  username" variant="outlined"  type='text' error={!!errors.username}
       helperText={errors.username}  />
       
        <TextField  sx={{
    
       width: { xs: '100%', md: '280px' },
        marginTop: '10px', 
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
       }} id="outlined-basic" value={email} label="Enter Email Address" variant="outlined"  onChange={(e)=>setEmail(e.target.value)} type='email' error={!!errors.email}
       helperText={errors.email} />
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '10px', 
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
       }} id="outlined-basic"  value={password} label="Password" variant="outlined" onChange={(e)=>setpassword(e.target.value)} type="password" error={!!errors.password}
       helperText={errors.password} /> 
       <TextField  sx={{
       
       width: { xs: '100%', md: '280px' },
        marginTop: '10px', 
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
       }} id="outlined-basic" value={password2} label="Confirm Password" variant="outlined" onChange={(e)=>setpassword2(e.target.value)} type="password" error={!!errors.password2}
       helperText={errors.password2} /> 

        <Button sx={{
      position: 'fixed',
      marginTop: '320px',
      width:'200px',
      bgcolor: 'black'
      
    }} variant='contained' type='submit'   >  {loading ? <ThreeDots
      visible={true}
      height="40"
      width="80"
      color="white"
      
      radius="9"
      ariaLabel="three-dots-loading"
          wrapperClass=""
      />: 'SIGN UP'}</Button> </Box>


       
    </div>
    
  )
}

export default SignupPage