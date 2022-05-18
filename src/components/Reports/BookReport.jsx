import React from "react";
import { AgGridReact } from "ag-grid-react";

import { Typography, Box, Grid, Button } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";

import { readById } from "../../fetcher";

const BookReport = () => {
  const [report, setReport] = React.useState([]);

  const columnDefs = [
    {
      headerName: "Author",
      field: "realname",
    },

    { field: "title" },
  ];

  const onGridReady = () => {
    const retrieveReport = async () => {
      try {
        const result = await readById("report", "book");
        setReport(result.result);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveReport();
  };

  return (
    <React.Fragment>
      <Grid container sx={{ width: 1400 }}>
        <Grid item>
          <AssessmentIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Book Report
          </Typography>
        </Grid>
        <Grid item md={5} />
        <Grid item md={3}></Grid>
      </Grid>
      <Box>
        <AgGridReact
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
          rowData={report}
          columnDefs={columnDefs}
          columnHoverHighlight={true}
          frameworkComponents={{}}
          pagination={true}
          paginationPageSize={15}
          onGridReady={onGridReady}
          groupDisplayType={"custom"}
          groupDefaultExpanded={1}
        ></AgGridReact>
      </Box>
    </React.Fragment>
  );
};

export default BookReport;