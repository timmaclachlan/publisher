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
} from "@mui/material";

import { mainListItems } from "./listItems";
import Breadcrumb from "./components/Breadcrumb";

import Dashboard from "./components/Dashboard";
import AuthorsPage from "./components/AuthorsPage";
import AuthorDetailPage from "./components/AuthorDetailPage";
import BookDetailPage from "./components/BookDetailPage";
import RetailOrdersPage from "./components/RetailOrdersPage";
import CreateRetailOrder from "./components/CreateRetailOrder";
import BooksPage from "./components/BooksPage";
import NotFound from "./components/NotFound";

function App() {
  const [currentRecord, setCurrentRecord] = React.useState("");

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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Container>
    </Box>
  );
}

export default App;
