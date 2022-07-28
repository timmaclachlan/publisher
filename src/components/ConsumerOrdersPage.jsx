import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import { readAllSubAll } from "../fetcher";
import { getFormattedDate, getFormattedCurrency } from "../utils";

import SalesQuarterFilter from "./Filters/SalesQuarterFilter";
import LoadingOverlay from "./LoadingOverlay";

import CardTopHeader from "./CardTopHeader";

const ConsumerOrdersPage = () => {
  const gridRef = React.useRef(null);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const onSelectionChanged = () => {
    var selectedRows = gridRef.current.api.getSelectedRows();
    setSelected(selectedRows);
  };

  const onFilterChanged = (ev) => {
    const rowsToDisplay = ev.api.rowModel.rowsToDisplay;
    const filteredRows = rowsToDisplay.map((item) => item.data);
    setFiltered(filteredRows);
  };

  const getTotals = () => {
    const outputCount = (collection, field, title, isCurrency) => {
      let totalSelected = 0;
      if (isCurrency) {
        totalSelected = collection.reduce(
          (prev, curr) => prev + curr[field],
          0
        );
      } else {
        totalSelected = collection.reduce(
          (prev, curr) => prev + parseInt(curr[field]),
          0
        );
      }

      return (
        <Stack sx={{ pr: 2 }}>
          <Typography variant="subtitle1" align="center">
            {title}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {isCurrency ? getFormattedCurrency(totalSelected) : totalSelected}
          </Typography>
        </Stack>
      );
    };

    return (
      <Stack direction="horizontal" sx={{ pb: 2 }} spacing={5}>
        <Card sx={{ mr: 2 }}>
          <CardTopHeader title="Selected Totals"></CardTopHeader>
          <CardContent>
            <Stack direction="horizontal">
              {outputCount(selected, "amountreceived", "Amount Received", true)}
              {outputCount(selected, "royaltyauthor", "Author Royalty", true)}
              {outputCount(
                selected,
                "royaltypublisher",
                "Publisher Royalty",
                true
              )}
              {outputCount(selected, "quantity", "Quantity", false)}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardTopHeader title="Filtered Totals"></CardTopHeader>
          <CardContent>
            <Stack direction="horizontal">
              {outputCount(filtered, "amountreceived", "Amount Received", true)}
              {outputCount(filtered, "royaltyauthor", "Author Royalty", true)}
              {outputCount(
                filtered,
                "royaltypublisher",
                "Publisher Royalty",
                true
              )}
              {outputCount(filtered, "quantity", "Quantity", false)}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    );
  };

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
          field: "dateamountreceived",
          headerName: "Received",
          columnGroupShow: "open",
          filter: SalesQuarterFilter,
          valueFormatter: (params) => getFormattedDate(params.value),
        },
      ],
    },
    {
      field: "isfree",
      headerName: "Is Free",
      valueGetter: (params) => {
        return params.data.isfree ? "Yes" : "No";
      },
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
        setOrders(result.result);
        setFiltered(result.result);
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
        <Container fixed>{getTotals()}</Container>

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
          rowSelection={"multiple"}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onFilterChanged={onFilterChanged}
        ></AgGridReact>
      </Box>
    </React.Fragment>
  );
};

export default ConsumerOrdersPage;
