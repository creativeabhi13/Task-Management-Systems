// import React, { useState } from 'react';
// import { Formik, Form, Field } from 'formik';
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   CircularProgress,
//   Box,
//   Container,
//   InputAdornment,
//   IconButton,
// } from '@mui/material';
// import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuth } from '../context/AuthContext';
// import { dataPost } from '../services/apiEndPoint';
// import 'react-toastify/dist/ReactToastify.css';

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
//     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
//     .matches(/[0-9]/, 'Password must contain at least one number')
//     .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
//     .required('Password is required'),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

//   const handleSubmit = async (values, { resetForm, setSubmitting }) => {
//     try {
//       const res = await dataPost('/auth/login', values);
//       const user = res.data.data;
//       localStorage.setItem("token", user.token);
//       localStorage.setItem("user", user);
//       if (res.status === 200) {
//         console.log('user', user);  
//         console.log('user.token', user.token);
//         login(user.token, user);
//         toast.success('Login successful');
//         resetForm();
//         navigate('/dashboard');
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     }
//     setSubmitting(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword); // Toggle visibility state
//   };

//   return (
//     <Grid container style={{ minHeight: '100vh' }}>
//       {/* Left Side */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           backgroundImage: 'url(https://img.freepik.com/premium-vector/website-page-interface-concept-sign-page-user-log-form-flat-vector-modern-illustration_566886-7519.jpg?semt=ais_hybrid)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           position: 'relative',
//         }}
//       >
//         <Box
//        sx={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         //background: 'linear-gradient(to right, rgba(0, 123, 255, 0.8), rgba(34, 193, 195, 0.8))',
//         // OR using radial gradient:
//          background: 'radial-gradient(circle, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))',
//       }}
      
//         />
//         <Box
//           sx={{
//             color: '#fff',
//             position: 'relative',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100%',
//             px: 4,
//           }}
//         >
//           <Typography variant="h3" align="center" gutterBottom>
//             Welcome Back!
//           </Typography>
//           <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
//             Log in to continue exploring our platform and managing your preferences. We are glad to have you back!
//           </Typography>
//         </Box>
//       </Grid>

//       {/* Right Side */}
//       <Grid
//         item
//         xs={12}
//         md={6}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           background: '#f4f6f8',
//           padding: 4,
//         }}
//       >
//         <Container
//           maxWidth="xs"
//           sx={{
//             background: '#fff',
//             padding: 4,
//             borderRadius: '16px',
//             boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           {/* Icon and Header */}
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <LockOutlined
//               sx={{
//                 fontSize: 48,
//                 color: 'primary.main',
//                 backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                 borderRadius: '50%',
//                 padding: 1,
//               }}
//             />
//             <Typography variant="h5" sx={{ mt: 2 }}>
//               Log In
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Access your account and manage your preferences.
//             </Typography>
//           </Box>

//           <Formik
//             initialValues={{ email: '', password: '' }}
//             validationSchema={LoginSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting }) => (
//               <Form>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Field name="email">
//                       {({ field, meta }) => (
//                         <TextField
//                           {...field}
//                           label="Email"
//                           fullWidth
//                           variant="outlined"
//                           error={Boolean(meta.touched && meta.error)}
//                           helperText={meta.touched && meta.error}
//                         />
//                       )}
//                     </Field>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Field name="password">
//                       {({ field, meta }) => (
//                         <TextField
//                           {...field}
//                           label="Password"
//                           type={showPassword ? 'text' : 'password'}
//                           fullWidth
//                           variant="outlined"
//                           error={Boolean(meta.touched && meta.error)}
//                           helperText={meta.touched && meta.error}
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <IconButton onClick={togglePasswordVisibility}>
//                                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       )}
//                     </Field>
//                   </Grid>

//                   <Grid item xs={12} container justifyContent="space-between" alignItems="center">
//                     <Typography variant="body2">Lost Your Password?</Typography>
//                     <Button onClick={() => navigate('/forgotpassword')} color="primary">
//                       Forgot?
//                     </Button>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       color="primary"
//                       disabled={isSubmitting}
//                       startIcon={isSubmitting && <CircularProgress size={20} />}
//                     >
//                       {isSubmitting ? 'Logging in...' : 'Login'}
//                     </Button>
//                   </Grid>

//                   <Grid item xs={12} container justifyContent="center" alignItems="center">
//                     <Typography variant="body2" mr={1}>
//                       Don't have an account?
//                     </Typography>
//                     <Button onClick={() => navigate('/signup')} color="primary">
//                       Signup
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Form>
//             )}
//           </Formik>
//         </Container>
//       </Grid>
//     </Grid>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { dataPost } from '../services/apiEndPoint';
import 'react-toastify/dist/ReactToastify.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const res = await dataPost('/auth/login', values);
      const user = res.data.data;
      
      // Store the token and user data properly in localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user));  // Stringify user data

      if (res.status === 200) {
        console.log('user', user);  
        console.log('user.token', user.token);
        login(user.token, user);  // Pass the correct user data
        toast.success('Login successful');
        resetForm();
        navigate('/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle visibility state
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      {/* Left Side */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundImage: 'url(https://img.freepik.com/premium-vector/website-page-interface-concept-sign-page-user-log-form-flat-vector-modern-illustration_566886-7519.jpg?semt=ais_hybrid)',
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
            Welcome Back!
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 400 }}>
            Log in to continue exploring our platform and managing your preferences. We are glad to have you back!
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
            <LockOutlined
              sx={{
                fontSize: 48,
                color: 'primary.main',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderRadius: '50%',
                padding: 1,
              }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              Log In
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Access your account and manage your preferences.
            </Typography>
          </Box>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container spacing={2}>
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
                              <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} container justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Lost Your Password?</Typography>
                    <Button onClick={() => navigate('/forgotpassword')} color="primary">
                      Forgot?
                    </Button>
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
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  </Grid>

                  <Grid item xs={12} container justifyContent="center" alignItems="center">
                    <Typography variant="body2" mr={1}>
                      Don't have an account?
                    </Typography>
                    <Button onClick={() => navigate('/signup')} color="primary">
                      Signup
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

export default Login;

