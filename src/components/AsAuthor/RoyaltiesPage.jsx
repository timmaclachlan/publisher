import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AgGridReact } from "ag-grid-react";

import {
  List,
  ListItemText,
  Grid,
  ListSubheader,
  ListItemButton,
  Paper,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import {
  getQuarterListForDisplay,
  convertQuarterStringToDisplay,
  getFormattedCurrency,
} from "../../utils";
import { readByIdAll } from "../../fetcher";

const RoyaltiesPage = () => {
  const { user } = useAuth0();
  let authorId = user["https://rowanvale-athena/authorId"];

  const [selectedPeriod, setSelectedPeriod] = React.useState("");
  const [selectedPeriodIndex, setSelectedPeriodIndex] = React.useState(-1);
  const [royalties, setRoyalties] = React.useState([]);
  const [sales, setSales] = React.useState([]);

  React.useEffect(() => {
    const getRoyaltyPeriod = async () => {
      try {
        const result = await readByIdAll("royalties", undefined, authorId);
        if (result.result && result.result.length > 0) {
          setRoyalties(result.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSalesByAuthorId = async () => {
      try {
        const result = await readByIdAll("sales", undefined, authorId);
        if (result.result && result.result.length > 0) {
          setSales(result.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRoyaltyPeriod();
    getSalesByAuthorId();
  }, [authorId]);

  const RenderQuarters = () => {
    let quarters = getQuarterListForDisplay();

    return quarters.map((item, index) => {
      return (
        <ListItemButton
          key={item.value}
          onClick={(ev) => handleQuarterButtonClick(ev, item.value)}
          selected={selectedPeriod === item.value}
        >
          <ListItemText key={item.value} primary={item.label} />
        </ListItemButton>
      );
    });
  };

  const handleQuarterButtonClick = (ev, period) => {
    setSelectedPeriod(period);
    const index = royalties.findIndex((item) => item.period === period);
    setSelectedPeriodIndex(index);
  };

  const getSalesForPeriod = () => {
    let salesPeriod = sales.filter(
      (item) =>
        item.dateamountreceived >= royalties[selectedPeriodIndex].startperiod &&
        item.dateamountreceived <= royalties[selectedPeriodIndex].endperiod
    );
    return salesPeriod;
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="quarters-list-subheader"
          subheader={
            <ListSubheader component="div" id="quarters-list-subheader">
              Royalties Statements
            </ListSubheader>
          }
        >
          {RenderQuarters()}
        </List>
      </Grid>

      <Grid item md={9}>
        <>
          {selectedPeriodIndex > -1 && (
            <>
              <Paper elevation={12} sx={{ mt: 3, mr: 3 }}>
                <Stack spacing={2} sx={{ padding: 2 }}>
                  <Typography variant="h4">
                    Royalties Statement for{" "}
                    {convertQuarterStringToDisplay(selectedPeriod)}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item md={3}>
                      <Typography variant="subtitle1">
                        Balance brought forward
                      </Typography>
                    </Grid>
                    <Grid item md={9}>
                      <Typography variant="h6">
                        {getFormattedCurrency(
                          selectedPeriodIndex > 0
                            ? royalties[selectedPeriodIndex - 1].balance
                            : 0
                        )}
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Typography variant="subtitle1">
                        Royalties this quarter/period
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Typography variant="h6">
                        {getFormattedCurrency(
                          royalties[selectedPeriodIndex].royaltiesthisperiod
                        )}
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Stack direction="row">
                        <Stack spacing={1} sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            Paid Sales
                          </Typography>
                          <Typography variant="h6" align="center">
                            {getFormattedCurrency(
                              royalties[selectedPeriodIndex]
                                .royaltiesthisperiod -
                                royalties[selectedPeriodIndex].kenproyalties
                            )}
                          </Typography>
                        </Stack>
                        <Divider orientation="vertical" flexItem />
                        <Stack spacing={1} sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            Pages Read
                          </Typography>
                          <Typography variant="h6" align="center">
                            {getFormattedCurrency(
                              royalties[selectedPeriodIndex].kenproyalties
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item md={3}></Grid>

                    <Grid item md={3}>
                      <Typography variant="subtitle1">
                        Royalties (Net)
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Typography variant="h6">
                        {getFormattedCurrency(
                          royalties[selectedPeriodIndex].netroyalties
                        )}
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Stack direction="row">
                        <Stack spacing={1} sx={{ flex: 0.5 }}>
                          <Typography variant="subtitle2" align="center">
                            Tax Withheld
                          </Typography>
                          <Typography variant="h6" align="center">
                            {getFormattedCurrency(
                              royalties[selectedPeriodIndex].tax
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item md={3}></Grid>

                    <Grid item md={3}>
                      <Typography variant="subtitle1">
                        Remittance Payment
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Typography variant="h6" color="primary.light">
                        {getFormattedCurrency(
                          royalties[selectedPeriodIndex].paymentsthisperiod
                        )}
                      </Typography>
                    </Grid>

                    <Grid item md={6}></Grid>

                    <Grid item md={3}>
                      <Typography variant="subtitle1">
                        Balance carried forward
                      </Typography>
                    </Grid>

                    <Grid item md={3}>
                      <Typography variant="h6" color="primary.light">
                        {getFormattedCurrency(
                          royalties[selectedPeriodIndex].balance
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Paper>

              <Paper elevation={12} sx={{ mt: 3, mr: 3 }}>
                <Stack spacing={2} sx={{ padding: 2 }}>
                  <Typography variant="h4">
                    Sales Statement for{" "}
                    {convertQuarterStringToDisplay(selectedPeriod)}
                  </Typography>
                  <Box
                    className="ag-theme-alpine"
                    style={{
                      height: 400,
                      width: 1000,
                    }}
                  >
                    <AgGridReact
                      defaultColDef={{
                        resizable: true,
                        sortable: true,
                        flex: 1,
                      }}
                      rowData={getSalesForPeriod()}
                      columnDefs={columnDefs}
                      columnHoverHighlight={true}
                      pagination={true}
                      paginationPageSize={15}
                    ></AgGridReact>
                  </Box>
                </Stack>
              </Paper>
            </>
          )}
        </>
      </Grid>
    </Grid>
  );
};

export default RoyaltiesPage;

const columnDefs = [
  {
    headerName: "Book Title",
    field: "title",
    flex: 1.5,
  },
  {
    headerName: "Sales Amount",
    field: "amountreceived",
    valueFormatter: (params) => getFormattedCurrency(params.value),
  },
  {
    field: "quantity",
  },
  {
    headerName: "Royalty Earned",
    field: "royaltyauthor",
    valueFormatter: (params) => getFormattedCurrency(params.value),
  },
  {
    headerName: "Royalty %",
    field: "royalty",
  },
];
