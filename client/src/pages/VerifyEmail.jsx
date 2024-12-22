import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { dataFetch } from '../services/apiEndPoint';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const res = await dataFetch(`/auth/verifyEmail/${token}`);
  
        if (res.status === 200) {
          toast.success('Email verified successfully');
          navigate('/login');
        } else {
          // Check if res.data.message exists, otherwise provide a default message
          toast.error(res.data?.message || 'Email verification failed');
        }
      } catch (error) {
        // Handle any errors that occurred during the fetch
      
        toast.error(`Error verifying email:`);
        console.error('Error verifying email:', error);
      }
    };
  
    verifyEmailToken();
  }, [token, navigate]);

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>
          Verifying Email...
        </Typography>
        <Typography variant="body1">
          Please wait while we verify your email. If this takes too long, try refreshing the page or contact support.
        </Typography>
        <Button onClick={() => navigate('/login')} variant="contained" color="primary" fullWidth>
          Back to Login
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
