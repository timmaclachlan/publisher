import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

export default forwardRef((props, ref) => {
  const [quarter, setQuarter] = useState("All");

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      doesFilterPass(params) {
        return params.data.year >= 2010;
      },

      isFilterActive() {
        //return year === "2010";
      },

      // this example isn't using getModel() and setModel(),
      // so safe to just leave these empty. don't do this in your code!!!
      getModel() {},

      setModel() {},
    };
  });

  const handleChange = (event: SelectChangeEvent) => {
    debugger;
    setQuarter(event.target.value);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [quarter, props]);

  const renderQuarters = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const quarter = currentMonth / 3 + 1;

    debugger;
    let quarters = [];
    for (let y = currentYear; y > currentYear - 3; y--) {
      for (let q = 4; q >= 1; q--) {
        quarters.push(
          <MenuItem key={`${q}${y}`} value={`${q}${y}`}>
            Quarter {q} - {y}
          </MenuItem>
        );
      }
    }
    return (
      <Select
        labelId="select-quarter-label"
        label="Sales Quarter"
        onChange={handleChange}
      >
        <MenuItem value={"All"} selected>
          All Quarters
        </MenuItem>
        {quarters}
      </Select>
    );
  };

  return (
    <div style={{ display: "inline-block", width: "200px" }}>
      <Typography variant="h6">Sales Quarter</Typography>
      <FormControl fullWidth>
        <InputLabel id="select-quarter-label">Sales Quarter</InputLabel>
        {renderQuarters()}
      </FormControl>
    </div>
  );
});
