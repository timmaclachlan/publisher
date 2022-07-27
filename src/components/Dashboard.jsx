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
  Divider,
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
  const [dashboardStats, setDashboardStats] = React.useState(null);

  const loading = dashboardStats === null;

  React.useEffect(() => {
    const getDashboardStats = async () => {
      const result = await readAll("dashboardstat");
      if (result.result && result.result.length === 3) {
        const combined = {
          retail: {
            totalsales: result.result[0].totalsales,
            totalincome: result.result[0].totalincome,
            totalroyalties: result.result[0].totalroyalties,
            totalpaidsales: result.result[0].totalpaidsales,
          },
          kenp: {
            totalsales: result.result[1].totalsales,
            totalincome: result.result[1].totalincome,
            totalroyalties: result.result[1].totalroyalties,
            totalpaidsales: result.result[1].totalpaidsales,
          },
          consumer: {
            totalsales: result.result[2].totalsales,
            totalincome: result.result[2].totalincome,
            totalroyalties: result.result[2].totalroyalties,
            totalpaidsales: result.result[2].totalpaidsales,
          },
        };
        setDashboardStats(combined);
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

  const displayStats = (label, field, isCurrency = true) => {
    return (
      <Stack sx={{ flex: 0.5 }}>
        <>
          <Typography variant="subtitle2" align="center">
            {label}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {displayField(field, 100, 40, "h5", isCurrency)}
          </Typography>
        </>
      </Stack>
    );
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Revenue"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1} direction="row">
                  {displayStats("Retail", dashboardStats?.retail?.totalsales)}
                  <Divider orientation="vertical" flexItem />
                  {displayStats(
                    "Consumer",
                    dashboardStats?.consumer?.totalsales
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats("KENP", dashboardStats?.kenp?.totalsales)}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Income"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1} direction="row">
                  {displayStats("Retail", dashboardStats?.retail?.totalincome)}
                  <Divider orientation="vertical" flexItem />
                  {displayStats(
                    "Consumer",
                    dashboardStats?.consumer?.totalincome
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats("KENP", dashboardStats?.kenp?.totalincome)}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card sx={{ height: "128px" }}>
              <CardTopHeader
                title="Total Royalties"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1} direction="row">
                  {displayStats(
                    "Retail",
                    dashboardStats?.retail?.totalroyalties
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats(
                    "Consumer",
                    dashboardStats?.consumer?.totalroyalties
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats("KENP", dashboardStats?.kenp?.totalroyalties)}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card sx={{ height: "128px", width: "350px" }}>
              <CardTopHeader
                title="Total Paid Copies"
                icon={<ShowChartIcon />}
                themeColor="primary.light"
              />
              <CardContent>
                <Stack spacing={1} direction="row">
                  {displayStats(
                    "Retail",
                    dashboardStats?.retail?.totalpaidsales,
                    false
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats(
                    "Consumer",
                    dashboardStats?.consumer?.totalpaidsales,
                    false
                  )}
                  <Divider orientation="vertical" flexItem />
                  {displayStats(
                    "Pages Read",
                    dashboardStats?.kenp?.totalpaidsales,
                    false
                  )}
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
