import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";

import { isEmptyObject } from "../../utils";

export default forwardRef((props, ref) => {
  const [value, setValue] = useState({});
  const [inputValue, setInputValue] = useState("");

  const handleChange = (ev, value) => {
    setValue(value);
  };

  const handleInputChange = (ev, value) => {
    setInputValue(value);
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },
    };
  });

  const getInputValue = () => {
    return inputValue;
  };
  const getValue = () => {
    if (!isEmptyObject(value)) {
      return value;
    }
    return {};
  };

  return (
    <Autocomplete
      options={props.options}
      getOptionLabel={(option) => {
        if (isEmptyObject(option)) {
          return "";
        }
        return option[props.labelField];
      }}
      autoSelect
      onChange={handleChange}
      inputValue={getInputValue()}
      onInputChange={handleInputChange}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ mt: "-8px" }}
          placeholder={"Select a " + props.placeHolder}
        />
      )}
    />
  );
});
