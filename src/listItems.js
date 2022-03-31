import * as React from "react";



import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

function ListItemLink(props) {
  const { icon, primary } = props;


  return (
    <ListItemButton>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const mainListItems = (
  <React.Fragment>
    <ListItemLink primary="Dashboard" icon={<DashboardIcon />} />
    <ListItemLink primary="Sales" icon={<ShoppingCartIcon />} />
    <ListItemLink primary="Authors" icon={<PeopleIcon />} />
    <ListItemLink primary="Books" icon={<LayersIcon />} />
    <ListItemLink primary="Royalties" icon={<BarChartIcon />} />
  </React.Fragment>
);
