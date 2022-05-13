import React from "react";

import { Typography, Stack, Divider, Tooltip } from "@mui/material";

const PAPERBACK = 1;
const HARDBACK = 2;
const EBOOK = 28;
//const EBOOKNA = 32;
//const KUPAGESREAD = 64;

const BookViewFormats = ({ book }) => {
  const renderFormatDetail = (format, text) => {
    if (book.format & format) {
      return (
        <Typography variant="subtitle1" align="center">
          {text}
        </Typography>
      );
    }
    return null;
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Stack sx={{ flex: 0.25 }}>
          <Typography variant="subtitle2" align="center">
            Format
          </Typography>
          {renderFormatDetail(PAPERBACK, "Paperback")}
          {renderFormatDetail(HARDBACK, "Hardback")}
          {renderFormatDetail(EBOOK, "E-Book")}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flex: 0.25 }}>
          <Typography variant="subtitle2" align="center">
            Price
          </Typography>
          {renderFormatDetail(PAPERBACK, book.paperbackprice)}
          {renderFormatDetail(HARDBACK, book.hardbackprice)}
          {renderFormatDetail(EBOOK, book.ebookprice)}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flex: 0.75 }}>
          <Typography variant="subtitle2" align="center">
            Isbn
          </Typography>
          <Tooltip title="Paperback Isbn">
            <Typography variant="subtitle1" align="center">
              {renderFormatDetail(PAPERBACK, book.paperbackisbn)}
              {renderFormatDetail(HARDBACK, book.hardbackisbn)}
              {renderFormatDetail(EBOOK, book.epubisbn)}
            </Typography>
          </Tooltip>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack sx={{ flex: 0.5 }}>
          <Typography variant="subtitle2" align="center">
            Distributor
          </Typography>

          <Typography variant="subtitle1" align="center">
            Ingram Spark
          </Typography>
          <Typography variant="subtitle1" align="center">
            Ingram Spark
          </Typography>
          <Typography variant="subtitle1" align="center">
            Ingram Spark
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BookViewFormats;
