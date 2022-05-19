import React, { useEffect, useState } from "react";

import { Typography, Grid } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

import Books from "./Books";

import { readAll } from "../fetcher";

const BooksPage = ({ onRecordChange }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const response = await readAll("book");
        setBooks(response.result);
        onRecordChange("");
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBooks();
  }, [onRecordChange]);

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
      </Grid>
      <Books books={books} gridWidth={1600} />
    </>
  );
};

export default BooksPage;
