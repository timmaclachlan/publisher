import React from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

const AuthorMenu = () => {
  return (
    <List component="nav">
      <ListItemLink
        to="/"
        primary="Dashboard"
        icon={<DashboardIcon color="success" />}
      />

      <ListItemLink
        to="/mydetails"
        primary="My Details"
        icon={<ManageAccountsIcon color="success" />}
      />

      <ListItemLink
        to="/myprojects"
        primary="My Projects"
        icon={<LibraryBooksIcon color="success" />}
      />

      <ListItemLink
        to="/royalties"
        primary="Royalties"
        icon={<BarChartIcon color="success" />}
      />
    </List>
  );
};

export default AuthorMenu;

function ListItemLink(props) {
  const { icon, to, primary, sx, secondary } = props;

  const renderLink = React.forwardRef((itemProps, ref) => {
    return (
      <RouterLink to={to} ref={ref} {...itemProps}>
        {itemProps.children}
      </RouterLink>
    );
  });

  return (
    <ListItemButton component={renderLink} sx={sx}>
      {icon ? <ListItemIcon color="primary">{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} secondary={secondary} />
    </ListItemButton>
  );
}
