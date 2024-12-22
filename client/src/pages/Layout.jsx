import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskOutlined from '@mui/icons-material/TaskOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from './Dashboard';
import TaskPage from './Task';
import ProfileCard from '../components/profile/ProfileCard';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

// Navigation Items
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: '/task',
    title: 'Task',
    icon: <TaskOutlined />,
  },
  {
    kind: 'divider',
  },
];

// Theme Configuration
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Page Content Renderer
function DemoPageContent({ pathname }) {
  let content;
  switch (pathname) {
    case '/dashboard':
      content = <Dashboard />;
      break;
    case '/task':
      content = <TaskPage />;
      break;
    case '/profile':
      content = <ProfileCard />;
      break;
    default:
      content = <Typography variant="h6">Page not found</Typography>;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// Search Component
function Search() {
  return (
    <>
      <Tooltip title="Search" enterDelay={1000}>
        <IconButton aria-label="search" sx={{ display: { xs: 'inline', md: 'none' } }}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          ),
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
    </>
  );
}

// Account Menu Component
function AccountButton({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt={user.name} src={user.img} />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, width: 300, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar alt={user.name} src={user.img} sx={{ width: 56, height: 56, mr: 2 }} />
            <Box>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Button variant="contained" color="primary" onClick={onLogout} sx={{ width: '100%' }}>
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// Main Dashboard Layout
function DashboardLayoutSlots(props) {
  const { logout, userData, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [pathname, setPathname] = useState('/dashboard');

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logout successful');
    navigate('/login');
  };

  const router = useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: setPathname,
    }),
    [pathname]
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <AppProvider
      session={{
        user: {
          name: userData?.username || 'User',
          email: userData?.email || '',
          img: userData?.img || '',
        },
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => (
            <>
              <Search />
              <AccountButton user={userData} onLogout={handleLogout} />
            </>
          ),
        }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutSlots.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutSlots;
