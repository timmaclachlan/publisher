import * as React from "react";
import { Routes, Route } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";

import {
  List,
  Toolbar,
  AppBar,
  Box,
  Container,
  Drawer,
  CssBaseline
} from "@mui/material";



import { mainListItems } from "./listItems";
import Breadcrumb from "./components/Breadcrumb";

import Dashboard from "./components/Dashboard";
import AuthorsPage from "./components/AuthorsPage";
import AuthorDetailPage from "./components/AuthorDetailPage";
import BooksPage from "./components/BooksPage";
import BookDetailPage from "./components/BookDetailPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Box>
      <CssBaseline />
      <AppBar>
        <Toolbar></Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <Toolbar />
        <List component="nav">{mainListItems}</List>
      </Drawer>

      <Container sx={{ marginTop: "80px", marginLeft: "180px" }}>
       <Breadcrumb />

        <Container sx={{ marginTop: "20px", marginLeft: "-20px" }}>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:id" element={<AuthorDetailPage />} />
          <Route path="authors/new" element={<AuthorDetailPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Container>
      </Container>
    </Box>
  );
}

export default App;
