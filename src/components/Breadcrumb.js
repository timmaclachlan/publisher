import React from "react";

import { Breadcrumbs, Link, Typography } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";

const Breadcrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="secondary"
        underline="hover"
        href="/"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <DashboardIcon fontSize="inherit" color="secondary" sx={{ mr: 0.5 }} />
        Dashboard
      </Link>
      <Typography color="primary">Authors</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
