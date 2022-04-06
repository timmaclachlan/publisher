import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { Breadcrumbs, Link, Typography } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";


const breadcrumbNameMap = {
  'authors': 'Authors',
  'books': 'Books',
  'sales': 'Sales'
}

const LinkWithRouter = props => <Link {...props} component={RouterLink} />;

const Breadcrumb = ({record}) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x); // filter where not empty string
  debugger;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkWithRouter to="/"
        underline="hover" color="secondary" sx={{ display: "flex", alignItems: "center" }}>
        <DashboardIcon fontSize="inherit" color="secondary" sx={{ mr: 0.5 }} />
        Dashboard
      </LinkWithRouter>

      {pathnames.length === 1 &&
        <Typography color="primary">{pathnames[0][0].toUpperCase() + pathnames[0].substring(1)}</Typography>
      }
      {
        pathnames.length > 1 &&
        <LinkWithRouter to={pathnames[0]}
        underline="hover" color="secondary" sx={{ display: "flex", alignItems: "center" }}>
        <Typography color="primary">{pathnames[0][0].toUpperCase() + pathnames[0].substring(1)}</Typography>
      </LinkWithRouter>
      }

      {record &&
        <Typography color="primary">{record}</Typography>
      }
    </Breadcrumbs>
  );
};

export default Breadcrumb;
