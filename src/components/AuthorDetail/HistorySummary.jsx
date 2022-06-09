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
} from "../../utils";

const HistorySummary = ({
  authorId,
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
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dataHistory, setDataHistory] = React.useState([]);
  const gridRef = React.useRef(null);

  const displayValue = (value) => {
    if (loading) {
      return <Skeleton variant="rectangular" width={width} height={height} />;
    }
    return <Typography variant="h5">{value}</Typography>;
  };

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
    retrieveHistory();
  };

  const columnDefs = [
    {
      field: "period",
      valueFormatter: (params) => {
        return convertQuarterStringToDisplay(params.value);
      },
    },
    {
      field: "royaltiesthisperiod",
      headerName: "Current",
    },
    {
      field: "royaltiesprevperiod",
      headerName: "Previous",
    },
    {
      field: "royaltiestotal",
      headerName: "Total",
    },
  ];

  return (
    <>
      <Dialog open={openDialog}>
        <CardTop
          title="View Royalties"
          onCloseClick={onCloseDialogClick}
          allowClose
        />
        <DialogTitle>Royalties History</DialogTitle>
        <Box className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            defaultColDef={{
              flex: 0.25,
              filter: "agNumberColumnFilter",
              valueFormatter: (params) => getFormattedCurrency(params.value),
            }}
            containerStyle={{
              height: 500,
              width: 600,
            }}
            rowData={dataHistory}
            columnDefs={columnDefs}
            columnHoverHighlight={true}
            pagination={true}
            paginationPageSize={15}
            onGridReady={onGridReady}
            gridOptions={{
              loadingOverlayComponent: LoadingOverlay,
            }}
          ></AgGridReact>
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
        <CardBottom onViewDetailsClick={onViewDetailsClick} />
      </Card>
    </>
  );
};

export default HistorySummary;

const CardBottom = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.dark", height: "26px" }}>
      <Stack direction="row" justifyContent="center">
        {props.onViewDetailsClick && (
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
