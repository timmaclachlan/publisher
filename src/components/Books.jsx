import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { getFormattedDate } from "../utils";

const LinkComponent = ({ data }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={"/books/" + data.id}>
      {data.title}
    </Button>
  );
};

const Books = ({ books, hideAuthorColumn }) => {
  const navigate = useNavigate();
  const createClick = (event) => {
    navigate("/books/new");
  };

  const columnDefs = [
    {
      field: "title",
      flex: 2,
      cellRenderer: LinkComponent,
    },
    {
      field: "publicationdate",
      headerName: "Publication Date",
      valueFormatter: (params) => {
        const dateString = getFormattedDate(params.value);
        return dateString ? dateString : "No date";
      },
    },
    {
      field: "authorname",
      headerName: "Author",
      hide: hideAuthorColumn ? hideAuthorColumn : false,
    },
  ];

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Button
          color="primary"
          variant="contained"
          aria-label="add"
          onClick={createClick}
        >
          Create
        </Button>
      </Box>

      <Box className="ag-theme-alpine" style={{ height: 600, width: 800 }}>
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          pagination={true}
          paginationPageSize={15}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Books;
