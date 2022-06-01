import React from "react";

import { Grid } from "@mui/material";

import LoadingOverlay from "../../../LoadingOverlay";
import FormatsView from "./FormatsView";
import FormatsEdit from "./FormatsEdit";

import { isEmptyObject } from "../../../../utils";

import { PAPERBACK, HARDBACK, EBOOK } from "./FormatsHelper";

const TabFormats = ({ formats, editMode, onChange, onEnableChange }) => {
  const loading = isEmptyObject(formats);

  const onPaperbackCheckChange = (ev) => {
    onEnableChange(PAPERBACK, ev.target.checked);
  };

  const onHardbackCheckChange = (ev) => {
    onEnableChange(HARDBACK, ev.target.checked);
  };

  const onEbookCheckChange = (ev) => {
    onEnableChange(EBOOK, ev.target.checked);
  };

  return (
    <Grid container spacing={2}>
      {!editMode && (
        <>
          {loading && <LoadingOverlay />}
          <FormatsView formats={formats} />
        </>
      )}
      {editMode && (
        <FormatsEdit
          onChange={onChange}
          onPaperbackCheckChange={onPaperbackCheckChange}
          onHardbackCheckChange={onHardbackCheckChange}
          onEbookCheckChange={onEbookCheckChange}
        />
      )}
    </Grid>
  );
};

export default TabFormats;
