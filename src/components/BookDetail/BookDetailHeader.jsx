import React from "react";

import { useNavigate } from "react-router-dom";

import { Grid, Button, Typography, Stack } from "@mui/material";

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const BookDetailHeader = ({
  createMode,
  editMode,
  onUpdateEditMode,
  onSaveBook,
  onShowDeleteDialog,
}) => {
  const navigate = useNavigate();

  const RenderViewMode = () => {
    return (
      <>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            View Book
          </Typography>
        </Grid>
        <Grid item md={4} />
        <Grid item md={2}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => navigate("/books")}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item md={2}>
          <Button
            variant="contained"
            sx={{ width: "100px" }}
            color="success"
            startIcon={<EditIcon />}
            onClick={() => onUpdateEditMode(true)}
          >
            Edit
          </Button>
        </Grid>
      </>
    );
  };

  const RenderEditMode = () => {
    return (
      <>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            {createMode ? "Create Book" : "Edit Book"}
          </Typography>
        </Grid>
        <Grid item md={2} />

        <Grid item md={6}>
          <Stack direction="row-reverse" spacing={2}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              color="success"
              sx={{ width: "100px" }}
              onClick={onSaveBook}
            >
              Save
            </Button>

            {!createMode && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onShowDeleteDialog(true)}
              >
                Delete
              </Button>
            )}

            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => onUpdateEditMode(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <LayersIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
      </Grid>
      {(editMode || createMode) && RenderEditMode()}
      {!editMode && RenderViewMode()}
    </Grid>
  );
};

export default BookDetailHeader;
