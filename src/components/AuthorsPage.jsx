import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import { readAll } from "../fetcher";

const LinkComponent = ({ data }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={"/authors/" + data.id}>
      {data.realname}
    </Button>
  );
};

const Authors = ({ onRecordChange }) => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const createClick = (event) => {
    navigate("/authors/new");
  };

  const columnDefs = [
    {
      field: "realname",
      cellRenderer: LinkComponent,
      flex: 1,
    },
    { field: "penname", flex: 1 },
    {
      field: "retained",
      flex: 0.5,
      valueGetter: (params) => {
        return params.data.retained ? "Yes" : "No";
      },
    },
    { field: "email", flex: 1 },
    {
      field: "address",
      width: 300,
      flex: 1.5,
      valueGetter: (params) => {
        let value = [
          params.data.address1,
          params.data.address2,
          params.data.address3,
          params.data.address4,
        ].join(",");
        value = value.replace(",,", "");
        if (value.length === 1) value = "";
        return value;
      },
    },
    { field: "location", flex: 1 },
  ];

  const onGridReady = () => {
    const retrieveAuthors = async () => {
      try {
        const response = await readAll("author");
        setAuthors(response.result);
        onRecordChange("");
      } catch (error) {
        console.log(error);
      }
    };
    retrieveAuthors();
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <PeopleIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Authors
          </Typography>
        </Grid>
        <Grid item md={3} />
        <Grid item md={2}>
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 1 }}
            aria-label="add"
            onClick={createClick}
          >
            Create
          </Button>
        </Grid>
      </Grid>

      <Box className="ag-theme-alpine">
        <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            floatingFilter: true,
            filter: "agTextColumnFilter",
            flex: 1,
          }}
          containerStyle={{
            height: 700,
            width: 1500,
          }}
          rowData={authors}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          pagination={true}
          paginationPageSize={15}
          onGridReady={onGridReady}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Authors;
