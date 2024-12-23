import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserProfile from '../components/profile/UserProfile'; // Import UserProfile component
import EditUser from '../components/profile/EditUser'; // Import EditUser modal component
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    toast.success('Logged out successfully!');
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="body1">Welcome to the dashboard!</Typography>

      <UserProfile user={user} onEdit={handleEditOpen} />

      {/* Logout Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>

      {/* Edit User Modal */}
      {isEditOpen && (
        <EditUser user={user} onClose={handleEditClose} />
      )}
    </Box>
  );
};

export default Dashboard;
