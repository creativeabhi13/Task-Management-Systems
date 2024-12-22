import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Grid, Typography, Box, Container, CircularProgress, IconButton } from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { dataPost } from '../services/apiEndPoint';
import { toast } from 'react-toastify';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[0-9]/, 'Password must contain a number.')
    .matches(/[!@#$%^&*]/, 'Password must contain a special character.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await dataPost(`/auth/resetPassword/${token}`, { password: values.password });

      if (res.status === 200) {
        toast.success('Password reset successful');
        resetForm();
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Error resetting password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
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
          backgroundImage: 'url(https://img.freepik.com/premium-vector/2fa-authentication-password-secure-notice-login-verification-sms-with-push-code-message-shield-icon-smartphone-phone-laptop-computer-pc-flat_212005-139.jpg)',
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
          //background: 'linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(34, 193, 195, 0.8))',
          // OR using radial gradient:
           background: 'radial-gradient(circle, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))',
        }}
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
            Reset Your Password
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
            Choose a strong password to secure your account.
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
            <LockReset
              sx={{
                fontSize: 48,
                color: 'primary.main',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderRadius: '50%',
                padding: 1,
              }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Reset Password
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter and confirm your new password.
            </Typography>
          </Box>

          {/* Formik Form */}
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Password Field */}
                <Field name="password">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      variant="outlined"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      margin="normal"
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

                {/* Confirm Password Field */}
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Confirm New Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      fullWidth
                      variant="outlined"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            edge="end"
                            aria-label="toggle password visibility"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />
                  )}
                </Field>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                  sx={{ mt: 2 }}
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
