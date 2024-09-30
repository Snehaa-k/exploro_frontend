import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import DestinationTabs from '../../components/user-side/user-destination-view/destination-tabs/DestinationTabs'
import { Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserDestination = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
   
     
    const HandleProfile = ()=>{
        navigate('/travellerprofile')
      }
      const HandleDestination = ()=>{
        navigate('/destination')
      }
      const HandleHome = ()=>{
        navigate('/posts')
      }

    const menuItemsLead = [
        { label: 'Home', onClick:HandleHome },
        { label: 'Destination', onClick:HandleDestination  },
        { label: 'Profile', onClick: HandleProfile },
      ];
    
  return (
    <div>
        <Navbar title="Exploro" menuItems={menuItemsLead} />
        <div style={{ paddingTop: '60px',marginLeft:'700px',marginTop:'40px' }}> 
        <Typography variant='h5'>Details</Typography>
      </div>
        <div style={{marginTop:'50px'}}>
        <DestinationTabs tripId={id}  />
        </div>


    </div>
  )
}

export default UserDestination