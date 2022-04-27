import React from "react";

import { Stack, Divider } from "@mui/material";

import ViewChip from "../ViewChip";

const BookViewOptions = ({ book }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <ViewChip value={book.published} label="Published" />
      <ViewChip label={book.service} color="success" />
      <ViewChip value={book.stillSelling} label="Selling" />
      <ViewChip value={book.terminated} label="Terminated" />
      <ViewChip value={book.onHold} label="On Hold" />
      <ViewChip value={book.matureContent} label="Mature" />
    </Stack>
  );
};

export default BookViewOptions;
