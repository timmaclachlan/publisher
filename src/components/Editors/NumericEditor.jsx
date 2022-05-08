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
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = props.valueObject[props.field];
    }
  }, [props.valueObject, props.field]);

  const onKeyDown = (event) => {
    if (
      !allowedKeys.includes(event.key) ||
      (props.disallowDecimal && event.key === ".")
    ) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowUp") {
      //setValue(parseInt(value) + 1);
    }

    if (event.key === "ArrowDown") {
      // if (value > 1) {
      //   //setValue(parseInt(value) - 1);
      // }
    }
  };

  const getValue = () => {
    if (inputRef.current) {
      return inputRef.current.value;
    }
  };

  return (
    <TextField
      label={props.label}
      variant="outlined"
      onKeyDown={(event) => onKeyDown(event)}
      onBlur={() => props.onCompleteEdit(getValue())}
      inputRef={inputRef}
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
