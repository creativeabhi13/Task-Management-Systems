import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Container,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dataPost } from '../services/apiEndPoint';
import { toast } from 'react-toastify';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be at most 50 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await dataPost('/auth/signup', values);

      if (res.status === 201) {
        signup(res.data.emailToken);
        toast.success('Signup successful, please verify your email');
        resetForm();
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
    setSubmitting(false);
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      {/* Left Side */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(https://img.lovepik.com/element/45009/2311.png_300.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
         sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(34, 193, 195, 0.8))',
          // OR using radial gradient:
           //background: 'radial-gradient(circle, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))',
        }}

        // trying changes with respect react redux toolkit
        />
        <Box
          sx={{
            color: '#fff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            px: 4,
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Join Us Today!
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
            Create an account and explore the benefits of our platform. We are excited to have you on board!
          </Typography>
        </Box>
      </Grid>

      {/* Right Side */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f4f6f8',
          padding: 4,
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            background: '#fff',
            padding: 4,
            borderRadius: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Icon and Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <PersonAddAlt
              sx={{
                fontSize: 48,
                color: 'primary.main',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderRadius: '50%',
                padding: 1,
              }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Sign Up
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Create an account to unlock all the features.
            </Typography>
          </Box>

          <Formik
            initialValues={{ username: '', email: '', phone: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="username">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Username"
                          fullWidth
                          variant="outlined"
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name="email">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Email"
                          fullWidth
                          variant="outlined"
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name="phone">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Phone"
                          fullWidth
                          variant="outlined"
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Field name="password">
                      {({ field, meta }) => (
                        <TextField
                          {...field}
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          fullWidth
                          variant="outlined"
                          error={Boolean(meta.touched && meta.error)}
                          helperText={meta.touched && meta.error}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                aria-label="toggle password visibility"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      startIcon={isSubmitting && <CircularProgress size={20} />}
                    >
                      {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </Button>
                  </Grid>

                  <Grid item xs={12} container justifyContent="center" alignItems="center">
                    <Typography variant="body2" mr={1}>
                      Already have an account?
                    </Typography>
                    <Button onClick={() => navigate('/login')} color="primary">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Signup;
