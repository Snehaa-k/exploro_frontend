import React, { useState } from 'react'
import './Adminlog.css'
import { Box, TextField,Button, Typography } from '@mui/material'
import { loginAdmin } from '../../../redux/actions/authActions'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { ThreeDots } from 'react-loader-spinner'






const AdminLogin = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const token = localStorage.removeItem('admin_accessToken');
  
  // if(!token){
  //   navigate('/adminlog')
  // }

  const validate = ()=>{
    const newErrors = {};
    
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid Email Address';
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;

  }

  const handleadLogin = async (e)=>{
    e.preventDefault();
    if (validate()){
      setLoading(true)
      try{
        const response = await dispatch(loginAdmin({email, password})).unwrap();
       
       
        if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'Redirecting to the appropriate page...',
              timer: 2000, 
              timerProgressBar: true,
              showConfirmButton: false
            }).then(() => {
              navigate('/requestss')
            });
          }
         else {
          
         
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your email and password.',
          });
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.error}`,
        });
      }
      
    }
    setLoading(false)
  }
  


  return (
    <div className='admin-container'>
       <div className='admin-container1'>
        <Typography variant='h4' style={{marginLeft:'240px',marginTop:'40px'}}>LOGIN</Typography>
       <Box
      component="form"
      sx={{
        marginTop:'40px',
        '& .MuiTextField-root': { m: 1, width:{ xs: '100%', md: '280px' }},
        display: 'flex',
        
        flexDirection: 'column',
        alignItems: 'center',
      }}
      style={{marginTop:'80px',marginLeft:'-20px'}}
      noValidate
      autoComplete="off"
     onSubmit={handleadLogin}

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
       }} id="outlined-basic" label="Enter your email" variant="outlined"  type='email' value={email} onChange={(e)=>setEmail(e.target.value)}  helperText={errors.email} /> 
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
       }} id="outlined-basic" label="Password" variant="outlined" type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  />   <br/>
        <Button sx={{
        width:'300px',
      position: 'fixed',
      marginTop: '180px',
      marginLeft: '2px',
      bgcolor: 'black'
      
    }} variant='contained' type='submit'>{loading ? <ThreeDots
      visible={true}
      height="40"
      width="80"
      color="white"
      
      radius="9"
      ariaLabel="three-dots-loading"
          wrapperClass=""
      />: 'LOGIN'}</Button></Box>
       
       </div> 
    </div>
  )
}

export default AdminLogin