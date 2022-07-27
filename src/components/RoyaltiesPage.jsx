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
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import BarChartIcon from "@mui/icons-material/BarChart";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";

import LoadingOverlay from "./LoadingOverlay";

import CardTopHeader from "./CardTopHeader";
import CardTop from "./CardTop";
import ValidateDialog from "./Royalties/ValidateDialog";

import { readAllByQuery, updateAll } from "../fetcher";
import {
  getQuarterDates,
  getFormattedCurrency,
  getCurrentQuarterYear,
  getNextQuarterYear,
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

const getQuarterString = (quarterYear) => {
  return `${quarterYear.quarter}${quarterYear.year}`;
};

const getCurrentQuarterString = () => {
  let currentQuarter = getCurrentQuarterYear();
  return getQuarterString(currentQuarter);
};

const getNextQuarterString = () => {
  let nextQuarter = getNextQuarterYear();
  return getQuarterString(nextQuarter);
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
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [periodHasRoyalties, setPeriodHasRoyalties] = React.useState(false);
  const [notification, setNotification] = React.useState({
    show: false,
    message: "",
    autoHide: false,
  });
  const [showGrid, setShowGrid] = React.useState(false);
  const [showRoyaltyWarning, setShowRoyaltyWarning] = React.useState(false);
  const [changedRecords, setChangedRecords] = React.useState([]);
  const [validateDialog, setValidateDialog] = React.useState({
    visible: false,
  });

  React.useEffect(() => {
    hasRoyalties(getNextQuarterString());
  }, []);

  const onQuarterChanged = (ev) => {
    setSelectedQuarter(ev.target.value);
  };

  const onThresholdChanged = (ev) => {
    setPaymentThreshold(ev.target.value);
  };

  const onIsUkChanged = (ev) => {
    setNoTax(ev.target.value);
  };

  const hasRoyalties = async (dateQuery) => {
    let query = `period = '${dateQuery}'`;
    let urlquery = `query=${query}`;
    try {
      const result = await readAllByQuery("royalties", urlquery);
      if (result.result && result.result.length > 0) {
        setPeriodHasRoyalties(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveOrders = async (dateQuery, threshold, noTax) => {
    if (showGrid) {
      gridRef.current.api.showLoadingOverlay();
    }
    let query = `balance > ${threshold} AND period = '${dateQuery}'`;
    if (noTax === "1") query = `${query} AND notax=true`;
    if (noTax === "2") query = `${query} AND notax=false`;
    let urlquery = `query=${query}`;
    try {
      const result = await readAllByQuery("royalties", urlquery);
      const filteredResult = result.result.filter(
        (x) => x.terminated === false
      );
      setData(filteredResult);
      setIsSearching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const generateNextPeriod = async (
    currentQuarterString,
    nextQuarterString
  ) => {
    let query = `thisperiod='${currentQuarterString}'&nextperiod='${nextQuarterString}'`;

    try {
      await readAllByQuery("royalties/quarters", query);
      setIsGenerating(false);
      setPeriodHasRoyalties(true);
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

  const generateRoyalties = () => {
    setShowRoyaltyWarning(false);

    let currentQuarterString = getCurrentQuarterString();
    let nextQuarterString = getNextQuarterString();
    setIsGenerating(true);
    generateNextPeriod(currentQuarterString, nextQuarterString);
    setNotification((prevState) => ({
      ...prevState,
      show: true,
      autoHide: true,
      message: "Author royalties have been generated",
    }));
  };

  const renderQuarters = () => {
    let currentQuarter = getCurrentQuarterYear();

    let quarters = [];
    for (let y = currentQuarter.year; y >= currentQuarter.year - 2; y--) {
      if (y > currentQuarter.year - 2) {
        for (let q = 4; q >= 1; q--) {
          if (y === currentQuarter.year && q > currentQuarter.quarter) continue;
          quarters.push(
            <MenuItem key={`${q}${y}`} value={`${q}${y}`}>
              Quarter {q} - {y}
            </MenuItem>
          );
        }
      } else {
        quarters.push(
          <MenuItem key={`0${y}`} value={`0${y}`}>
            {y}
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

  const onValidateClick = (authorid, authorname) => {
    setValidateDialog({ visible: true, authorid, authorname });
  };

  const columnDefs = [
    {
      field: "author",
      flex: 0.5,
      valueFormatter: (params) => params.value,
      cellRenderer: LinkComponent,
    },

    {
      headerName: "Tax Due",
      field: "taxbalance",
      cellStyle: { color: "darkgreen" },
    },
    {
      headerName: "Author Due",
      field: "balance",
      cellStyle: { color: "darkgreen" },
    },
    {
      headerName: "Author Payment",
      field: "paymentsthisperiod",
      editable:
        selectedQuarter === getCurrentQuarterString() && !periodHasRoyalties,
      valueParser: (params) => Number(params.newValue),
    },
    {
      headerName: "Tax Payment",
      field: "taxpaymentsthisperiod",
      editable:
        selectedQuarter === getCurrentQuarterString() && !periodHasRoyalties,
      valueParser: (params) => Number(params.newValue),
    },
    {
      headerName: "Validate",
      cellRenderer: (params) => {
        return (
          <Button
            variant="text"
            onClick={() =>
              onValidateClick(params.data.authorid, params.data.author)
            }
          >
            Validate
          </Button>
        );
      },
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
      let paymentsOnly = data.filter((item) =>
        changedRecords.includes(item.id)
      );

      try {
        await updateAll(paymentsOnly, "royalties");
        setIsSaving(false);
        setNotification((prevState) => ({
          ...prevState,
          show: true,
          autoHide: true,
          message: "Payments saved successfully",
        }));
        setChangedRecords([]);
      } catch (error) {
        console.log(error);
      }
    };
    updatePayments();
  };

  const onCellValueChanged = (ev) => {
    let newItems = [...changedRecords];
    let index = -1;
    index = changedRecords.findIndex((x) => x === ev.data.id);
    if (index === -1) {
      newItems.push(ev.data.id);
    }
    setChangedRecords(newItems);
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
        <Alert severity="success" onClose={() => setNotification(false)}>
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={showRoyaltyWarning}
        onClose={() => setShowRoyaltyWarning(false)}
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          Have you confirmed all payments to authors? Once royalties are
          generated, payments are locked.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRoyaltyWarning(false)}>Cancel</Button>
          <Button onClick={generateRoyalties}>Continue</Button>
        </DialogActions>
      </Dialog>

      <ValidateDialog
        visible={validateDialog.visible}
        authorid={validateDialog.authorid}
        authorname={validateDialog.authorname}
        onCloseDialog={() => setValidateDialog({ visible: false })}
      />

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
              <Grid item md={2}>
                <LoadingButton
                  variant="contained"
                  sx={{ width: "120px" }}
                  onClick={() => setShowRoyaltyWarning(true)}
                  startIcon={<BuildIcon />}
                  loading={isGenerating}
                  loadingPosition="start"
                  disabled={periodHasRoyalties}
                >
                  Generate
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <MuiAlert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              {periodHasRoyalties && (
                <Typography variant="h6">
                  Royalties for the period has already been generated
                </Typography>
              )}
              {!periodHasRoyalties && (
                <Typography variant="h6">
                  Ensure that all payments are entered and correct for the
                  quarter before pressing Generate. No amendments can be made
                  after royalties have been generated!
                </Typography>
              )}
            </MuiAlert>
          </Grid>

          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id="quarter-label">Sales Quarter</InputLabel>
              {renderQuarters()}
            </FormControl>
          </Grid>
          <Grid item md={1}>
            <TextField
              variant="outlined"
              label="Threshold"
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
          <Grid item md={3}>
            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              onClick={onSearchClick}
              color="secondary"
              startIcon={<SearchIcon />}
              loading={isSearching}
              loadingPosition="start"
            >
              Search
            </LoadingButton>
          </Grid>
          <Grid item md={2}>
            <LoadingButton
              variant="contained"
              sx={{ width: "120px", ml: -2 }}
              onClick={savePayments}
              startIcon={<SaveIcon />}
              loading={isSaving}
              loadingPosition="start"
              disabled={changedRecords.length === 0}
            >
              Save
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
                <Grid item md={4}></Grid>

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
                              {parseFloat(params.value) === 0
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
