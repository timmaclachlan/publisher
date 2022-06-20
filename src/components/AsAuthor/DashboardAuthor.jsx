import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Stack,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BalanceIcon from "@mui/icons-material/Balance";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import AuthorRoyalties from "../AuthorDetail/AuthorRoyalties";
import CardTopHeader from "../CardTopHeader";

import { readById } from "../../fetcher";
import { getFormattedCurrency } from "../../utils";

const Dashboard = () => {
  const { user } = useAuth0();
  const [authorRoyalties, setAuthorRoyalties] = React.useState({});

  React.useEffect(() => {
    const getRoyaltyBalance = async () => {
      let authorId = user["https://rowanvale-athena/authorId"];
      const result = await readById("author", authorId);
      if (result.result && result.result.length === 1) {
        setAuthorRoyalties(result.result[0]);
      }
    };
    getRoyaltyBalance();
  }, [user]);

  return (
    <>
      <Stack direction="row">
        <Box sx={{ width: "100%" }}>
          <Stack direction="row">
            <Grid container spacing={2}>
              <Grid item md={1}>
                <DashboardIcon color="primary" sx={{ fontSize: 60 }} />
              </Grid>
              <Grid item md={10}>
                <Typography variant="h4" sx={{ pt: 1, ml: -7 }}>
                  My Dashboard
                </Typography>
              </Grid>

              <Grid item md={1.5}>
                <Card sx={{ height: "128px" }}>
                  <CardTopHeader
                    title="Account Balance"
                    icon={<BalanceIcon />}
                  />
                  <CardContent>
                    <Typography variant="h4" align="center">
                      {getFormattedCurrency(authorRoyalties.balance)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={1.5}>
                <Card sx={{ height: "128px" }}>
                  <CardTopHeader title="Earnings Due" icon={<BalanceIcon />} />
                  <CardContent>
                    <Typography variant="h4" align="center">
                      {getFormattedCurrency(authorRoyalties.netowed)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card>
                  <CardTopHeader title="My Royalties" icon={<BarChartIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            This Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(
                              authorRoyalties.royaltiesthisperiod
                            )}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            In Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(
                              authorRoyalties.royaltiestotal
                            )}
                          </Typography>
                        </>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card>
                  <CardTopHeader title="My Payments" icon={<PaymentsIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            This Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(
                              authorRoyalties.paymentsthisperiod
                            )}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            In Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(
                              authorRoyalties.paymentstotal
                            )}
                          </Typography>
                        </>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card>
                  <CardTopHeader title="Tax Deducted" icon={<PaymentsIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            This Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(authorRoyalties.tax)}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            In Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {getFormattedCurrency(authorRoyalties.taxtotal)}
                          </Typography>
                        </>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card>
                  <CardTopHeader title="Paid Sales" icon={<ShowChartIcon />} />
                  <CardContent>
                    <Stack spacing={1} direction="row">
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            This Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {authorRoyalties.paidsalesthisperiod}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            In Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {authorRoyalties.paidsalestotal}
                          </Typography>
                        </>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
