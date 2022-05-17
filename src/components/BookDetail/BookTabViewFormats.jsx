import React from "react";

import { Grid, Card, CardHeader, CardContent } from "@mui/material";

import BookViewFormats from "./BookViewFormats";

const BookTabViewFormats = ({ book }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Card>
          <CardHeader subheader="Formats"></CardHeader>
          <CardContent>
            <BookViewFormats book={book} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BookTabViewFormats;
