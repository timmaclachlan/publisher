import * as React from "react";

import { Link as RouterLink } from "react-router-dom";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";

function ListItemLink(props) {
  const { icon, to, primary } = props;

  const renderLink = (itemProps) => {
    return <RouterLink to={to} {...itemProps}>{itemProps.children}</RouterLink>;
  };

  return (
    <ListItemButton component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

export const mainListItems = (
  <React.Fragment>
    <ListItemLink to="/" primary="Dashboard" icon={<DashboardIcon />} />
    <ListItemLink to="/sales" primary="Sales" icon={<ShoppingCartIcon />} />
    <ListItemLink to="/authors" primary="Authors" icon={<PeopleIcon />} />
    <ListItemLink to="/books/" primary="Books" icon={<LayersIcon />} />
    <ListItemLink to="/royalties" primary="Royalties" icon={<BarChartIcon />} />
  </React.Fragment>
);
