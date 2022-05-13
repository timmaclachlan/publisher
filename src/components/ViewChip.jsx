import React from "react";

import { Chip, Tooltip } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const ViewChip = ({ label, value, color, tooltip }) => {
  return (
    <Tooltip title={tooltip}>
      <Chip
        label={label}
        color={color ? color : "primary"}
        variant={
          value ? "contained" : value === false ? "outlined" : "contained"
        }
        icon={value ? <DoneIcon /> : value === false ? <CloseIcon /> : null}
        sx={{ width: 120 }}
      />
    </Tooltip>
  );
};

export default ViewChip;
