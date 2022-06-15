import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  Stack,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LayersIcon from "@mui/icons-material/Layers";

import { getFavorites } from "../utils";

import Link from "./Link";

const Dashboard = () => {
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

  return (
    <>
      <div>
        <Grid container>
          <Grid item md={3}>
            <Card>
              <CardHeader sx={{ p: 0, m: 0 }} subheader={<CardTop />} />
              <CardContent>{renderFavorites()}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div></div>
    </>
  );
};

export default Dashboard;
