import React from "react";

import { Typography, Grid, Skeleton } from "@mui/material";

import LoadingOverlay from "../../../LoadingOverlay";

import { isEmptyObject } from "../../../../utils";

const EditorialView = ({ editorial }) => {
  const loading = isEmptyObject(editorial);

  const displayField = (field, width, height) => {
    return loading ? (
      <Skeleton variant="rectangular" width={width} height={height} />
    ) : field ? (
      field
    ) : (
      "Not set"
    );
  };

  return (
    <>
      <Grid item md={2}>
        <Typography variant="subtitle1">Edit Level</Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="subtitle1">
          {displayField(editorial.editlevel)}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="subtitle1">Word Count</Typography>
      </Grid>
      <Grid item md={1}>
        <Typography variant="subtitle1">
          {displayField(editorial.wordcount)}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Typography variant="subtitle1">Blurb Level</Typography>
      </Grid>
      <Grid item md={1}>
        <Typography variant="subtitle1">
          {displayField(editorial.blurblevel)}
        </Typography>
      </Grid>
    </>
  );
};

export default EditorialView;
