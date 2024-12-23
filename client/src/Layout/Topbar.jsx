import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Box,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logout, Menu } from "@mui/icons-material";

function Topbar({
  userName,
  onThemeChange,
  onLogout,
  onToggleSidebar,
  isCollapsed,
 
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // State for active tab
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleThemeToggle = (event) => {
    onThemeChange(event.target.checked ? "dark" : "light");
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    onLogout();
    handleCloseDialog();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const capitalizedUserName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Show Menu icon only on mobile screens */}
          {fullScreen && (
            <IconButton onClick={onToggleSidebar}>
              <Menu
                sx={{ color: activeTab === "menu" ? "white" : "inherit" }}
              />
            </IconButton>
          )}
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          
            
    
            <Typography
                variant="h6"
                sx={{
              fontWeight: "bold",
                  "&:hover": {
                    fontSize: "1.2rem",
                    transition: "font-size 0.3s",
                  },
                }}
              >
              Welcome, {capitalizedUserName}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "purple",
                  marginLeft: 2, // Adds gap between username and Dashboard
                  "&:hover": {
                    fontSize: "1.2rem",
                    transition: "font-size 0.3s",
                  },
                }}
              >
                Dashboard
              </Typography>
            </Box>
        </Box>
   
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Switch onChange={handleThemeToggle} />
          <IconButton
            color="inherit"
            onClick={handleLogoutClick}
            sx={{ color: activeTab === "logout" ? "white" : "inherit" }} // Set icon color based on active tab
          >
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
      <hr style={{ margin: "0", border: "1px solid #ccc" }} />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: 10,
            padding: 2,
            minWidth: "300px",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          Logout Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "blue",
              "&:hover": {
                backgroundColor: "yellow",
                color: "black",
              },
              padding: "8px 16px",
            }}
          >
            Logout
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "blue",
              "&:hover": {
                backgroundColor: "red",
                color: "black",
              },
              padding: "8px 16px",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Topbar;