import React from "react";

import { Grid } from "@mui/material";

import EditorialView from "./EditorialView";
import EditorialEdit from "./EditorialEdit";

const TabEditorial = ({ editorial, editMode }) => {
  return (
    <Grid container spacing={2}>
      {!editMode && <EditorialView editorial={editorial} />}
      {editMode && <EditorialEdit editorial={editorial} />}
    </Grid>
  );
};

export default TabEditorial;
