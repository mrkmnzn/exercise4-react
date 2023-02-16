import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ onLogout }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management App
          </Typography>
          <Button color="inherit" LinkComponent={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" onClick={onLogout}>
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
