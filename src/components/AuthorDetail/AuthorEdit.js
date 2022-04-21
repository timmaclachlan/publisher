import React from "react";

import { Grid, Button, TextField } from "@mui/material";

const AuthorEdit = ({ author, onUpdateAuthor, onUpdateEditMode, onSaveAuthor }) => {
  const handleChange = (name, value) => {
    if (onUpdateAuthor) {
      onUpdateAuthor(name, value);
    }
  };

  const valueChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item md={8} />

        <Grid item md={2}>
          <Button variant="outlined" onClick={() => onUpdateEditMode(false)}>
            Cancel
          </Button>
        </Grid>

        <Grid item md={2}>
          <Button
            variant="contained"
            onClick={onSaveAuthor}
          >
            Save
          </Button>
        </Grid>

        <Grid item md={6}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={author.name}
            onChange={valueChange}
          />
        </Grid>

        <Grid item md={6}>
          <TextField
            label="Address"
            name="address"
            variant="outlined"
            value={author.address}
            onChange={valueChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthorEdit;
