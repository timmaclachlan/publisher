import React from "react";

import { Grid } from "@mui/material";

import EditorialView from "./EditorialView";
import EditorialEdit from "./EditorialEdit";

const TabEditorial = ({ editorial, editMode, createMode, onChange }) => {
  return (
    <Grid container spacing={2}>
      {!editMode && !createMode && <EditorialView editorial={editorial} />}
      {(editMode || createMode) && (
        <EditorialEdit editorial={editorial} onChange={onChange} />
      )}
    </Grid>
  );
};

export default TabEditorial;
