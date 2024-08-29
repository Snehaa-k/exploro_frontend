import React, { useState } from 'react'
import './Login.css'
import { CircularProgress, TextField } from '@mui/material'
import { Button,Box } from '@mui/material'
import { loginUser, sendOTP } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { setUser } from '../../../redux/reducers/authReducers'
import { ThreeDots } from 'react-loader-spinner'



const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = ()=>{
      const newErrors = {};
      
      if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid Email Address';
      setErrors(newErrors);
    
      return Object.keys(newErrors).length === 0;

    }

    const handleLogin = async (e) => {
      e.preventDefault();
      if (validate()) {
        setLoading(true);
        try {
          const response = await dispatch(loginUser({ email, password })).unwrap();
          dispatch(setUser(response));
          console.log(response);
    
          if (response) {
            const { is_travel_leader, is_verified, is_blocked, is_approve_leader } = response.user;
    
            if (is_blocked) {  
              Swal.fire({
                icon: 'error',
                title: 'Account Blocked',
                text: 'Your account has been blocked by the admin.',
              });
              return;
              
            } else if (!is_verified) {
              dispatch(sendOTP({ email }));
    
              Swal.fire({
                icon: 'info',
                title: 'Verification Required',
                text: 'An OTP has been sent to your email for verification.',
              }).then(() => {
                navigate('/otp-verification');
              });
            } else if (is_travel_leader) {
              if (is_approve_leader) {
                Swal.fire({
                  icon: 'success',
                  title: 'Login Successful',
                  text: 'Redirecting to your travel leader profile...',
                }).then(() => {
                  navigate('/travellerprofile');
                });
              } else {
                Swal.fire({
                  icon: 'info',
                  title: 'Approval Pending',
                  text: 'Your travel leader request is pending approval.',
                }).then(() => {
                  navigate('/login');
                });
              }
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting to your traveler profile...',
              }).then(() => {
                navigate('/travellerprofile');
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Please check your email and password.',
            }).then(() => {
              navigate('/login');
            });
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
    
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred. Please try again later.',
          }).then(() => {
            navigate('/login');
          });
        } finally {
          setLoading(false);
        }
      }
    };


  return (
    <div>
     
        <h4 className='text-container'>LOGIN</h4>
        <h6 className='text-container-sub' style={{ paddingTop: '40px', color: 'red', fontSize: '15px', textAlign: 'center', maxWidth: '400px' ,marginLeft:'60px'}}>
    Please log in to explore. New here? Sign up and start your journey!
  </h6>        {/* <input type="text" placeholder='goolge' className='inputfeild' style ={{marginTop:'40px', marginLeft:'180px'}} /> */}
        {/* <h6 style={{marginTop:'30px',marginLeft:'240px'}}>OR</h6> */}

        <Box
      component="form"
      sx={{
        marginTop:'40px',
        '& .MuiTextField-root': { m: 1, width:{ xs: '100%', md: '280px' }},
        display: 'flex',
        
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{marginTop:'50px'}}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin}
      
    >
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
       }} id="outlined-basic" label="Enter your email" variant="outlined" helperText={errors.email} type='email' value={email}    onChange={(e)=>{setEmail(e.target.value)}} /> 
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
       }} id="outlined-basic" label="Password" variant="outlined" type="password"  value={password} onChange={(e)=>setpassword(e.target.value)}  />   <br/>
        <Button sx={{
      position: 'fixed',
      marginTop: '180px',
      marginLeft: '22px',
      bgcolor: 'black',
      width:'200px'
    }} variant='contained' type='submit'>{loading ? <ThreeDots
      visible={true}
      height="40"
      width="80"
      color="white"
      
      radius="9"
      ariaLabel="three-dots-loading"
          wrapperClass=""
      />: 'LOGIN'} </Button></Box>
       
      </div>
      
      
    
  )
}

export default Login