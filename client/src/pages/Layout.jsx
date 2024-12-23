// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import SearchIcon from '@mui/icons-material/Search';
// import Avatar from '@mui/material/Avatar';
// import Popover from '@mui/material/Popover';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import Tooltip from '@mui/material/Tooltip';
// import Divider from '@mui/material/Divider';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Dashboard from './Dashboard';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import UserProfile from '../components/profile/ProfileCard';
// import { toast } from 'react-toastify';
// import ProfileCard from '../components/profile/ProfileCard';
// import { TaskOutlined } from '@mui/icons-material';
// import TaskPage from './Task';

// const NAVIGATION = [
//   {
//     kind: 'header',
//     title: 'Main items',
//   },
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'task',
//     title: 'Task',
//     icon: <TaskOutlined/>,
//   },
//   {
//     kind:'divider',

//   },
 


// ];

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// // function DemoPageContent({ pathname }) {
// //   return (
// //     <Box
// //       sx={{
// //         py: 4,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         textAlign: 'center',
// //       }}
// //     >
// //       <Typography variant="h4" gutterBottom>
// //         {pathname === '/dashboard' ? <Dashboard /> : ''}
// //         {pathname === '/profile' ? <ProfileCard/> : ''}
// //         {pathname === '/task' ? <TaskPage/> : ''}
    
        
// //       </Typography>
// //     </Box>
// //   );
// // }

// function DemoPageContent({ pathname }) {
//   let content;
//   console.log('Rendering page for:', pathname); // Debug log

//   if (pathname === '/dashboard') {
//     content = <Dashboard />;
//   } else if (pathname === '/profile') {
//     content = <ProfileCard />;
//   } else if (pathname === '/task') {
//     content = <TaskPage />;
//   } else {
//     content = <Typography variant="h4" gutterBottom>
//       Page not found
//     </Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       {content}
//     </Box>
//   );
// }

// DemoPageContent.propTypes = {
//   pathname: PropTypes.string.isRequired,
// };

// function Search() {
//   return (
//     <React.Fragment>
//       <Tooltip title="Search" enterDelay={1000}>
//         <div>
//           <IconButton
//             type="button"
//             aria-label="search"
//             sx={{
//               display: { xs: 'inline', md: 'none' },
//             }}
//           >
//             <SearchIcon />
//           </IconButton>
//         </div>
//       </Tooltip>
//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         InputProps={{
//           endAdornment: (
//             <IconButton type="button" aria-label="search" size="small">
//               <SearchIcon />
//             </IconButton>
//           ),
//         }}
//         sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
//       />
//     </React.Fragment>
//   );
// }

// function AccountButton({ user, onLogout }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'account-popover' : undefined;

//   return (
//     <>
//       <IconButton onClick={handleClick}>
//         <Avatar alt={user.username} src={user.img} />
//       </IconButton>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//       >
//         <Box sx={{ p: 2, width: 300, display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <Avatar alt={user.name} src={user.img} sx={{ width: 56, height: 56, mr: 2 }} />
//             <Box>
//               <Typography variant="subtitle1">{user.name}</Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{user.email}</Typography>
//             </Box>
//           </Box>
//           <Divider sx={{ mb: 1 }} />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={onLogout}
//             sx={{ width: '100%' }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Popover>
//     </>
//   );
// }

// function DashboardLayoutSlots(props) {
//   const { logout, userData, isAuthenticated, loading } = useAuth();
//   const navigate = useNavigate();
//   const { window } = props;

//   console.log(userData);

//   const [session, setSession] = useState({
//     user: {
//       name: userData?.username,
//       email: userData?.email,
//       role: userData?.role,
//       img: userData?.img,
//     },
//   });

//   useEffect(() => {
//     // Wait until the authentication status is fully loaded
//     if (!loading) {
//       if (!isAuthenticated) {
//         navigate('/login');  // Redirect only after loading is complete
//       } else {
//         setSession({
//           user: {
//             name: userData?.username,
//             email: userData?.email,
//             role: userData?.role,
//             img: userData?.img,
//           },
//         });
//       }
//     }
//   }, [userData, isAuthenticated, loading, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     toast.success('Logout successful');
//     navigate('/login');
//   };

//   const [pathname, setPathname] = useState('/dashboard');

//   const router = React.useMemo(() => ({
//     pathname,
//     searchParams: new URLSearchParams(),
//     navigate: (path) => {
//       console.log('Navigating to:', path); // Debug log
//       setPathname(String(path));
//     },
//   }), [pathname]);
  

//   const demoWindow = window !== undefined ? window() : undefined;

//   // Render loading state while waiting for authentication check
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AppProvider
//       session={session}
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout slots={{ toolbarActions: () => (
//         <>
//           <Search />
//           <AccountButton user={session.user} onLogout={handleLogout} />
//         </>
//       ) }}>
//         <DemoPageContent pathname={pathname} />
//       </DashboardLayout>
//     </AppProvider>






//   );
// }


// DashboardLayoutSlots.propTypes = {
//   window: PropTypes.func,
// };



// export default DashboardLayoutSlots;
