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
        debugger;
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
    return undefined;
  };

  return (
    <Autocomplete
      style={{ padding: "0 10px" }}
      options={props.options}
      getOptionLabel={(option) => {
        return option[props.labelField];
      }}
      autoSelect
      isOptionEqualToValue={(option, value) => {
        return option[props.idField] === value[props.idField];
      }}
      value={getValue()}
      onChange={handleChange}
      inputValue={getInputValue()}
      onInputChange={handleInputChange}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          style={{ padding: "5px 0" }}
          placeholder={"Select a " + props.placeHolder}
        />
      )}
    />
  );
});
