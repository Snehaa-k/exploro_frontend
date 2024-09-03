import { useState } from 'react'
import Login from './components/user-side/login-page/Login'
import Home from './components/user-side/home-page/Home'
import SignupPage from './components/user-side/signup-page/SignupPage'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import RoleSelection from './components/user-side/role-selection/RoleSelection'
import UserPreference from './components/user-side/userpreference/UserPreference'
import OtpVerificationPage from './components/user-side/otp-veification/OtpVerification'
import { Bounce, ToastContainer } from 'react-toastify'
import FormSubmission from './components/user-side/formsubmission/FormSubmission'
import PostsPage from './components/user-side/Posts-page/PostsPage'
import Navbar from './components/Navbar/Navbar'
import UserPost from './pages/Userside/User-Post/UserPost'
import EditProfile from './pages/Userside/Traveller/edit-profile/EditProfile'
import AdminLogin from './components/admin-side/Login/AdminLogin'
import AdminHome from './components/admin-side/Common/AdminHome'
import ViewTravellers from './components/admin-side/Travellers/ViewTravellers'
import Request from './components/admin-side/request/Request'
import TravelLeaderDetails from './components/admin-side/leader-detailView/DetailedView'
import ViewTravelLeaders from './components/admin-side/TravelLeaders/ViewTravelLeader'
import TravellerProfile from './pages/Userside/Traveller/TravellerProfile'
import NotFoundPage from './pages/404error/Error404'
import PlanTrips from './pages/Userside/TravelLeader/Trip-page/planTrips/PlanTrips'
import CreateTrip from './components/user-side/Travel-leader/PlanTripComponent/CreateTrip'
import ViewTrip from './pages/Userside/TravelLeader/Trip-page/ViewTrips/ViewTrip'
import Destination from './pages/Userside/User-Destination/Destination'
import PlaceInformation from './components/user-side/user-destination-view/places-information/PlaceInformation'
import DestinationTabs from './components/user-side/user-destination-view/destination-tabs/DestinationTabs'



// import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  

  return (
    <>
      <div>
      
     <h1>
    

       <Router>
      
          <Routes>
            <Route path ="/" element={<Navigate to="/login" />} />
            <Route path ="/:mode" element={<Home/>} /> 
            <Route path ='/otp-verification' element={<OtpVerificationPage/>}/>
            {/* <Route path ='/posts' element={<PostsPage/>}/>            */}
            <Route path ='/formsubmission' element={<FormSubmission/>}/>
            <Route path = '/adminlog' element = {<AdminLogin/>}/>
            <Route path = '/travellers' element = { <ViewTravellers/>}/>
            <Route path = '/requestss' element = { <Request/>}/>
            <Route path = "/request/:id" element={<TravelLeaderDetails />} />
            <Route path = '/travelleaders' element = { <ViewTravelLeaders/>}/>
            <Route path = '/editprofile' element = { <EditProfile/>}/>
            <Route path = '/travellerprofile' element = { <TravellerProfile/>}/>
            <Route path = '/posts' element = { <UserPost/>}/>
            <Route path = '/triplan' element = { <PlanTrips/>}/>
            <Route path = '/viewtrip' element = { <ViewTrip/>}/>
            <Route path = '/destination' element = { <Destination/>}/>
            <Route path = '/information' element = { <PlaceInformation/>}/>
            <Route path = '/tab' element = { <DestinationTabs/>}/>
            
            

            
               

             
          
           </Routes> 
             
        </Router> 

      {/* <RoleSelection/> */}
      {/* <UserPreference/> */}
      {/* <FormSubmission/> */}
   
      </h1>
   {/* <Home/> */}
   {/* <Profile/> */}
   {/* <ViewProfile/> */}
   {/* <EditProfile/> */}
   {/* <LeaderProfile/> */}
   {/* <TravelLeaderDetails/> */}
   
  
      </div>
     
    </>
  )
}

export default App
