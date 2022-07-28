import React from "react";
import { AgGridReact } from "ag-grid-react";

import { Typography, Box, Dialog, DialogTitle, Skeleton } from "@mui/material";

import LoadingOverlay from "../LoadingOverlay";
import CardTop from "../CardTop";

import { readAllByQuery, readByIdAll } from "../../fetcher";
import {
  getFormattedCurrency,
  convertQuarterStringToDisplay,
  getFormattedDate,
} from "../../utils";

const ValidateDialog = ({ visible, authorid, authorname, onCloseDialog }) => {
  const [dataHistory, setDataHistory] = React.useState([]);
  const [salesHistory, setSalesHistory] = React.useState([]);
  const [salesPeriod, setSalesPeriod] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [visibleHistory, setVisibleHistory] = React.useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = React.useState(false);

  const gridRef = React.useRef(null);

  React.useEffect(() => {
    const retrieveHistory = async () => {
      try {
        setIsLoading(true);
        setSalesHistory([]);

        const result = await readByIdAll(
          "author",
          "royaltieshistory",
          authorid
        );
        setDataHistory(result.result);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (authorid) {
      setVisibleHistory(false);
      retrieveHistory();
    }
  }, [authorid]);

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
    retrieveOrders(
      ev.data.authorid,
      ev.data.startperiod,
      ev.data.endperiod,
      ev.data.period
    );
  };

  const renderGrid = () => {
    if (visible) {
      if (isLoading)
        return <Skeleton variant="rectangular" width={1600} height={400} />;

      return (
        <AgGridReact
          ref={gridRef}
          defaultColDef={{
            flex: 1,
            filter: "agNumberColumnFilter",
            cellRenderer: (params) =>
              parseFloat(params.value) === 0
                ? "-"
                : getFormattedCurrency(params.value),
          }}
          containerStyle={{
            height: 380,
            width: 1500,
          }}
          rowData={dataHistory}
          columnDefs={columnDefsRoyaltiesHistory}
          columnHoverHighlight={true}
          pagination={true}
          paginationPageSize={15}
          onRowClicked={getOrdersForPeriod}
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
          }}
        ></AgGridReact>
      );
    }
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
    <Dialog open={visible} fullScreen maxWidth="xl">
      <CardTop
        title="Royalties / Balance Report"
        onCloseClick={onCloseDialog}
        allowClose
        closeIsText
      />
      <DialogTitle>{`Royalties History for ${authorname} ${authorid}`}</DialogTitle>
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
  );
};

export default ValidateDialog;

const columnDefsRoyaltiesHistory = [
  {
    field: "period",
    cellRenderer: (params) => convertQuarterStringToDisplay(params.value),
    cellStyle: { color: "darkgreen", fontWeight: "bold" },
  },
  {
    headerName: "Quantities",
    children: [
      {
        field: "paidsalesthisperiod",
        headerName: "Paid",
        flex: 0.75,
        cellRenderer: (params) => {
          return (
            <span>{parseInt(params.value) === 0 ? "-" : params.value}</span>
          );
        },
      },
      {
        field: "freesalesthisperiod",
        headerName: "Free Sales",
        columnGroupShow: "open",
        flex: 0.75,
        cellRenderer: (params) => {
          return (
            <span>{parseFloat(params.value) === 0 ? "-" : params.value}</span>
          );
        },
      },
      {
        field: "pagesreadthisperiod",
        headerName: "Pages Read",
        columnGroupShow: "open",
        flex: 0.75,
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
        flex: 0.75,
        field: "royaltiesthisperiod",
        cellStyle: { color: "darkgreen", fontWeight: "bold" },
      },
      {
        headerName: "Sold",
        columnGroupShow: "open",
        flex: 0.75,
        field: "royaltiesthisperiod",
        cellRenderer: (params) =>
          getFormattedCurrency(params.value - params.data.kenproyalties),
      },
      {
        headerName: "KENP",
        columnGroupShow: "open",
        flex: 0.75,
        field: "kenproyalties",
      },
    ],
  },
  {
    field: "tax",
    flex: 0.75,
  },
  {
    headerName: "Net",
    field: "netroyalties",
    flex: 0.75,
    cellStyle: { color: "darkgreen", fontWeight: "bold" },
  },
  {
    headerName: "Payments",
    children: [
      {
        headerName: "Tax",
        flex: 0.75,
        field: "taxpaymentsthisperiod",
      },
      {
        headerName: "Author",
        flex: 0.75,
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
        flex: 0.75,
        cellRenderer: (params) => getFormattedCurrency(params.value),
      },
      {
        headerName: "Author",
        field: "balance",
        cellStyle: { color: "darkgreen", fontWeight: "bold" },
        flex: 0.75,
        cellRenderer: (params) => getFormattedCurrency(params.value),
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
