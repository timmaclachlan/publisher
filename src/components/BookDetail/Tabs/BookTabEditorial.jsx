import React from "react";

import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const BookTabEditorial = ({ book, editMode }) => {
  const renderControls = () => {
    if (!editMode) {
      return (
        <>
          <Grid item md={1}>
            <Typography variant="subtitle1">Edit Level</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="subtitle1">10</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="subtitle1">Word Count</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="subtitle1">1</Typography>
          </Grid>
          <Grid item md={2}>
            <Typography variant="subtitle1">Blurb Level</Typography>
          </Grid>
          <Grid item md={1}>
            <Typography variant="subtitle1">1</Typography>
          </Grid>
        </>
      );
    } else {
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
                <MenuItem value={1}>Level 1</MenuItem>
                <MenuItem value={2}>Level 2</MenuItem>
                <MenuItem value={3}>Level 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </>
      );
    }
  };
  return (
    <Grid container spacing={2}>
      {renderControls()}
    </Grid>
  );
};

export default BookTabEditorial;