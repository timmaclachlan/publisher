import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { readAll } from "../fetcher";
import { getFormattedDate, getFormattedCurrency } from "../utils";

import SalesQuarterFilter from "./Filters/SalesQuarterFilter";

const RetailOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const createClick = () => {};

  const columnDefs = [
    { field: "id", flex: 0.75, filter: "agNumberColumnFilter" },
    {
      headerName: "Book Details",
      children: [
        { field: "title", flex: 2.5 },
        { field: "author", columnGroupShow: "open", flex: 1.5 },
      ],
    },
    {
      headerName: "Dates",
      children: [
        {
          field: "orderDate",
          headerName: "Order",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
        {
          field: "dispatchedDate",
          headerName: "Dispatched",
          columnGroupShow: "open",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
        {
          field: "amountReceivedDate",
          headerName: "Received",
          columnGroupShow: "open",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
      ],
    },
    { field: "source" },
    {
      field: "quantity",
      headerName: "Qty",
      flex: 0.75,
      filter: "agNumberColumnFilter",
    },
    {
      field: "amountReceived",
      headerName: "Received",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => getFormattedCurrency(params.value),
    },
    {
      headerName: "Royalties",
      children: [
        {
          field: "royaltyAuthor",
          headerName: "Author",
          filter: "agNumberColumnFilter",
          valueFormatter: (params) => getFormattedCurrency(params.value),
        },
        {
          field: "royaltyPublisher",
          headerName: "Publisher",
          filter: "agNumberColumnFilter",
          valueFormatter: (params) => getFormattedCurrency(params.value),
        },
      ],
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
            flex: 1,
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
