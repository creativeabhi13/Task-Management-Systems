import React, { useState, useEffect } from 'react';
import { Card, CardContent, IconButton, Typography, CardMedia, CircularProgress, Box, Divider, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from './EditProfileModal';
import { dataFetch } from '../../services/apiEndPoint';

const ProfileCard = ({ userData, token }) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState(''); // State for error messages

  // Function to fetch user data
console.log('userData', userData);  

  const GetUser = async () => {
    try {
      const url = `user/profile/${userData._id}`;
      const response = await dataFetch(url, token);
      console.log(response);
      if (response.status === 200) {
        setData(response);
        setStatus(response.status|| 'Active');
        setError(''); // Clear any previous errors
      } else {
        setError('Error fetching user details.'); // Set error for non-200 response
        console.error(`Error fetching User details: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized access - possibly due to an invalid or expired token.');
      } else {
        setError('User not found or not in the same organization!'); // Set error for specific conditions
        console.error('Error fetching User details:', error);
      }
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch the user when the component mounts
  useEffect(() => {
    GetUser();
  }, [userData]);

  // Open and close the edit profile modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      style={{
        display: 'flex',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
        flexDirection: 'row',
      }}
    >
      <Box>
        <CardMedia
          component="img"
          image={loadingData ? '' : data?.img || 'https://via.placeholder.com/150'}
          alt="Profile"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '50%',
            border: '4px solid #ffcc00',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        />
        <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
          {status.toUpperCase()}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem style={{ margin: '0 20px', backgroundColor: 'grey' }} />

      <Box flex="1" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" marginBottom={1}>
          <IconButton onClick={handleOpen}>
            <EditIcon />
            <Typography variant="body2" style={{ marginLeft: '5px', fontWeight: 'bold' }}>Edit</Typography>
          </IconButton>
        </Box>

        {loadingData ? (
          <CircularProgress style={{ margin: '0 auto' }} />
        ) : (
          <CardContent>
            {error ? (
              <Alert severity="error">{error}</Alert> // Display error message
            ) : (
              <>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  {data?.username || 'User Name'}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Email: {data?.email || 'user.email@example.com'}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Phone: {data?.phone || 'Phone Number'}
                </Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                  Role: {data?.role || 'User'}
                </Typography>
              </>
            )}
          </CardContent>
        )}
      </Box>

      <EditProfileModal open={open} handleClose={handleClose} userData={data} setUserData={setData} token={token} />
    </Card>
  );
};

export default ProfileCard;