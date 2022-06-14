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
  Card,
  CardHeader,
  CardContent,
  Stack,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import SaveIcon from "@mui/icons-material/Save";

import LoadingOverlay from "./LoadingOverlay";

import { readAllByQuery, updateAll } from "../fetcher";
import {
  getQuarterDates,
  getFormattedCurrency,
  getCurrentQuarterYear,
  convertQuarterStringToDisplay,
} from "../utils";

const steps = ["Choose Parameters", "Step 2", "Step 3"];

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

const RoyaltiesPage = () => {
  let currentQuarter = getCurrentQuarterYear();
  let currentPaymentThreshold = 20;
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedQuarter, setSelectedQuarter] = React.useState(
    `${currentQuarter.quarter}${currentQuarter.year}`
  );
  const [paymentThreshold, setPaymentThreshold] = React.useState(
    currentPaymentThreshold
  );

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onQuarterChanged = (ev) => {
    setSelectedQuarter(ev.target.value);
  };

  const onThresholdChanged = (ev) => {
    setPaymentThreshold(ev.target.value);
  };

  return (
    <>
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
              <Grid item md={2}>
                <Button
                  variant="contained"
                  sx={{ width: "120px" }}
                  color="success"
                  startIcon={<BuildIcon />}
                >
                  Generate
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button
                  variant="contained"
                  sx={{ width: "100px" }}
                  color="success"
                >
                  Payments
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <>
              {activeStep === 0 && (
                <Step1
                  onQuarterChanged={onQuarterChanged}
                  onThresholdChanged={onThresholdChanged}
                />
              )}
              {activeStep === 1 && (
                <Step2
                  quarter={selectedQuarter}
                  paymentThreshold={paymentThreshold}
                />
              )}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handlePrevStep}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNextStep}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RoyaltiesPage;

const Step1 = ({ onQuarterChanged, onThresholdChanged }) => {
  const renderQuarters = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const quarter = Math.round(currentMonth / 3);

    let currentQuarter = `${quarter}${currentYear}`;

    let quarters = [];
    for (let y = currentYear; y > currentYear - 3; y--) {
      for (let q = 4; q >= 1; q--) {
        if (y === currentYear && q > quarter) continue;
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
        defaultValue={currentQuarter}
        variant="outlined"
        onChange={onQuarterChanged}
      >
        {quarters}
      </Select>
    );
  };

  return (
    <Card>
      <CardTopHeader title="Choose Parameters" />
      <CardContent>
        <Typography variant="subtitle1">
          Choose the parameters to generate the royalties. Pick a sales quarter,
          and optional format.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id="quarter-label">Sales Quarter</InputLabel>
              {renderQuarters()}
            </FormControl>
          </Grid>
          <Grid item md={1.5}>
            <TextField
              variant="outlined"
              label="Payment Threshold"
              defaultValue={20}
              onChange={onThresholdChanged}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Step2 = ({ quarter, paymentThreshold }) => {
  const [data, setData] = React.useState([]);
  const gridRef = React.useRef(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [hasChangedData, setHasChangedData] = React.useState(false);
  const [notification, setNotification] = React.useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });

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

  const onGridReady = () => {
    const retrieveOrders = async (dateQuery, threshold) => {
      gridRef.current.api.showLoadingOverlay();
      try {
        const result = await readAllByQuery(
          "royalties",
          `grossowed > ${threshold} AND period = '${dateQuery}'`
        );
        setData(result.result);
      } catch (error) {
        console.log(error);
      }
    };
    let dateQuery = getQuarterDates(quarter);
    retrieveOrders(dateQuery, paymentThreshold);
  };

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
      <Grid container>
        <Grid item md={8}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5">
              Selected Quarter: {convertQuarterStringToDisplay(quarter)}
            </Typography>
            <Typography variant="h5">
              Threshold: {getFormattedCurrency(paymentThreshold)}
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
              gridOptions={{
                loadingOverlayComponent: LoadingOverlay,
              }}
              rowData={data}
              getRowId={getRowId}
              columnDefs={columnDefs}
              columnHoverHighlight={true}
              pagination={true}
              paginationPageSize={15}
              onGridReady={onGridReady}
              onRowDataChanged={onRowDataChanged}
              onCellValueChanged={onCellValueChanged}
              onCellKeyDown={onCellKeyDown}
              suppressNoRowsOverlay={true}
            ></AgGridReact>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const CardTopHeader = (props) => {
  return (
    <CardHeader
      sx={{ p: 0, m: 0 }}
      subheader={<CardTop title={props.title} />}
    />
  );
};

const CardTop = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" color="white" sx={{ pl: 1 }}>
          {props.title}
        </Typography>
      </Stack>
    </Box>
  );
};
