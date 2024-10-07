import React, { useState } from 'react';
import './ForgotPassword.css';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { forgotpassword } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(email,"email   gg");
    

    const validateEmail = () => {
        const newErrors = {};
        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid Email Address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (validateEmail()) {
            console.log("Email sent from form:", email);
            setLoading(true);
            try {
                const response = await dispatch(forgotpassword({ email }))
                console.log(response);
                
                if(response.payload.message){

                
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: 'A password reset link has been sent to your email address.',
                }).then(() => {
                    navigate('/login');
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Password Reset Failed ',
                    text: 'Please Check Your Email',
                }).then(() => {
                    navigate('/login');
                });
            }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to send the reset link. Please try again later.',
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ bgcolor: '#f5f5f5', p: 2 }}
        >
            <Box
                component="form"
                onSubmit={handleForgotPassword}
                sx={{
                    backgroundColor: '#fff',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    maxWidth: 400,
                    width: '100%',
                }}
            >
                <Typography variant="h5" textAlign="center" gutterBottom>
                    Forgot Password
                </Typography>
                <Typography variant="body2" textAlign="center" color="textSecondary" gutterBottom>
                    Enter your email address below and we'll send you a password reset link.
                </Typography>

                <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: 'black', color: 'white' }}
                >
                    {loading ? (
                        <ThreeDots
                            visible={true}
                            height="40"
                            width="80"
                            color="white"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        />
                    ) : (
                        'Send Reset Link'
                    )}
                </Button>

                <Box textAlign="center" mt={2}>
                    <Typography
                        variant="body2"
                        onClick={() => navigate('/login')}
                        sx={{ cursor: 'pointer', color: 'blue' }}
                    >
                        Back to Login
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
