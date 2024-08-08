import React, { useState } from 'react'
import { Chip, Stack } from '@mui/material';
import './Userpreference.css'


const preferences = ['Historical Sites', 'Natural Wonders', 'Famous Cities', 'Hilly areas', 'Landmarks'];
const UserPreference = () => {
    
    const [selectedPreference, setSelectedPreference] = useState(null);

  const handleSelect = (preference) => {
    setSelectedPreference(preference);
  };


  return (
    <div className='preference-container'>
    <h5 style={{textAlign:'center',marginTop:'35px'}}>What types of destinations are you most interested in..?</h5>
    <img src="/image/prefer.jpg" className='img-preference'/>



         <Stack direction="row" spacing={2} flexWrap="wrap" style={{marginLeft:'34px'}}>

      {preferences.map((preference) => (
        <Chip
          key={preference}
          label={preference}
          clickable
          color={selectedPreference === preference ? 'primary' : 'default'}
          style={{
            backgroundColor: selectedPreference === preference ? '#3f51b5' : '#e0e0e0',
            color: selectedPreference === preference ? '#fff' : '#000',
            marginTop:'24px',
            marginLeft: '15px',
            
          }}
          onClick={() => handleSelect(preference)}
        />
      ))}
    </Stack>
  
        
    </div>
  )
}

export default UserPreference