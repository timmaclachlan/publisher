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
      <ViewChip
        value={book.stillselling}
        label="Selling"
        tooltip="Book is still selling"
      />
      <ViewChip
        value={book.terminated}
        label="Terminated"
        tooltip="Book is terminated"
      />
      <ViewChip value={book.onhold} label="On Hold" tooltip="Book is on hold" />
      <ViewChip
        value={book.maturecontent}
        label="Mature"
        tooltip="Book contains mature content"
      />
    </Stack>
  );
};

export default BookViewOptions;
