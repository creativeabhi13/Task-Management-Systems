import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import ProfileCard from './components/profile/ProfileCard';
import TaskPage from './pages/Task';
import Layout from './Layout/Layout';



const App = () => {
  const { isAuthenticated, userData } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
          />
        <Route path="/signup" element={
            !isAuthenticated ? (
              <Signup />
            ) : (
              <Navigate to="/dashboard" />
            )
          }/>
        <Route path="/verifyEmail/:token" element={
            !isAuthenticated ? (
              <VerifyEmail />
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/forgotPassword"element={
            !isAuthenticated ? (
              <ForgotPassword/>
            ) : (
              <Navigate to="/login" />
            )
          } />
        <Route path="/resetPassword/:token" element={
            !isAuthenticated ? (
              <ResetPassword/>
            ) : (
              <Navigate to="/login" />
            )
          } />

        {/* Use JSX to render the layout */}
        <Route element={<Layout /> } >
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