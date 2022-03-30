import React from "react";

import { Routes, Route, Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import Dashboard from "./components/Dashboard";
import AuthorsPage from "./components/AuthorsPage";
import BooksPage from "./components/BooksPage";
import BookDetailPage from "./components/BookDetailPage";
import AuthorDetailPage from "./components/AuthorDetailPage";

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      
      ...(!open && {
        width: 80,
      }),
    },
  }),
);

function App() {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              size="large"
              color="inherit"
              aria-label="open menu"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
              Foobar Publishing
            </Typography>
            <IconButton
              edge="end"
              size="large"
              color="inherit"
              aria-label="user account"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <nav aria-label="secondary mailbox folders">
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Sales" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Authors" />
              </ListItemButton>
              <Divider />
              <ListItemText primary="Royalties" />
            </List>
          </nav>
        </Drawer>

        <Box component="main" sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>

        </Box>
      </Box>

      <section>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/authors">Authors</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
            <li>
              <Link to="/royalties">Royalties</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="authors" element={<AuthorsPage />} />
            <Route path="authors/:id" element={<AuthorDetailPage />} />
            <Route path="authors/new" element={<AuthorDetailPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </section>
    </>
  );
}

function NotFound() {
  return <div>Sorry, not found!</div>;
}

export default App;
