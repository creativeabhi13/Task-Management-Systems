import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DashboardLayoutSlots from './pages/Layout';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProfileCard from './components/profile/ProfileCard';
import TaskPage from './pages/Task';



const App = () => {
 const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        {/* Use JSX to render the layout */}
        <Route element={<DashboardLayoutSlots /> } >
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}

          />
          <Route path="/profile" element={isAuthenticated ? <ProfileCard/> : <Navigate to="/login" />} />
          <Route path="/task" element={isAuthenticated ? <TaskPage/> : <Navigate to="/login" />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

            {/* Add ToastContainer here so it's accessible everywhere */}
            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />

    </Router>
  );
};

export default App;