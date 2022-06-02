import React from "react";

import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const EditorialEdit = () => {
  return (
    <>
      <Grid item md={2}>
        <TextField variant="outlined" label="Edit Level" name="editLevel" />
      </Grid>
      <Grid item md={2}>
        <TextField variant="outlined" label="Word Count" name="wordCount" />
      </Grid>
      <Grid item md={2}>
        <FormControl fullWidth>
          <InputLabel id="blurb-label">Blurb Level</InputLabel>
          <Select labelId="blurb-label" label="Blurb Level">
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
