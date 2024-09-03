import React from 'react'
import  { useState } from 'react';
import { Box, Tabs, Tab, Button,  Container } from '@mui/material';

const DestinationTabs = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleNext = () => {
      if (value < 3) setValue(value + 1);
    };
  
    const handleBack = () => {
      if (value > 0) setValue(value - 1);
    };
  
  return (
    <div>
        <Container>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Information" />
          <Tab label="Places" />
          <Tab label="Book Trips" />
          <Tab label="Payment" />
        </Tabs>
        <Box p={3}>
          {value === 0 }
          {value === 1  }
          {value === 2 }
          {value === 3 }
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleBack} disabled={value === 0}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={value === 3}>
            Next
          </Button>
        </Box>
      </Box>
    </Container>
    </div>
  )
}

export default DestinationTabs