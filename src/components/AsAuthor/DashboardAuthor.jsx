import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";

import {
  Stack,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Table,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BalanceIcon from "@mui/icons-material/Balance";
import PaymentsIcon from "@mui/icons-material/Payments";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import CardTopHeader from "../CardTopHeader";

import { readById, readByIdAll } from "../../fetcher";
import {
  getFormattedCurrency,
  convertQuarterStringToDisplay,
} from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useAuth0();
  const [authorRoyalties, setAuthorRoyalties] = React.useState({});
  const [dataHistoryReady, setDataHistoryReady] = React.useState(false);
  const [dataHistory, setDataHistory] = React.useState([]);

  React.useEffect(() => {
    let authorId = user["https://rowanvale-athena/authorId"];

    const getRoyaltyBalance = async () => {
      const result = await readById("author", authorId);
      if (result.result && result.result.length === 1) {
        setAuthorRoyalties(result.result[0]);
      }
    };
    getRoyaltyBalance();

    const retrieveHistory = async () => {
      try {
        const result = await readByIdAll(
          "author",
          "royaltieshistory",
          authorId
        );
        setDataHistory(result.result);
        setDataHistoryReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveHistory();
  }, [user]);

  const getSalesData = () => {
    // reverse oldest first for chart
    let chartHistory = dataHistory.slice().reverse();
    let labels = chartHistory.map((item) =>
      convertQuarterStringToDisplay(item.period)
    );

    let myData = {
      labels: labels,
      datasets: [
        {
          label: "Total Sales",
          data: chartHistory.map((item) => item.paidsalestotal),
          borderColor: "pink",
          backgroundColor: "rgba(1, 50, 32, 0.5)",
        },
        {
          label: "Paid Sales",
          data: chartHistory.map((item) => item.paidsalesthisperiod),
          borderColor: "darkgreen",
          backgroundColor: "rgba(1, 50, 32, 0.5)",
        },
        {
          label: "Free Sales",
          data: chartHistory.map((item) => item.freesalesthisperiod),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return myData;
  };

  const getEarningsData = () => {
    // reverse oldest first for chart
    let chartHistory = dataHistory.slice().reverse();
    let labels = chartHistory.map((item) =>
      convertQuarterStringToDisplay(item.period)
    );

    let myData = {
      labels: labels,
      datasets: [
        {
          label: "Total Earnings",
          data: chartHistory.map((item) => item.royaltiestotal),
          borderColor: "pink",
          backgroundColor: "#329644",
        },
        {
          label: "Earnings",
          data: chartHistory.map((item) => item.royaltiesthisperiod),
          borderColor: "darkgreen",
          backgroundColor: "#ea4e82",
        },
      ],
    };
    return myData;
  };

  const getAccountStatement = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell padding="none">Period</StyledTableCell>
              <StyledTableCell padding="none" align="right">
                Earnings
              </StyledTableCell>
              <StyledTableCell padding="none" align="right">
                Payments
              </StyledTableCell>
              <StyledTableCell padding="none" align="right">
                Balance
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataHistory.map((row) => {
              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row" padding="none">
                    {convertQuarterStringToDisplay(row.period)}
                  </StyledTableCell>
                  <StyledTableCell padding="none" align="right">
                    {getFormattedCurrency(row.royaltiesthisperiod)}
                  </StyledTableCell>
                  <StyledTableCell padding="none" align="right">
                    {getFormattedCurrency(row.paymentsthisperiod)}
                  </StyledTableCell>
                  <StyledTableCell padding="none" align="right">
                    {getFormattedCurrency(row.balance)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

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
                    themeColor="primary.light"
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      align="center"
                      color="primary.light"
                    >
                      {getFormattedCurrency(authorRoyalties.balance)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={1.5}>
                <Card sx={{ height: "128px" }}>
                  <CardTopHeader
                    title="Earnings Due"
                    icon={<BalanceIcon />}
                    themeColor="primary.light"
                  />
                  <CardContent>
                    <Typography
                      variant="h4"
                      align="center"
                      color="primary.light"
                    >
                      {getFormattedCurrency(authorRoyalties.netowed)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={2}>
                <Card>
                  <CardTopHeader
                    title="My Royalties"
                    icon={<BarChartIcon />}
                    themeColor="secondary.dark"
                  />
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
                  <CardTopHeader
                    title="My Payments"
                    icon={<PaymentsIcon />}
                    themeColor="secondary.dark"
                  />
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

              <Grid item md={5}>
                <Card>
                  <CardTopHeader title="Sales" icon={<ShowChartIcon />} />
                  <CardContent>
                    {dataHistoryReady && <Line data={getSalesData()} />}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={3}>
                <Card>
                  <CardTopHeader
                    title="Balance History"
                    icon={<BalanceIcon />}
                  />
                  <CardContent>{getAccountStatement()}</CardContent>
                </Card>
              </Grid>

              <Grid item md={3}>
                <Card>
                  <CardTopHeader
                    title="My Deadlines"
                    icon={<AccessTimeIcon />}
                  />
                  <CardContent>None as yet</CardContent>
                </Card>
              </Grid>

              <Grid item md={5}>
                <Card>
                  <CardTopHeader title="Earnings" icon={<ShowChartIcon />} />
                  <CardContent>
                    {dataHistoryReady && <Bar data={getEarningsData()} />}
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "5px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.light,
  },
}));
