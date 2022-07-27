import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Box,
  Grid,
  Button,
  Container,
  Stack,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { readAllSubAll } from "../fetcher";
import { getFormattedDate, getFormattedCurrency } from "../utils";

import SalesQuarterFilter from "./Filters/SalesQuarterFilter";
import LoadingOverlay from "./LoadingOverlay";
import CardTop from "./CardTop";
import CardTopHeader from "./CardTopHeader";

const CustomTooltip = (props) => {
  const data = useMemo(
    () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
    [props.api, props.rowIndex]
  );

  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        backgroundColor: "secondary.light",
        borderColor: "primary.main",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      HELLO!
    </Box>
  );
};

const RetailOrdersPage = () => {
  const gridRef = React.useRef(null);
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleCreateOrderClick = (type) => {
    navigate("/orders/retail/new");
  };

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
    const outputCount = (collection, field, title) => {
      const totalSelected = collection.reduce(
        (prev, curr) => prev + curr[field],
        0
      );

      return (
        <Stack sx={{ pr: 2 }}>
          <Typography variant="subtitle1" align="center">
            {title}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {getFormattedCurrency(totalSelected)}
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
              {outputCount(selected, "amountreceived", "Amount Received")}
              {outputCount(selected, "royaltyauthor", "Author Royalty")}
              {outputCount(selected, "royaltypublisher", "Publisher Royalty")}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardTopHeader title="Filtered Totals"></CardTopHeader>
          <CardContent>
            <Stack direction="horizontal">
              {outputCount(filtered, "amountreceived", "Amount Received")}
              {outputCount(filtered, "royaltyauthor", "Author Royalty")}
              {outputCount(filtered, "royaltypublisher", "Publisher Royalty")}
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
    {
      field: "isfree",
      headerName: "Is Free",
      valueGetter: (params) => {
        return params.data.isfree === "1" ? "Yes" : "No";
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
      tooltipField: "amountreceived",
      tooltipComponentParams: { type: "success" },
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
        const result = await readAllSubAll("order", "retail");
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
          <ShoppingCartIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Retail Orders
          </Typography>
        </Grid>
        <Grid item md={5} />
        <Grid item md={3}>
          <Button variant="contained" onClick={handleCreateOrderClick}>
            Create Retail Order
          </Button>
        </Grid>
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
            tooltipComponent: CustomTooltip,
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
          tooltipShowDelay={1000}
          tooltipMouseTrack={true}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onFilterChanged={onFilterChanged}
        ></AgGridReact>
      </Box>
    </React.Fragment>
  );
};

export default RetailOrdersPage;
