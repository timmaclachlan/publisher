import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { getFormattedDate } from "../utils";

import ViewChip from "./ViewChip";

const LinkComponentBook = ({ data }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={"/books/" + data.id}>
      {data.title}
    </Button>
  );
};

const LinkComponentAuthor = ({ data }) => {
  return (
    <Button
      component={RouterLink}
      sx={{ p: 0 }}
      to={"/authors/" + data.authorid}
    >
      {data.authorname}
    </Button>
  );
};

const Books = ({ books, hideAuthorColumn, gridHeight, gridWidth }) => {
  const navigate = useNavigate();
  const createClick = (event) => {
    navigate("/books/new");
  };

  const columnDefs = [
    {
      field: "title",
      flex: 1.5,
      cellRenderer: LinkComponentBook,
    },
    {
      field: "publicationdate",
      headerName: "Publication Date",
      valueFormatter: (params) => {
        const dateString = getFormattedDate(params.value);
        return dateString ? dateString : "No date";
      },
      flex: 0.5,
    },
    {
      field: "authorname",
      headerName: "Author",
      hide: hideAuthorColumn ? hideAuthorColumn : false,
      flex: 0.5,
      cellRenderer: LinkComponentAuthor,
    },
    {
      field: "service",
      headerName: "Services",
      flex: 0.75,
      cellRenderer: (params) => {
        return (
          <ViewChip
            label={params.value}
            color="primary"
            tooltip="Product type"
            variant="outlined"
            size="small"
            width={80}
          />
        );
      },
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

      <Box
        className="ag-theme-alpine"
        style={{ height: gridHeight, width: gridWidth }}
      >
        <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            floatingFilter: true,
            filter: "agTextColumnFilter",
            flex: 1,
          }}
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
