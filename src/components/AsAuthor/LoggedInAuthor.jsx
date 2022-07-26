import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Toolbar,
  AppBar,
  Box,
  Drawer,
  CssBaseline,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";

import AuthorMenu from "./AuthorMenu";
import Dashboard from "./DashboardAuthor";
import RoyaltiesPage from "./RoyaltiesPage";
import MyDetails from "./MyDetails";
import NotFound from "../NotFound";

const LoggedInAuthor = () => {
  const { user } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout } = useAuth0();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box sx={{ marginLeft: 20 }} />
          <Typography variant="h4">Athena</Typography>
          <Typography variant="caption">v2.0</Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Open profile">
              <IconButton sx={{ pl: 2 }} onClick={handleOpenUserMenu}>
                <Stack alignItems="center">
                  <Avatar
                    alt={user.name}
                    src={user.picture}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="caption" color="white">
                    {user.nickname}2
                  </Typography>
                </Stack>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Card>
          <CardMedia
            component="img"
            image="/rowanvale.jpg"
            height="180"
          ></CardMedia>
        </Card>
        <AuthorMenu />
      </Drawer>

      <Box
        sx={{
          marginTop: "80px",
          marginLeft: "180px",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="mydetails" element={<MyDetails />} />
            <Route path="myprojects" element={<MyProjects />} />
            <Route path="royalties" element={<RoyaltiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export const MyProjects = () => {
  return <Typography variant="h3">Coming soon</Typography>
}

export default LoggedInAuthor;
