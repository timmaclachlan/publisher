import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import { readAll } from "../fetcher";

import LoadingOverlay from "./LoadingOverlay";

const LinkComponent = ({ data }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={"/authors/" + data.id}>
      {data.realname}
    </Button>
  );
};

const AvatarComponent = ({ data }) => {
  const nameSplit = data.realname.split(" ");
  const namemap = nameSplit
    .map((word) => {
      return word[0].toUpperCase();
    })
    .join("");

  return (
    <Avatar
      alt={data.realname}
      src={`/assets/authors/${data.id}.jpg`}
      sx={{
        width: 38,
        height: 38,
        ml: -1,
      }}
    >
      {namemap}
    </Avatar>
  );
};

const Authors = ({ onRecordChange }) => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const gridRef = React.useRef(null);

  const createClick = (event) => {
    navigate("/authors/new");
  };

  const columnDefs = [
    {
      cellRenderer: AvatarComponent,
      flex: 0.25,
      filter: false,
    },
    {
      field: "realname",
      headerName: "Author Name",
      cellRenderer: LinkComponent,
      flex: 1,
    },
    { field: "penname", headerName: "Pen Name", flex: 1 },
    {
      field: "retained",
      headerName: "Retained",
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
          tidyAddressListEntry(params.data.address1),
          tidyAddressListEntry(params.data.address2),
          tidyAddressListEntry(params.data.address3),
          tidyAddressListEntry(params.data.adddress4),
        ].join(", ");
        value = value.replace(", ,", ", ");
        value = tidyAddressListEntry(value);
        return value;
      },
    },
    { field: "location", flex: 1 },
    {
      field: "taxuk",
      flex: 0.5,
      headerName: "In uk",
      valueGetter: (params) => {
        return params.data.taxuk ? "Yes" : "No";
      },
    },
  ];

  const tidyAddressListEntry = (addressEntry) => {
    if (addressEntry) {
      var newstr = addressEntry.replace(/[, ]+$/, "").trim();
      debugger;
      return newstr;
    }
    return "";
  };

  const onGridReady = () => {
    const retrieveAuthors = async () => {
      gridRef.current.api.showLoadingOverlay();
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
          ref={gridRef}
          defaultColDef={{
            resizable: true,
            sortable: true,
            floatingFilter: true,
            filter: "agTextColumnFilter",
            flex: 1,
          }}
          containerStyle={{
            height: 600,
            width: 1500,
          }}
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
          }}
          rowData={authors}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          pagination={true}
          paginationPageSize={15}
          onGridReady={onGridReady}
          suppressNoRowsOverlay={true}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default Authors;
