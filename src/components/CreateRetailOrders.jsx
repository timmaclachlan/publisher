import React from "react";

import { AgGridReact } from "ag-grid-react";

import { Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CreateRetailOrders = () => {
  const columnDefs = [
    {
      field: "realName",
      cellRenderer: "LinkComponent",
      flex: 1,
    },
    { field: "penName", flex: 1 },
    { field: "retained", flex: 0.5 },
    { field: "email", flex: 1 },
    { field: "address", width: 300, flex: 1.5 },
    { field: "location", flex: 1 },
  ];

  return (
    <>
      <Grid container>
        <Grid item>
          <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Create Retail Orders
          </Typography>
        </Grid>
        <Grid item md={3} />
        <Grid item md={2}>
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 1 }}
            aria-label="add"
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Box className="ag-theme-material">
        <AgGridReact
          containerStyle={{
            height: 700,
            width: 1500,
          }}
          columnDefs={columnDefs}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default CreateRetailOrders;
