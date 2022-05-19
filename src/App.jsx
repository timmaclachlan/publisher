import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

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
  InputBase,
  Tooltip,
  Avatar,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
import NotFound from "./components/NotFound";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function App() {
  const [currentRecord, setCurrentRecord] = React.useState("");

  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Box sx={{ marginLeft: 20 }} />
          <Typography variant="h4">Athena</Typography>
          <Typography variant="caption">v2.0</Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
            <Tooltip title="Open settings">
              <IconButton sx={{ pl: 2 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/assets/cat-charlton-photo-300x300_orig.png"
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            </Tooltip>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Container>
    </Box>
  );
}

export default App;
