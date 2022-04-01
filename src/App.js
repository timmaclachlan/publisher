import * as React from "react";
import { Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import { mainListItems } from "./listItems";

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
    </Box>
  );
}

export default App;
