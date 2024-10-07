import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { resetpassword } from '../../../redux/actions/authActions';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id ,token} = useParams(); 
    console.log(id,"hai id");
    const userid = id
    
    

    const validatePasswords = () => {
        const newErrors = {};
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (validatePasswords()) {
            setLoading(true);
            try {
                await dispatch(resetpassword({ userid,token, password}));
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset',
                    text: 'Your password has been reset successfully.',
                }).then(() => {
                    navigate('/login'); 
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to reset password. Please try again later.',
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
                onSubmit={handleResetPassword}
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
                    Reset Password
                </Typography>
                <Typography variant="body2" textAlign="center" color="textSecondary" gutterBottom>
                    Enter your new password below.
                </Typography>

                <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={errors.password}
                    error={Boolean(errors.password)}
                    sx={{ mb: 3 }}
                />

                <TextField
                    fullWidth
                    label="Confirm New Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    helperText={errors.confirmPassword}
                    error={Boolean(errors.confirmPassword)}
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
                        'Reset Password'
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

export default ResetPassword;
