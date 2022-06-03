import React from "react";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditorialEdit = ({ editorial, onChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <>
      <Grid item md={2}>
        <TextField
          variant="outlined"
          label="Edit Level"
          name="editlevel"
          value={editorial.editlevel}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={2}>
        <TextField
          variant="outlined"
          label="Word Count"
          name="wordcount"
          value={editorial.wordcount}
          onChange={handleChange}
        />
      </Grid>
      <Grid item md={2}>
        <FormControl fullWidth>
          <InputLabel id="blurb-label">Blurb Level</InputLabel>
          <Select
            labelId="blurb-label"
            label="Blurb Level"
            name="blurblevel"
            value={editorial.blurblevel}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>[Not Set]</em>
            </MenuItem>
            <MenuItem value={1}>Level 1</MenuItem>
            <MenuItem value={2}>Level 2</MenuItem>
            <MenuItem value={3}>Level 3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

export default EditorialEdit;
