import React from "react";

import { Link as RouterLink } from "react-router-dom";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PointOfSale from "@mui/icons-material/PointOfSale";
import StoreIcon from "@mui/icons-material/Store";
import AutoStories from "@mui/icons-material/AutoStories";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

const StaffMenu = () => {
  const [ordersOpen, setOrdersOpen] = React.useState(false);

  return (
    <List component="nav">
      <ListItemLink
        to="/"
        primary="Dashboard"
        icon={<DashboardIcon color="success" />}
      />

      <ListItemButton onClick={() => setOrdersOpen(!ordersOpen)}>
        <ListItemIcon>
          <ShoppingCartIcon color="success" />
        </ListItemIcon>
        <ListItemText primary="Orders" />
        {ordersOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={ordersOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemLink
            to="/orders/retail"
            secondary="Retail"
            icon={<StoreIcon color="success" />}
            sx={{ pl: 3 }}
          />
          <ListItemLink
            to="/orders/consumer"
            secondary="Consumer"
            icon={<PointOfSale color="success" />}
            sx={{ pl: 3 }}
          />
          <ListItemLink
            to="/orders/pagesread"
            secondary="Pages Read"
            icon={<AutoStories color="success" />}
            sx={{ pl: 3 }}
          />
        </List>
      </Collapse>
      <ListItemLink
        to="/authors"
        primary="Authors"
        icon={<PeopleIcon color="success" />}
      />
      <ListItemLink
        to="/books/"
        primary="Books"
        icon={<LayersIcon color="success" />}
      />
      <ListItemLink
        to="/royalties"
        primary="Royalties"
        icon={<BarChartIcon color="success" />}
      />
      <ListItemLink
        to="/reports"
        primary="Reports"
        icon={<AssessmentIcon color="success" />}
      />
    </List>
  );
};

export default StaffMenu;

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
