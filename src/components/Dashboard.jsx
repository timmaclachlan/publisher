import React from "react";

import { Card, CardHeader, CardContent, Stack, Grid } from "@mui/material";

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
            <div>
              <Stack direction="row" spacing={1}>
                {item.type === "authors" && <PersonIcon color="primary" />}
                {item.type === "books" && <LayersIcon color="primary" />}
                <Link field="title" data={item} rootType={item.type} />
              </Stack>
            </div>
          ))}
        </Stack>
      );
    }
    return "No favorites";
  };

  return (
    <>
      <div>
        <Grid container>
          <Grid item md={3}>
            <Card>
              <CardHeader subheader="Quick Access" />
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
