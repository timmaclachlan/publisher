import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { readAll } from "../fetcher";

const RetailOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveOrders = async () => {
      try {
        const result = await readAll("order");
        debugger;
        setOrders(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveOrders();
  }, []);

  const createClick = () => {};

  const columnDefs = [
    { field: "id" },
    { field: "orderDate" },
    { field: "dispatchedDate" },
    { field: "source" },
    { field: "quantity" },
    { field: "amountReceived" },
    { field: "dateAmountReceived" },
  ];

  return (
    <>
      <Grid container>
        <Grid item>
          <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Retail Orders
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

      <Box className="ag-theme-material" style={{ height: 800, width: 1400 }}>
        <AgGridReact
          rowData={orders}
          columnDefs={columnDefs}
          frameworkComponents={{}}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default RetailOrdersPage;
