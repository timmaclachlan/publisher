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
  Skeleton,
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
  isEmptyObject,
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
  const loading = isEmptyObject(authorRoyalties);

  React.useEffect(() => {
    let authorId = user["https://rowanvale-athena/authorId"];

    const retrieveHistory = async () => {
      try {
        const result = await readByIdAll(
          "author",
          "royaltieshistory",
          authorId
        );
        if (result.result && result.result.length > 0) {
          setAuthorRoyalties(result.result[0]);
        }
        setDataHistory(result.result);
        setDataHistoryReady(true);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveHistory();
  }, [user]);

  const displayField = (
    field,
    variant = "h4",
    isCurrency = true,
    color = "primary.dark"
  ) => {
    return (
      <Typography variant={variant} align="center" color={color}>
        {loading ? (
          <Skeleton variant="rectangular" animation="wave" />
        ) : isCurrency ? (
          getFormattedCurrency(field)
        ) : (
          field
        )}
      </Typography>
    );
  };

  const getAccountStatement = () => {
    if (!dataHistoryReady) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={350}
          height={300}
        />
      );
    }
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell padding="none">Period</StyledTableCell>
              <StyledTableCell padding="none" align="right">
                Royalties
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
                    title="Balance"
                    icon={<BalanceIcon />}
                    themeColor="primary.light"
                  />
                  <CardContent>
                    {displayField(
                      authorRoyalties.balance,
                      "h4",
                      true,
                      "primary.light"
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={1.5}>
                <Card sx={{ height: "128px" }}>
                  <CardTopHeader
                    title="Royalties Due"
                    icon={<BalanceIcon />}
                    themeColor="primary.light"
                  />
                  <CardContent>
                    {displayField(
                      authorRoyalties.netroyalties,
                      "h4",
                      true,
                      "primary.light"
                    )}
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
                            Quarter
                          </Typography>
                          {displayField(
                            authorRoyalties.royaltiesthisperiod,
                            "h5"
                          )}
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            Total
                          </Typography>
                          {displayField(authorRoyalties.royaltiestotal, "h5")}
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
                            Quarter
                          </Typography>
                          {displayField(
                            authorRoyalties.paymentsthisperiod,
                            "h5"
                          )}
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            Total
                          </Typography>
                          {displayField(authorRoyalties.paymentstotal, "h5")}
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
                            Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {displayField(authorRoyalties.tax, "h5")}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {displayField(authorRoyalties.taxtotal, "h5")}
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
                            Quarter
                          </Typography>
                          <Typography variant="h5" align="center">
                            {displayField(
                              authorRoyalties.paidsalesthisperiod,
                              "h5",
                              false
                            )}
                          </Typography>
                        </>
                      </Stack>
                      <Divider orientation="vertical" flexItem />
                      <Stack sx={{ flex: 0.5 }}>
                        <>
                          <Typography variant="subtitle2" align="center">
                            Total
                          </Typography>
                          <Typography variant="h5" align="center">
                            {displayField(
                              authorRoyalties.paidsalestotal,
                              "h5",
                              false
                            )}
                          </Typography>
                        </>
                      </Stack>
                    </Stack>
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
