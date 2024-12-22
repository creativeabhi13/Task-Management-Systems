import React from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
  img:Yup.string().required('Image is required'),
});

const EditUser = ({ user, onClose }) => {
  const handleSubmit = async (values) => {
    // Call the API to update user data
    console.log('Submitting form with values:', values);
    // Assume API call here
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', mt: 10, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Edit User Profile
        </Typography>
        <Formik
          initialValues={{
            username: user?.username || '',
            email: user?.email || '',
            role: user?.role || '',
            img: user?.img || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <TextField
                fullWidth
                label="Name"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={values.role}
                onChange={handleChange}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
                sx={{ mb: 2 }}
              />
                <TextField
                    fullWidth
                    label="Image"
                    name="img"
                    value={values.img}
                    onChange={handleChange}
                    error={touched.img && Boolean(errors.img)}
                    helperText={touched.img && errors.img}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent:'space-evenly' }}>
              <Button type="submit" variant="contained" >
                Update
              </Button>
                <Button onClick={onClose} variant="contained" color="secondary" >
                    Cancel
                </Button>
                </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditUser;