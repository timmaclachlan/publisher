import React from "react";

import { TextField, InputAdornment } from "@mui/material";

const allowedKeys = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "Backspace",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Tab",
];

const NumericEditor = (props) => {
  const [value, setValue] = React.useState(props.value);

  const onKeyDown = (event) => {
    if (
      !allowedKeys.includes(event.key) ||
      (props.disallowDecimal && event.key === ".")
    ) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowUp") {
      setValue(parseInt(value) + 1);
    }

    if (event.key === "ArrowDown") {
      if (value > 1) {
        setValue(parseInt(value) - 1);
      }
    }
  };

  return (
    <TextField
      value={value}
      label={props.label}
      variant="outlined"
      onChange={(event) => setValue(event.target.value)}
      onKeyDown={(event) => onKeyDown(event)}
      onBlur={() => props.onCompleteEdit(value)}
      InputProps={
        props.adornment && {
          startAdornment: (
            <InputAdornment position="start">{props.adornment}</InputAdornment>
          ),
        }
      }
    />
  );
};

export default NumericEditor;
