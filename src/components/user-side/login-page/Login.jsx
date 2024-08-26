import React, { useState } from 'react'
import './Login.css'
import { TextField } from '@mui/material'
import { Button,Box } from '@mui/material'
import { loginUser, sendOTP } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { setUser } from '../../../redux/reducers/authReducers'
// import { ThreeDots } from 'react-loader-spinner'




const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [isloading,setLoading] = useState(false)
    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validate = ()=>{
      const newErrors = {};
      
      if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid Email Address';
      setErrors(newErrors);
    
      return Object.keys(newErrors).length === 0;

    }

    const handleLogin = async (e)=>{
      e.preventDefault();
      if (validate()){
        setLoading(true)
        try{
          const response = await dispatch(loginUser({email, password})).unwrap();
          dispatch(setUser(response))
        
          console.log(response)
          if (response) {
            const { is_travel_leader, is_verified, is_blocked,is_approve_leader } = response.user;
            // const {is_approved } = response.travel_leaders
            console.log(response.travel_leaders)
            console.log(response.user)
            if (!is_blocked) {
              Swal.fire({
                icon: 'error',
                title: 'Account Blocked',
                text: 'Your account has been blocked by the admin.',
              });
            } else if (!is_verified) {
              dispatch(sendOTP({ email }));
             
              Swal.fire({
                icon: 'info',
                title: 'Verification Required',
                text: 'An OTP has been sent to your email for verification.',
              }).then(() => {
                navigate('/otp-verification'); 
              });
              
              // Swal.fire({
              //   icon: 'warning',
              //   title: 'Account Not Verified',
              //   text: 'Please verify your account to proceed.',
              // });
            } else if (is_travel_leader) {
              if(is_approve_leader){
                Swal.fire({
                  icon: 'success',
                  title: 'Login Successful',
                  text: 'redirecting to the posts page',
                }).then(() => {
                  navigate('/travellerprofile'); 
                });

              }else{
                Swal.fire({
                  icon: 'info',
                  title: 'Approval Pending ',
                  text: 'Your travel leader request is pending approval ',
                }).then(() => {
                  navigate('/login'); 
                });
              }
              
             
              
              
              // Swal.fire({
              //   icon: 'warning',
              //   title: 'Account Not Verified',
              //   text: 'Please verify your account to proceed.',
              // });
            } 
            
            else {
              Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'Redirecting to the appropriate page...',
                timer: 2000, 
                timerProgressBar: true,
                showConfirmButton: false
              })
            }
          }  else {
            
           
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
         
        }
          
        
      }
      
    }


  return (
    <div>
     
        <h4 className='text-container'>LOGIN</h4>
        {/* <input type="text" placeholder='goolge' className='inputfeild' style ={{marginTop:'40px', marginLeft:'180px'}} /> */}
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
      style={{marginTop:'110px'}}
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
       }} id="outlined-basic" label="Enter your email" variant="outlined"  type='email' value={email}    onChange={(e)=>{setEmail(e.target.value)}} /> 
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
      bgcolor: 'black'
      
    }} variant='contained' type='submit'>LOGIN</Button></Box>
       
      </div>
      
      
    
  )
}

export default Login