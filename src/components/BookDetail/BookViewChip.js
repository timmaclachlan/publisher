import React from "react";

import {
  Chip,
} from "@mui/material";


import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const BookViewChip = ({ label, value, color }) => {
  return (
    <Chip
      label={label}
      color={color ? color : "primary"}
      variant={value ? "contained" : value === false ? "outlined" : "contained"}
      icon={value ? <DoneIcon /> : value === false ? <CloseIcon /> : null }
      sx={{ width: 120 }}
    />
  );
};

export default BookViewChip;
