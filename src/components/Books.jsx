import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

const LinkComponent = ({ data }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={"/books/" + data.id}>
      {data.title}
    </Button>
  );
};

const Books = ({ books }) => {
  const navigate = useNavigate();

  const createClick = (event) => {
    navigate("/books/new");
  };

  const columnDefs = [
    {
      field: "title",
      width: 350,
      cellRenderer: "LinkComponent",
    },
    { field: "format" },
    { field: "price" },
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

      <Box className="ag-theme-material" style={{ height: 800, width: 800 }}>
        <AgGridReact
          rowData={books}
          columnDefs={columnDefs}
          frameworkComponents={{
            LinkComponent,
          }}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Books;
