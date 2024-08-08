import { useState } from 'react'
import Login from './components/user-side/login-page/Login'
import Home from './components/user-side/home-page/Home'
import SignupPage from './components/user-side/signup-page/SignupPage'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import RoleSelection from './components/user-side/role-selection/RoleSelection'
import UserPreference from './components/user-side/userpreference/UserPreference'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  

  return (
    <>
      <div>
     <h1>
       <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/:mode" element={<Home/>} /> 
           </Routes> 
             
        </Router> 

      {/* <RoleSelection/> */}
      {/* <UserPreference/> */}
      </h1>
   {/* <Home/> */}
   
      </div>
     
    </>
  )
}

export default App
