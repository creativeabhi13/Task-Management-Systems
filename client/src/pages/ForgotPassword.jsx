import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Grid, Typography, Box, Container, CircularProgress } from '@mui/material';
import { Email } from '@mui/icons-material';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { dataPost } from '../services/apiEndPoint'; // Adjust the path as needed

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await dataPost('/auth/forgotPassword', { email: values.email });

      if (res.status === 200) {
        toast.success('Password reset link sent successfully');
        resetForm();
      } else {
        toast.error(res.data.message || 'Error sending reset link');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset link');
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
          backgroundImage: 'url(https://img.freepik.com/premium-vector/twostep-authentication-twostep-authentication-verification-via-computer-mobile-phone_675567-6725.jpg)',
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
            Forgot Your Password?
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
            Don't worry! Just enter your email, and we'll send you a link to reset your password.
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
            <Email
              sx={{
                fontSize: 48,
                color: 'primary.main',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderRadius: '50%',
                padding: 1,
              }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Forgot Password
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter your email to receive a password reset link.
            </Typography>
          </Box>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      variant="outlined"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      margin="normal"
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
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
