import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UserProfile = ({ user, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345, mt: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={user?.img}
        alt={`${user?.name}'s photo`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.username}
          <IconButton onClick={onEdit} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Role: {user?.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;