import React from "react";
import { styled } from "@mui/material/styles";

import {
  List,
  ListItem,
  ListItemText,
  Grid,
  ListSubheader,
  ListItemButton,
} from "@mui/material";

const RoyaltiesPage = () => {
  const SelectBox = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemText primary="Sent mail" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      </Grid>
    </Grid>
  );
};

export default RoyaltiesPage;
