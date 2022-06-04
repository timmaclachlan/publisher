import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  List,
  Toolbar,
  AppBar,
  Box,
  Container,
  Drawer,
  CssBaseline,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Badge,
  Tooltip,
  Avatar,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";

import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { mainListItems } from "./listItems";
import Breadcrumb from "./components/Breadcrumb";

import Dashboard from "./components/Dashboard";
import AuthorsPage from "./components/AuthorsPage";
import AuthorDetailPage from "./components/AuthorDetailPage";
import BookDetailPage from "./components/BookDetailPage";
import RetailOrdersPage from "./components/RetailOrdersPage";
import CreateRetailOrder from "./components/CreateRetailOrder";
import BooksPage from "./components/BooksPage";
import BookReport from "./components/Reports/BookReport";
import RoyaltiesPage from "./components/RoyaltiesPage";
import NotFound from "./components/NotFound";
import SearchPanel from "./components/SearchPanel";

const LoggedIn = () => {
  const [currentRecord, setCurrentRecord] = React.useState("");
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
          <SearchPanel />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Tooltip title="Open profile">
              <IconButton sx={{ pl: 2 }} onClick={handleOpenUserMenu}>
                <Stack alignItems="center">
                  <Avatar
                    alt={user.name}
                    src={user.picture}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="caption" color="white">
                    {user.nickname}
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
        <List component="nav">{mainListItems}</List>
      </Drawer>

      <Container sx={{ marginTop: "80px", marginLeft: "180px" }}>
        <Breadcrumb record={currentRecord} />

        <Container sx={{ marginTop: "20px", marginLeft: "-20px" }}>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route
              path="authors"
              element={
                <AuthorsPage
                  onRecordChange={(record) => setCurrentRecord(record)}
                />
              }
            />
            <Route
              path="authors/:id"
              element={
                <AuthorDetailPage
                  onRecordChange={(record) => setCurrentRecord(record)}
                />
              }
            />
            <Route path="authors/new" element={<AuthorDetailPage />} />
            <Route
              path="books"
              element={
                <BooksPage
                  onRecordChange={(record) => setCurrentRecord(record)}
                />
              }
            />
            <Route
              path="books/:id"
              element={
                <BookDetailPage
                  onRecordChange={(record) => setCurrentRecord(record)}
                />
              }
            />
            <Route path="books/new" element={<BookDetailPage />} />
            <Route path="orders/retail" element={<RetailOrdersPage />} />
            <Route path="orders/retail/new" element={<CreateRetailOrder />} />
            <Route path="reports" element={<BookReport />} />
            <Route path="royalties" element={<RoyaltiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Container>
    </Box>
  );
};

export default LoggedIn;
