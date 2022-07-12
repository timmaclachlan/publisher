import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Grid, Button } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

import Books from "./Books";

import { readAll } from "../fetcher";

const BooksPage = ({ onRecordChange }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        setIsLoadingBooks(true);
        const response = await readAll("book");
        setIsLoadingBooks(false);
        setBooks(response.result);
        onRecordChange("");
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBooks();
  }, [onRecordChange]);

  const createClick = (event) => {
    navigate("/books/new");
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <LayersIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Books
          </Typography>
        </Grid>
        <Grid item md={3} />
        <Grid item md={2}>
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 1 }}
            aria-label="add"
            onClick={createClick}
          >
            Create
          </Button>
        </Grid>
      </Grid>
      <Books books={books} gridWidth={1400} isLoadingBooks={isLoadingBooks} />
    </>
  );
};

export default BooksPage;
