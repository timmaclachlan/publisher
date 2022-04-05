import React, { useEffect, useState } from "react";

import { Typography, Grid, Button } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

import Books from "./Books";

import { readAll } from "../fetcher";

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const retrieveBooks = async () => {
      try {
        const result = await readAll("book");
        setBooks(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBooks();
  }, []);

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
      <Books books={books} />
    </>
  );
};

export default BooksPage;
