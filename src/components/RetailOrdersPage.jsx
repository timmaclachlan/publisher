import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { readAll } from "../fetcher";
import { getFormattedDate, getFormattedCurrency } from "../utils";

const RetailOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const createClick = () => {};

  const columnDefs = [
    { field: "id", flex: 0.5, pinned: "left" },
    {
      field: "orderDate",
      valueFormatter: (params) => getFormattedDate(params.value),
      flex: 1,
    },
    {
      field: "dispatchedDate",
      valueFormatter: (params) => getFormattedDate(params.value),
      flex: 1,
    },
    { field: "source" },
    { field: "quantity" },
    {
      field: "amountReceived",
      valueFormatter: (params) => getFormattedCurrency(params.value),
    },
    {
      field: "dateAmountReceived",
      valueFormatter: (params) => getFormattedDate(params.value),
    },
  ];

  const onGridReady = () => {
    const retrieveOrders = async () => {
      try {
        const result = await readAll("order");
        setOrders(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveOrders();
  };

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

      <Box className="ag-theme-alpine">
        <AgGridReact
          defaultColDef={{
            resizable: true,
            sortable: true,
            floatingFilter: true,
            filter: "agTextColumnFilter",
          }}
          containerStyle={{
            height: 700,
            width: 1400,
          }}
          rowData={orders}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          frameworkComponents={{}}
          pagination={true}
          paginationPageSize={15}
          onGridReady={onGridReady}
        ></AgGridReact>
      </Box>
    </>
  );
};

export default RetailOrdersPage;
