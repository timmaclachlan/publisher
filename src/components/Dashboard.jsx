import React from "react";

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
  Card,
  CardHeader,
  CardContent,
  Stack,
  Grid,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LayersIcon from "@mui/icons-material/Layers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShowChartIcon from "@mui/icons-material/ShowChart";

import { readAll } from "../fetcher";
import { getFavorites, getFormattedCurrency } from "../utils";

import Link from "./Link";

import CardTopHeader from "./CardTopHeader";

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
  const [dashboardStats, setDashboardStats] = React.useState([]);
  const loading = dashboardStats.length === 0;

  React.useEffect(() => {
    const getDashboardStats = async () => {
      const result = await readAll("dashboardstat");
      debugger;
      if (result.result && result.result.length === 1) {
        setDashboardStats(result.result[0]);
      }
    };
    getDashboardStats();
  }, []);

  const renderFavorites = () => {
    let favorites = getFavorites();
    if (favorites.length > 0) {
      return (
        <Stack>
          {favorites.map((item, index) => (
            <Stack key={`stack-${index}`} direction="row" spacing={1}>
              {item.type === "authors" && (
                <PersonIcon key={`icon-${index}`} color="primary" />
              )}
              {item.type === "books" && (
                <LayersIcon key={`icon-${index}`} color="primary" />
              )}
              <Link
                key={`link-${index}`}
                field="title"
                data={item}
                rootType={item.type}
              />
            </Stack>
          ))}
        </Stack>
      );
    }
    return "No favorites";
  };

  const CardTop = () => {
    return (
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" color="white" sx={{ pl: 1 }}>
            Quick Access
          </Typography>
        </Stack>
      </Box>
    );
  };

  const displayField = (
    field,
    width,
    height,
    variant = "h4",
    isCurrency = true
  ) => {
    return loading ? (
      <Skeleton
        variant="rectangular"
        width={width}
        height={height}
        animation="wave"
      />
    ) : (
      <Typography variant={variant} align="center" color="primary.light">
        {isCurrency ? getFormattedCurrency(field) : field}
      </Typography>
    );
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Revenue"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1}>
                  {displayField(dashboardStats.totalsales, 220, 40, "h4")}
                  <Typography variant="caption" align="center">
                    From all time
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={2}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Income"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1}>
                  {displayField(dashboardStats.totalincome, 220, 40, "h4")}
                  <Typography variant="caption" align="center">
                    From all time
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={2}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Paid Sales"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1}>
                  {displayField(
                    dashboardStats.totalpaidsales,
                    220,
                    40,
                    "h4",
                    false
                  )}
                  <Typography variant="caption" align="center">
                    From all time
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardHeader sx={{ p: 0, m: 0 }} subheader={<CardTop />} />
              <CardContent>{renderFavorites()}</CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardTopHeader title="My Deadlines" icon={<AccessTimeIcon />} />
              <CardContent>None as yet</CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div></div>
    </>
  );
};

export default Dashboard;
