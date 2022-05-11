import React from "react";

import { Button, Stack } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

const ActionsEditor = ({ rowIndex, onRemoveRow, onEditRow }) => {
  let [editing] = React.useState(false);
  let [disabled] = React.useState(false);

  const onRemoveClick = (event) => {
    if (onRemoveRow) {
      onRemoveRow(rowIndex);
    }
  };

  const onEditClick = (event) => {
    if (onEditRow) {
      onEditRow(rowIndex);
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {editing ? (
        <>
          <Button color="primary" variant="contained" disabled={disabled}>
            Update
          </Button>
          <Button color="secondary" variant="contained" disabled={disabled}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button
            color="primary"
            size="small"
            variant="contained"
            startIcon={<EditIcon />}
            disabled={disabled}
            sx={{ width: "100px" }}
            onClick={onEditClick}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="outlined"
            startIcon={<ClearIcon sx={{ mr: -1 }} />}
            disabled={disabled}
            sx={{ width: "100px" }}
            onClick={onRemoveClick}
          >
            Remove
          </Button>
        </>
      )}
    </Stack>
  );
};

export default ActionsEditor;
