import React from "react";

import { Grid } from "@mui/material";

import EditorialView from "./EditorialView";
import EditorialEdit from "./EditorialEdit";

const TabEditorial = ({ editorial, editMode, onChange }) => {
  return (
    <Grid container spacing={2}>
      {!editMode && <EditorialView editorial={editorial} />}
      {editMode && <EditorialEdit editorial={editorial} onChange={onChange} />}
    </Grid>
  );
};

export default TabEditorial;
