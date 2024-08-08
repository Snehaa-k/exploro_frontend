import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { useEffect,useState } from 'react';
import {TextField} from '@mui/material';




const OtpVerification = ({open, onClose, onVerify}) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']); 

  useEffect(() => {
    if (otp.every((digit) => digit.length === 1)) {
      onVerify(otp.join(''));
    }
  }, [otp, onVerify]);

  

  return (
    <div >
         <Dialog open={open} onClose={onClose}>
      <DialogTitle>OTP Verification</DialogTitle>
      <DialogContent>
        <div className="otp-container">
          {otp.map((value, index) => (
            <TextField
              key={index}
              id={`otp-input-${index}`}
              value={value}
              
              inputProps={{ maxLength: 1 }}
              className="otp-input"
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onVerify}  color="primary" >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default OtpVerification