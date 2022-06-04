import React from "react";
import { AgGridReact } from "ag-grid-react";

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
} from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";

import { readAllByQuery } from "../fetcher";
import { getFormattedCurrency } from "../utils";

const steps = ["Choose Parameters", "Step 2", "Step 3"];

const RoyaltiesPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedQuarter, setSelectedQuarter] = React.useState("");

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onQuarterChanged = (ev) => {
    setSelectedQuarter(ev.target.value);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item md={10}>
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

          <Grid item md={2}></Grid>

          <Grid item md={6}>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            <>
              {activeStep === 0 && (
                <Step1
                  quarter={selectedQuarter}
                  onQuarterChanged={onQuarterChanged}
                />
              )}
              {activeStep === 1 && <Step2 quarter={selectedQuarter} />}

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

const Step1 = ({ selectedQuarter, onQuarterChanged }) => {
  const renderQuarters = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const quarter = currentMonth / 3 + 1;

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
        onChange={onQuarterChanged}
        value={selectedQuarter}
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

          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id="select-format-label">Format</InputLabel>
              <Select labelId="select-format-label" label="Format">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">Paperback</MenuItem>
                <MenuItem value="2">Hardback</MenuItem>
                <MenuItem value="3">E-Book</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Step2 = ({ quarter }) => {
  const [data, setData] = React.useState([]);

  const columnDefs = [
    {
      field: "dateamountreceived",
      headerName: "Received",
    },
    {
      field: "amountreceived",
      headerName: "Received",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => getFormattedCurrency(params.value),
    },
    {
      field: "royaltyauthor",
      headerName: "Author",
      filter: "agNumberColumnFilter",
      valueFormatter: (params) => getFormattedCurrency(params.value),
    },
    {
      field: "format",
    },
  ];

  const onGridReady = () => {
    const retrieveOrders = async () => {
      try {
        debugger;
        const result = await readAllByQuery("order", quarter);
        setData(result.result);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveOrders();
  };

  return (
    <Box className="ag-theme-alpine">
      <AgGridReact
        defaultColDef={{
          flex: 1,
        }}
        containerStyle={{
          height: 500,
          width: 800,
        }}
        rowData={data}
        columnDefs={columnDefs}
        columnHoverHighlight={true}
        pagination={true}
        paginationPageSize={15}
        onGridReady={onGridReady}
        suppressNoRowsOverlay={true}
      ></AgGridReact>
    </Box>
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
