import React from "react";

import { Stack, Divider } from "@mui/material";

import BookViewChip from "./BookViewChip";

const BookViewOptions = ({ book }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <BookViewChip value={book.published} label="Published" />
      <BookViewChip label={book.service} color="success" />
      <BookViewChip value={book.stillSelling} label="Selling" />
      <BookViewChip value={book.terminated} label="Terminated" />
      <BookViewChip value={book.onHold} label="On Hold" />
      <BookViewChip value={book.matureContent} label="Mature" />
    </Stack>
  );
};

export default BookViewOptions;
