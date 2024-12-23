import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

import { dataFetch, dataPost } from "../services/apiEndPoint";
import { toast } from 'react-toastify';



import {
  DashboardCustomize,
  TaskAltOutlined,
} from "@mui/icons-material";
import ProfileCard from "../components/profile/ProfileCard";
import TaskPage from "../pages/Task";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [themeMode, setThemeMode] = useState("light");
  const { userData, logout } = useAuth();
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || "Dashboard"
  );
 const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const drawerWidth = isSmallScreen ? 170 : isMediumScreen ? 200 : 240;
  const currentYear = new Date().getFullYear();

 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setThemeMode(savedTheme);
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    localStorage.setItem("selectedSection", section); // Save to localStorage
  }

  const allMenuItems = {
    admin: [
      { name: "Dashboard", icon: <DashboardCustomize /> },
      { name: "Tasks", icon: <TaskAltOutlined /> },
    ],
    manager: [
      { name: "Dashboard", icon: <DashboardCustomize /> },
      { name: "Tasks", icon: <TaskAltOutlined /> },
    ],
    user: [
      { name: "Dashboard", icon: <DashboardCustomize /> },
      { name: "Tasks", icon: <TaskAltOutlined /> },
    ],
  };

  const renderContent = () => {
    const userRole = userData?.role;
    const contentMap = {
      admin: {
        Dashboard: <Dashboard/>,
        Tasks: <TaskPage />,
      },
      manager: {
        Dashboard: <Dashboard/>,
        Tasks: <TaskPage />,
      },
      user: {
        Dashboard:<Dashboard/>,
        Tasks: <TaskPage />,
      },
    };

    return contentMap[userRole]?.[selectedSection] || <ProfileCard/>;
  };

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: { default: "#ffffff", paper: "#ffffff" },
      text: { primary: "#000000" },
      primary: { main: "#1976d2" },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: { default: "#121212", paper: "#1d1d1d" },
      text: { primary: "#ffffff" },
      primary: { main: "#bb86fc" },
    },
  });

  const handleThemeChange = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    
    await logout();
     
       toast.success('Logged out successfully!');
       navigate('/login');
};


  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          onSectionChange={handleSectionChange}
          drawerWidth={drawerWidth}
          selectedSection={selectedSection}
          userRole={userData?.role}
          userImage={userData?.img || "https://img.freepik.com/free-photo/portrait-happy-manager-holding-leather-case_1262-5329.jpg"}
          menuItems={allMenuItems[userData?.role]}
         
        />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Topbar
            userName={userData?.name || "User"}
            userEmail={userData?.email || "Email"}
            userRole={userData?.role || "Role"}
            onThemeChange={handleThemeChange}
            onLogout={handleLogout}
            onSectionChange={handleSectionChange}
            drawerWidth={drawerWidth}
            selectedSection={selectedSection}
            menuItems={allMenuItems[userData?.role]}
            userImage={userData?.img || "https://img.freepik.com/free-photo/portrait-happy-manager-holding-leather-case_1262-5329.jpg"}
         
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 1 }}>
            {renderContent()}
          </Box>

          <Box
            component="footer"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              backgroundColor: "grey",
              color: "black",
            }}
          >
            <p>Powered by</p>
            <p>© {currentYear} Task ManageMent Systems</p>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
