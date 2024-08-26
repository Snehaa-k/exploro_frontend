import React from 'react'
import './Home.css'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Login from '../login-page/Login';
import SignupPage from '../signup-page/SignupPage';
import { Navigate, useNavigate, useParams } from 'react-router';
import RoleSelection from '../role-selection/RoleSelection';
import UserPreference from '../userpreference/UserPreference';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploroLogo from '../../../assets/image/logo.png';




const Home = () => {
   
  const {mode} = useParams()
  const navigate = useNavigate()

  const renderContent = () => {
    if (mode === 'signup') {
      return <SignupPage />;
    }
  
    else if (mode == 'login'){
      return <Login/>
    }
    else if(mode == 'userpreference'){
      return <UserPreference/>
    }
    else {
      return <RoleSelection/>
    }
    

    };

  const handleToggle = () => {
    if (mode === 'signup') {
      navigate('/login'); 
    } else {
      navigate('/signup'); 
    }
  };
    
  return (
    
    <div className='container'>
    <div className='container1'>
     
      
   
    
  
  
          <h4 className='logo' >
          <img src={ExploroLogo} alt="Exploro Logo" className='logo-image' />
          </h4>
          
          
          
         {mode === 'role-selection' | 'userpreference'? '' : <Button onClick={handleToggle} sx={{
      position: 'fixed',
      marginTop: '22px',
      right: '100px',
      bgcolor: 'black'
      
    }} variant='contained'>{mode === 'signup' ? 'Login' : 'Sign Up'}</Button>}
   

    <img className='image-container' src="image/p.jpg" alt="Decorative"  />  

    <p className='description'>
    Discover the world like never before! Explore hidden gems, find your next adventure, and connect with fellow travelers.<br/>
     Your journey starts here.
        </p>
  
    </div>
    <div className='container2'>
      <div className='container3'>
        
      {renderContent()}
      </div>
       
    </div>
    
    </div>
  
  )
}

export default Home