import React from "react";

import { TextField, InputAdornment } from "@mui/material";

const KEY_BACKSPACE = "Backspace";
const KEY_DELETE = "Delete";
const KEY_ENTER = "Enter";
const KEY_TAB = "Tab";
const KEY_ARROWUP = "ArrowUp";
const KEY_ARROWDOWN = "ArrowDown";
const KEY_ARROWLEFT = "ArrowLeft";
const KEY_ARROWRIGHT = "ArrowRight";

const NumericEditor = (props) => {
  const [value, setValue] = React.useState(props.value);

  const isLeftOrRight = (event) => {
    return [KEY_ARROWLEFT, KEY_ARROWRIGHT].indexOf(event.key) > -1;
  };

  const isKeyPressedNumeric = (event) => {
    return !!/\d/.test(event.key);
  };

  const deleteOrBackspace = (event) => {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.key) > -1;
  };

  const finishedEditingPressed = (event) => {
    const key = event.key;
    return key === KEY_ENTER || key === KEY_TAB;
  };

  const onKeyDown = (event) => {
    if (isLeftOrRight(event) || deleteOrBackspace(event)) {
      event.stopPropagation();
      return;
    }

    if (event.key === KEY_ARROWUP) {
      setValue(parseInt(value) + 1);
    }
    if (event.key === KEY_ARROWDOWN) {
      if (value > 1) {
        setValue(parseInt(value) - 1);
      }
    }

    if (!finishedEditingPressed(event) && !isKeyPressedNumeric(event)) {
      if (event.preventDefault) event.preventDefault();
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
