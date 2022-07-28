import React from "react";
import { AgGridReact } from "ag-grid-react";

import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Skeleton,
  Box,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";

import CardTopHeader from "../CardTopHeader";
import CardTop from "../CardTop";

import LoadingOverlay from "../LoadingOverlay";

import { readByIdAll, readAllByQuery } from "../../fetcher";
import {
  getFormattedCurrency,
  convertQuarterStringToDisplay,
  getFormattedDate,
} from "../../utils";

const HistorySummary = ({
  authorId,
  authorName,
  loading,
  headerTitle,
  headerIcon,
  label1,
  label2,
  label3,
  value1,
  value2,
  value3,
  width,
  height,
  isCurrency = true,
  viewDetails = false,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dataHistory, setDataHistory] = React.useState([]);
  const [visibleHistory, setVisibleHistory] = React.useState(false);
  const [salesHistory, setSalesHistory] = React.useState([]);
  const [salesPeriod, setSalesPeriod] = React.useState("");
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(false);
  const gridRef = React.useRef(null);

  const displayValue = (value) => {
    if (loading) {
      return <Skeleton variant="rectangular" width={width} height={height} />;
    }
    return <Typography variant="h7">{getFormatted(value)}</Typography>;
  };

  const getFormatted = (value) =>
    isCurrency ? getFormattedCurrency(value) : value;

  const onViewDetailsClick = () => {
    setOpenDialog(true);
  };

  const onCloseDialogClick = () => {
    setOpenDialog(false);
  };

  const onGridReady = () => {
    const retrieveHistory = async () => {
      gridRef.current.api.showLoadingOverlay();
      setSalesHistory([]);

      try {
        const result = await readByIdAll(
          "author",
          "royaltieshistory",
          authorId
        );
        setDataHistory(result.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (dataHistory.length === 0) {
      retrieveHistory();
    }
  };

  const getOrdersForPeriod = (ev) => {
    setVisibleHistory(true);
    const retrieveOrders = async (authorid, startperiod, endperiod, period) => {
      let query = `authorid=${authorid}&startperiod='${startperiod}'&endperiod='${endperiod}'`;
      try {
        setIsLoadingHistory(true);
        const result = await readAllByQuery("sales/byquery", query);
        setSalesHistory(result.result);
        setSalesPeriod(convertQuarterStringToDisplay(period));
        setIsLoadingHistory(false);
      } catch (error) {
        console.log(error);
      }
    };
    debugger;
    retrieveOrders(
      ev.data.authorid,
      ev.data.startperiod,
      ev.data.endperiod,
      ev.data.period
    );
  };

  const columnDefs = [
    {
      field: "period",
      flex: 0.25,
      cellRenderer: (params) => convertQuarterStringToDisplay(params.value),
      cellStyle: { color: "darkgreen", fontWeight: "bold" },
    },
    {
      headerName: "Quantities",
      children: [
        {
          field: "paidsalesthisperiod",
          headerName: "Paid",
          flex: 0.25,
          cellRenderer: (params) => {
            return (
              <span>{parseInt(params.value) === 0 ? "-" : params.value}</span>
            );
          },
        },
        {
          field: "freesalesthisperiod",
          headerName: "Free Sales",
          flex: 0.25,
          columnGroupShow: "open",
          cellRenderer: (params) => {
            return (
              <span>{parseFloat(params.value) === 0 ? "-" : params.value}</span>
            );
          },
        },
        {
          field: "pagesreadthisperiod",
          headerName: "Pages Read",
          flex: 0.25,
          columnGroupShow: "open",
          cellRenderer: (params) => {
            return (
              <span>{parseFloat(params.value) === 0 ? "-" : params.value}</span>
            );
          },
        },
      ],
    },
    {
      headerName: "Gross Royalties",
      children: [
        {
          headerName: "Total",
          columnGroupShow: "open",
          field: "royaltiesthisperiod",
          cellStyle: { color: "darkgreen", fontWeight: "bold" },
        },
        {
          headerName: "Sold",
          columnGroupShow: "open",
          field: "royaltiesthisperiod",
          cellStyle: { color: "darkgreen", fontWeight: "bold" },
          cellRenderer: (params) => {
            return (
              <Typography variant="h6">
                {getFormattedCurrency(params.value - params.data.kenproyalties)}
              </Typography>
            );
          },
        },
        {
          headerName: "KENP",
          columnGroupShow: "open",
          field: "kenproyalties",
        },
      ],
    },
    {
      field: "tax",
    },
    {
      headerName: "Net",
      field: "netroyalties",
      cellStyle: { color: "darkgreen", fontWeight: "bold" },
    },
    {
      headerName: "Payments",
      children: [
        {
          headerName: "Tax",
          field: "taxpaymentsthisperiod",
        },
        {
          headerName: "Author",
          field: "paymentsthisperiod",
        },
      ],
    },
    {
      headerName: "Balances",
      children: [
        {
          headerName: "Tax",
          field: "taxbalance",
          cellStyle: { color: "darkgreen", fontWeight: "bold" },
        },
        {
          headerName: "Author",
          field: "balance",
          cellStyle: { color: "darkgreen", fontWeight: "bold" },
        },
      ],
    },
  ];

  const columnDefsSalesHistory = [
    {
      headerName: "Book Title",
      field: "title",
      flex: 0.2,
    },
    {
      headerName: "Dates",
      children: [
        {
          headerName: "Order",
          field: "orderdate",
          cellRenderer: (params) => getFormattedDate(params.value),
          columnGroupShow: "open",
        },
        {
          headerName: "Received",
          field: "dateamountreceived",
          cellRenderer: (params) => getFormattedDate(params.value),
        },
      ],
      flex: 0.2,
    },
    {
      headerName: "Quantity",
      field: "quantity",
    },
    {
      headerName: "Received",
      field: "amountreceived",
      cellRenderer: (params) => getFormattedCurrency(params.value),
    },
    {
      headerName: "Original Amounts",
      children: [
        {
          headerName: "Currency",
          field: "origcurrency",
        },
        {
          headerName: "Gross",
          field: "amountgross",
          cellRenderer: (params) => getFormattedCurrency(params.value),
        },
        {
          headerName: "Net",
          field: "amountnet",
          cellRenderer: (params) => getFormattedCurrency(params.value),
          columnGroupShow: "open",
        },
        {
          headerName: "FX Rate",
          field: "fxrate",
          columnGroupShow: "open",
        },
      ],
    },
    {
      headerName: "Royalty",
      field: "royaltyauthor",
      cellRenderer: (params) => getFormattedCurrency(params.value),
    },
    {
      headerName: "Source",
      field: "salessource",
    },
    {
      headerName: "Method",
      field: "salesmethod",
      flex: 0.2,
    },
    {
      field: "ordertype",
    },
  ];

  const renderGrid = () => {
    if (openDialog)
      return (
        <AgGridReact
          ref={gridRef}
          defaultColDef={{
            flex: 0.15,
            filter: "agNumberColumnFilter",
            cellRenderer: (params) => {
              return (
                <Typography variant="h6">
                  {parseFloat(params.value) === 0
                    ? "-"
                    : getFormattedCurrency(params.value)}
                </Typography>
              );
            },
          }}
          containerStyle={{
            height: 500,
            width: 1400,
          }}
          rowData={dataHistory}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          pagination={true}
          paginationPageSize={15}
          onGridReady={onGridReady}
          onRowClicked={getOrdersForPeriod}
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
          }}
        ></AgGridReact>
      );
    return null;
  };

  const renderSalesHistory = () => {
    if (isLoadingHistory)
      return <Skeleton variant="rectangular" width={1400} height={250} />;

    if (salesHistory.length > 0) {
      return (
        <AgGridReact
          defaultColDef={{
            flex: 0.1,
          }}
          containerStyle={{
            height: 250,
            width: 1400,
          }}
          rowData={salesHistory}
          columnDefs={columnDefsSalesHistory}
        ></AgGridReact>
      );
    }
    return (
      <Typography variant="subtitle1" sx={{ pl: 2 }}>
        No sales history found
      </Typography>
    );
  };

  return (
    <>
      <Dialog open={openDialog} fullScreen maxWidth="xl">
        <CardTop
          title="Royalties / Balance Report"
          onCloseClick={onCloseDialogClick}
          allowClose
          closeIsText
        />
        <DialogTitle>{`${headerTitle} History for ${authorName}`}</DialogTitle>
        <Box className="ag-theme-alpine" sx={{ width: "fit-content" }}>
          {renderGrid()}
        </Box>

        {visibleHistory && (
          <Box className="ag-theme-alpine" sx={{ width: "fit-content" }}>
            <Typography variant="h6" sx={{ pl: 2, pt: 1 }}>
              Sales History for quarter/period {salesPeriod}
            </Typography>
            {renderSalesHistory()}
          </Box>
        )}
      </Dialog>

      <Card>
        <CardTopHeader title={headerTitle} icon={headerIcon} />
        <CardContent>
          <Stack spacing={1} direction="row">
            <Stack sx={{ flex: 0.5 }}>
              {label1 && (
                <>
                  <Typography variant="subtitle2" align="center">
                    {label1}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    {displayValue(value1)}
                  </Typography>
                </>
              )}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack sx={{ flex: 0.5 }}>
              {label2 && (
                <>
                  <Typography variant="subtitle2" align="center">
                    {label2}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    {displayValue(value2)}
                  </Typography>
                </>
              )}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack sx={{ flex: 0.5 }}>
              {label3 && (
                <>
                  <Typography variant="subtitle2" align="center">
                    {label3}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    {displayValue(value3)}
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </CardContent>
        <CardBottom
          viewDetails={viewDetails}
          onViewDetailsClick={onViewDetailsClick}
        />
      </Card>
    </>
  );
};

export default HistorySummary;

const CardBottom = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.dark", height: "26px" }}>
      <Stack direction="row" justifyContent="center">
        {props.viewDetails && (
          <Button
            variant="text"
            size="small"
            color="whitepanel"
            onClick={props.onViewDetailsClick}
          >
            View Details
          </Button>
        )}
      </Stack>
    </Box>
  );
};
