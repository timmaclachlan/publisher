import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";

const Link = ({ data, field, rootType }) => {
  return (
    <Button component={RouterLink} sx={{ p: 0 }} to={`/${rootType}/` + data.id}>
      {data[field]}
    </Button>
  );
};

export default Link;
