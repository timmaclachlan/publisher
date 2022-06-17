import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import BarChartIcon from "@mui/icons-material/BarChart";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import LoadingOverlay from "./LoadingOverlay";

import { readAllByQuery, updateAll } from "../fetcher";
import {
  getQuarterDates,
  getFormattedCurrency,
  getCurrentQuarterYear,
  convertQuarterStringToDisplay,
} from "../utils";

const LinkComponent = ({ data }) => {
  return (
    <Button
      component={RouterLink}
      sx={{ p: 0 }}
      to={"/authors/" + data.authorid}
    >
      {data.author}
    </Button>
  );
};

const getCurrentQuarterString = () => {
  let currentQuarter = getCurrentQuarterYear();
  return `${currentQuarter.quarter}${currentQuarter.year}`;
};

const RoyaltiesPage = () => {
  let currentPaymentThreshold = 20;
  const [selectedQuarter, setSelectedQuarter] = React.useState(
    getCurrentQuarterString()
  );
  const [paymentThreshold, setPaymentThreshold] = React.useState(
    currentPaymentThreshold
  );
  const [noTax, setNoTax] = React.useState("0");

  const [data, setData] = React.useState([]);
  const gridRef = React.useRef(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [hasChangedData, setHasChangedData] = React.useState(false);
  const [notification, setNotification] = React.useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });
  const [showGrid, setShowGrid] = React.useState(false);

  const onQuarterChanged = (ev) => {
    setSelectedQuarter(ev.target.value);
  };

  const onThresholdChanged = (ev) => {
    setPaymentThreshold(ev.target.value);
  };

  const onIsUkChanged = (ev) => {
    setNoTax(ev.target.value);
  };

  const retrieveOrders = async (dateQuery, threshold, noTax) => {
    if (showGrid) {
      gridRef.current.api.showLoadingOverlay();
    }
    let query = `grossowed > ${threshold} AND period = '${dateQuery}'`;
    if (noTax === "1") query = `${query} AND notax=true`;
    if (noTax === "2") query = `${query} AND notax=false`;
    try {
      const result = await readAllByQuery("royalties", query);
      setData(result.result);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchClick = (ev) => {
    let dateQuery = getQuarterDates(selectedQuarter);
    setIsSearching(true);
    setShowGrid(true);
    retrieveOrders(dateQuery, paymentThreshold, noTax);
  };

  const renderQuarters = () => {
    let currentQuarter = getCurrentQuarterYear();

    let quarters = [];
    for (let y = currentQuarter.year; y > currentQuarter.year - 3; y--) {
      for (let q = 4; q >= 1; q--) {
        if (y === currentQuarter.year && q > currentQuarter.quarter) continue;
        quarters.push(
          <MenuItem key={`${q}${y}`} value={`${q}${y}`}>
            Quarter {q} - {y}
          </MenuItem>
        );
      }
    }

    return (
      <Select
        labelId="select-quarter-label"
        label="Sales Quarter"
        defaultValue={selectedQuarter}
        variant="outlined"
        onChange={onQuarterChanged}
      >
        {quarters}
      </Select>
    );
  };

  const columnDefs = [
    {
      field: "author",
      flex: 0.5,
      valueFormatter: (params) => params.value,
      cellRenderer: LinkComponent,
    },

    {
      headerName: "Owed (Gross)",
      field: "grossowed",
    },
    {
      field: "tax",
    },
    {
      headerName: "Owed (Net)",
      field: "netowed",
      cellStyle: { color: "darkgreen" },
    },
    {
      headerName: "Payment",
      field: "paymentsthisperiod",
      editable: true,
      valueParser: (params) => Number(params.newValue),
    },
  ];

  // https://stackblitz.com/edit/react-hooks-complex-editor?file=src%2FComponents%2FEditors%2FAsyncValidationEditor.jsx

  const onRowDataChanged = () => {
    if (data.length > 0) {
      setTimeout(() => {
        gridRef.current.api.startEditingCell({
          rowIndex: 0,
          colKey: "paymentsthisperiod",
        });
      }, 200);
    }
  };

  const savePayments = (ev) => {
    const updatePayments = async () => {
      setIsSaving(true);
      try {
        await updateAll(data, "royalties");
        setIsSaving(false);
        setNotification((prevState) => ({
          ...prevState,
          show: true,
          severity: "success",
          autoHide: true,
          message: "Payments saved successfully",
        }));
        setHasChangedData(false);
      } catch (error) {
        console.log(error);
      }
    };
    updatePayments();
  };

  const onCellValueChanged = () => {
    setHasChangedData(true);
  };

  const onCellKeyDown = (ev) => {
    let key = ev.event.key;

    const editingCells = ev.api.getEditingCells();
    const rowIndex = editingCells[0].rowIndex;
    const colKey = editingCells[0].column.colId;

    if (key === "ArrowDown") {
      ev.api.stopEditing();
      ev.api.startEditingCell({
        rowIndex: rowIndex + 1,
        colKey: colKey,
      });
    }
    if (key === "ArrowUp") {
      if (rowIndex > 0) {
        ev.api.stopEditing();
        ev.api.startEditingCell({
          rowIndex: rowIndex - 1,
          colKey: colKey,
        });
      }
    }
  };

  const getRowId = (params) => params.data.id;

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={20} ref={ref} variant="filled" {...props} />;
  });

  const getTaxOption = () => {
    if (noTax === "0") return "Both";
    if (noTax === "1") return "UK Only";
    if (noTax === "2") return "Non-UK Only";
  };

  const loadingOverlayComponent = React.useMemo(() => {
    return LoadingOverlay;
  }, []);

  return (
    <>
      <Snackbar
        open={notification.show}
        autoHideDuration={notification.autoHide ? 5000 : null}
        onClose={() => setNotification(false)}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification(false)}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Grid container>
              <Grid item md={1}>
                <BarChartIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
              </Grid>
              <Grid item md={3}>
                <Typography variant="h4" sx={{ pt: 1 }}>
                  Royalties
                </Typography>
              </Grid>
              <Grid item md={4} />
              <Grid item md={2}></Grid>
              <Grid item md={2}></Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id="quarter-label">Sales Quarter</InputLabel>
              {renderQuarters()}
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <TextField
              variant="outlined"
              label="Payment Threshold"
              defaultValue={20}
              onChange={onThresholdChanged}
            />
          </Grid>
          <Grid item md={2}>
            <FormControl fullWidth>
              <InputLabel id="select-tax-label">UK/Non-UK</InputLabel>
              <Select
                labelId="select-tax-label"
                label="UK/Non-UK"
                variant="outlined"
                defaultValue="0"
                onChange={onIsUkChanged}
              >
                <MenuItem value="0">Both</MenuItem>
                <MenuItem value="1">UK Only</MenuItem>
                <MenuItem value="2">Non-UK Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              onClick={onSearchClick}
              startIcon={<SearchIcon />}
              loading={isSearching}
              loadingPosition="start"
            >
              Search
            </LoadingButton>
          </Grid>

          {showGrid && (
            <Grid item md={12}>
              <Grid container>
                <Grid item md={8}>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="h5">
                      Selected Quarter:{" "}
                      {convertQuarterStringToDisplay(selectedQuarter)}
                    </Typography>
                    <Typography variant="h5">
                      Threshold: {getFormattedCurrency(paymentThreshold)}
                    </Typography>
                    <Typography variant="h5">
                      UK/Non-UK: {getTaxOption()}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item md={4}>
                  <LoadingButton
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={savePayments}
                    startIcon={<SaveIcon />}
                    loading={isSaving}
                    loadingPosition="start"
                    disabled={!hasChangedData}
                  >
                    Save
                  </LoadingButton>
                </Grid>

                <Grid item md={12}>
                  <Box className="ag-theme-alpine">
                    <AgGridReact
                      ref={gridRef}
                      defaultColDef={{
                        flex: 0.25,
                        filter: "agNumberColumnFilter",
                        cellRenderer: (params) => {
                          return (
                            <Typography variant="h6">
                              {parseInt(params.value) === 0
                                ? "-"
                                : getFormattedCurrency(params.value)}
                            </Typography>
                          );
                        },
                      }}
                      containerStyle={{
                        height: 500,
                        width: 1200,
                      }}
                      loadingOverlayComponent={loadingOverlayComponent}
                      rowData={data}
                      getRowId={getRowId}
                      columnDefs={columnDefs}
                      columnHoverHighlight={true}
                      pagination={true}
                      paginationPageSize={15}
                      onRowDataChanged={onRowDataChanged}
                      onCellValueChanged={onCellValueChanged}
                      onCellKeyDown={onCellKeyDown}
                      suppressNoRowsOverlay={true}
                    ></AgGridReact>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default RoyaltiesPage;
