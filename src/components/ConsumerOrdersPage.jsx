import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import { Typography, Box, Grid } from "@mui/material";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import { readAllSubAll } from "../fetcher";
import { getFormattedDate, getFormattedCurrency } from "../utils";

import SalesQuarterFilter from "./Filters/SalesQuarterFilter";
import LoadingOverlay from "./LoadingOverlay";

const ConsumerOrdersPage = () => {
  const gridRef = React.useRef(null);
  const [orders, setOrders] = useState([]);

  const columnDefs = [
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
          field: "orderdate",
          headerName: "Order",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
        {
          field: "dispatcheddate",
          headerName: "Dispatched",
          //columnGroupShow: "open",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
        {
          field: "isfree",
          headerName: "Is Free",
          valueGetter: (params) => {
            return params.data.isfree ? "Yes" : "No";
          },
        },
        {
          field: "amountreceiveddate",
          headerName: "Received",
          columnGroupShow: "open",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
      ],
    },
    { field: "salessource", headerName: "Source" },
    {
      field: "quantity",
      headerName: "Qty",
      flex: 0.75,
      filter: "agNumberColumnFilter",
    },
    {
      field: "amountreceived",
      headerName: "Received",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => getFormattedCurrency(params.value),
    },
    {
      headerName: "Royalties",
      children: [
        {
          field: "royaltyauthor",
          headerName: "Author",
          filter: "agNumberColumnFilter",
          valueFormatter: (params) => getFormattedCurrency(params.value),
        },
        {
          field: "royaltypublisher",
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
        gridRef.current.api.showLoadingOverlay();
        const result = await readAllSubAll("order", "consumer");
        debugger;
        setOrders(result.result);
      } catch (error) {
        console.log(error);
      }
    };

    retrieveOrders();
  };

  return (
    <React.Fragment>
      <Grid container sx={{ width: 1400 }}>
        <Grid item>
          <PointOfSaleIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Consumer Orders
          </Typography>
        </Grid>
        <Grid item md={5} />
        <Grid item md={3}></Grid>
      </Grid>
      <Box>
        <AgGridReact
          ref={gridRef}
          className="ag-theme-alpine"
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
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
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
    </React.Fragment>
  );
};

export default ConsumerOrdersPage;
