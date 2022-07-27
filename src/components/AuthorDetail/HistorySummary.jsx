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

import { readByIdAll } from "../../fetcher";
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
    if (dataHistory.length === 0) retrieveHistory();
  };

  const getOrdersForPeriod = () => {
    debugger;
    alert("here");
  };

  const columnDefs = [
    {
      field: "period",
      cellRenderer: (params) => {
        return (
          <Typography variant="h6">
            {convertQuarterStringToDisplay(params.value)}
          </Typography>
        );
      },
    },
    {
      field: "paidsalesthisperiod",
      headerName: "Copies Sold",
      cellRenderer: (params) => {
        return (
          <Typography variant="h6">
            {parseInt(params.value) === 0 ? "-" : params.value}
          </Typography>
        );
      },
    },
    {
      headerName: "Royalties (Gross)",
      field: "royaltiesthisperiod",
      cellStyle: { color: "darkgreen" },
    },

    {
      headerName: "Royalties (Net)",
      field: "netroyalties",
    },
    {
      field: "tax",
    },
    {
      headerName: "Payments",
      field: "paymentsthisperiod",
    },
    {
      headerName: "Tax Payments",
      field: "taxpaymentsthisperiod",
    },
    {
      field: "balance",
      cellStyle: { color: "darkgreen", fontWeight: "bold" },
      cellRenderer: (params) => (
        <Typography variant="h6">
          {getFormattedCurrency(params.value)}
        </Typography>
      ),
    },
    {
      headerName: "Tax Balance",
      field: "taxbalance",
      cellStyle: { color: "darkgreen", fontWeight: "bold" },
      cellRenderer: (params) => (
        <Typography variant="h6">
          {getFormattedCurrency(params.value)}
        </Typography>
      ),
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
          onRowClicked={() => getOrdersForPeriod()}
          gridOptions={{
            loadingOverlayComponent: LoadingOverlay,
          }}
        ></AgGridReact>
      );
    return null;
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
