import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { getFormattedDate } from "../utils";

import ViewChip from "./ViewChip";
import LoadingOverlay from "./LoadingOverlay";

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
  const gridRef = React.useRef(null);

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
      flex: 0.75,
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
      flex: 1.5,
      cellRenderer: (params) => {
        return (
          <ViewChip
            mykey={`chip-${params.data.id}`}
            label={params.value}
            color="primary"
            variant="outlined"
            size="small"
            width={80}
            value={true}
          />
        );
      },
    },
  ];

  const onGridReady = () => {
    gridRef.current.api.showLoadingOverlay();
  };

  return (
    <>
      <Box
        className="ag-theme-alpine"
        style={{
          height: gridHeight ? gridHeight : 600,
          width: gridWidth ? gridWidth : 900,
        }}
      >
        <AgGridReact
          ref={gridRef}
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
          onGridReady={onGridReady}
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
          }}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Books;
