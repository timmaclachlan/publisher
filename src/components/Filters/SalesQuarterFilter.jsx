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
  debugger;
  const [quarterValue, setQuarterValue] = useState({
    value: "All",
    year: 0,
    quarter: 0,
  });

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      doesFilterPass(params) {
        if (quarterValue.quarter === 0 && quarterValue.year === 0) return true;

        let paramsDate = new Date(params.data[props.colDef.field]);

        if (paramsDate.getFullYear() === parseInt(quarterValue.year)) {
          const compareQuarter = paramsDate.getMonth() / 3 + 1;
          if (compareQuarter === parseInt(quarterValue.quarter)) {
            return true;
          }
        }
        return false;
      },

      isFilterActive() {
        if (quarterValue.quarter === 0 && quarterValue.year === 0) return false;
        return true;
      },

      // this example isn't using getModel() and setModel(),
      // so safe to just leave these empty. don't do this in your code!!!
      getModel() {},

      setModel() {},
    };
  });

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "All") {
      setQuarterValue({ value: "All", year: 0, quarter: 0 });
      return;
    }
    let quarter = event.target.value.substring(0, 1);
    let year = event.target.value.substring(1, 5);
    setQuarterValue({ value: event.target.value, year, quarter });
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [quarterValue, props]);

  const renderQuarters = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const quarter = currentMonth / 3 + 1;

    let quarters = [];
    for (let y = currentYear; y > currentYear - 3; y--) {
      for (let q = 4; q >= 1; q--) {
        if (y === currentYear && q > quarter) continue;
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
        value={quarterValue.value}
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
