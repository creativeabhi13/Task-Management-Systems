import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Box,
  Tooltip,
  Collapse,
  ButtonBase,
  Card,
} from "@mui/material";
import { MenuOutlined as MenuOutlinedIcon, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { tokens } from "../utils/theme";

function Sidebar({ onSectionChange, drawerWidth, selectedSection, menuItems, userImage, userRole,  }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(
    JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    document.title = `${selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)} - Dashboard`;
  }, [selectedSection]);

 
  const { userData } = useAuth();
  const userName = userData?.name || "User";

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index); // Toggle submenu
  };

  return (
    <>
      {isMobileScreen && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: colors.grey[100],
            zIndex: 1300,
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobileScreen ? "temporary" : "permanent"}
        open={isMobileScreen ? isOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: isCollapsed ? "64px" : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? "64px" : drawerWidth,
            boxSizing: "border-box",
            backgroundColor: colors.primary[400],
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: isCollapsed ? "center" : "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              color: colors.grey[400],
              whiteSpace: "nowrap",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "uppercase",
              fontFamily: "'Roboto', sans-serif",
              transition: "font-size 0.3s, color 0.3s",
              "&:hover": {
                fontSize: "1.2rem",
                color: colors.redAccent[500],
              },
            }}
          >
            {isCollapsed ? "" : userRole}
          </Typography>
          {!isMobileScreen && (
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon sx={{ color: colors.grey[100] }} />
            </IconButton>
          )}
        </Toolbar>
        <Divider />

        {/* User Info */}
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
          <Tooltip
            title={<Typography variant="subtitle1">{userName}</Typography>}
            placement="right"
          >
            <Avatar alt={userName} src={userImage} />
          </Tooltip>
          {!isCollapsed && (
            <Box sx={{ marginLeft: 1 }}>
              <Typography variant="subtitle1" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                {userName}
              </Typography>
            </Box>
          )}
        </Box>
        <Divider />

        {/* Menu Items */}
        <List>
          {menuItems?.map((item, index) => (
            <React.Fragment key={item.name}>
              <Tooltip title={item.name} placement="right">
                <ButtonBase
                  onClick={item.subMenu ? () => handleSubMenuToggle(index) : () => onSectionChange(item.name)}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    backgroundColor: selectedSection === item?.name ? "black" : "transparent",
                    color: selectedSection === item.name ? "white" : colors.grey[100],
                    "&:hover": {
                      backgroundColor: selectedSection === item.name
                        ? "black"
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingY: 1,
                      paddingLeft: 2,
                      paddingRight: isCollapsed ? 2 : 0,
                      width: "100%",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: selectedSection === item?.name ? "white" : colors.grey[100],
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText
                        primary={item?.name}
                        sx={{
                          color: selectedSection === item?.name ? "white" : colors.grey[100],
                        }}
                      />
                    )}
                    {item.subMenu && !isCollapsed && (
                      item.subMenu.length > 0 && (openSubMenu === index ? <ExpandLess /> : <ExpandMore />)
                    )}
                  </ListItem>
                </ButtonBase>
              </Tooltip>

              {/* Submenu */}
              {item.subMenu && (
                <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem) => (
                      <Tooltip title={subItem.name} placement="right" key={subItem.name}>
                        <ButtonBase
                          onClick={() => onSectionChange(subItem.name)}
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            display: "flex",
                            backgroundColor: selectedSection === subItem.name ? "black" : "transparent",
                            color: selectedSection === subItem.name ? "white" : colors.grey[100],
                            "&:hover": {
                              backgroundColor: selectedSection === subItem.name
                                ? "black"
                                : "rgba(255, 255, 255, 0.1)",
                            },
                          }}
                        >
                          <ListItem
                            sx={{
                              pl: 4,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color: selectedSection === subItem.name ? "white" : colors.grey[100],
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            {!isCollapsed && (
                              <ListItemText
                                primary={subItem.name}
                                sx={{
                                  color: selectedSection === subItem.name ? "white" : colors.grey[100],
                                }}
                              />
                            )}
                          </ListItem>
                        </ButtonBase>
                      </Tooltip>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>

      
      
      </Drawer>
    </>
  );
}

export default Sidebar;