import React from "react";

import { Grid } from "@mui/material";

import LoadingOverlay from "../../../LoadingOverlay";
import FormatsView from "./FormatsView";
import FormatsEdit from "./FormatsEdit";

import { isEmptyObject } from "../../../../utils";

import { PAPERBACK, HARDBACK, EBOOK, getFormatEnabled } from "./FormatsHelper";

const TabFormats = ({
  formats,
  editMode,
  createMode,
  onChange,
  onEnableChange,
}) => {
  const loading = isEmptyObject(formats);

  let paperbackEnabled = getFormatEnabled(formats, PAPERBACK);
  let hardbackEnabled = getFormatEnabled(formats, HARDBACK);
  let ebookEnabled = getFormatEnabled(formats, EBOOK);

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
      {!editMode && !createMode && (
        <>
          {loading && <LoadingOverlay />}
          <FormatsView formats={formats} />
        </>
      )}
      {(editMode || createMode) && (
        <FormatsEdit
          formats={formats}
          onChange={onChange}
          onPaperbackCheckChange={onPaperbackCheckChange}
          onHardbackCheckChange={onHardbackCheckChange}
          onEbookCheckChange={onEbookCheckChange}
          paperbackEnabled={paperbackEnabled}
          hardbackEnabled={hardbackEnabled}
          ebookEnabled={ebookEnabled}
        />
      )}
    </Grid>
  );
};

export default TabFormats;
