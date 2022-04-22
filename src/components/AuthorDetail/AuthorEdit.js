import React from "react";

import {
  Grid,
  Button,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  Alert
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

const AuthorEdit = ({
  author,
  isNew,
  onUpdateAuthor,
  onUpdateEditMode,
  onDeleteAuthor,
  onSaveAuthor,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const [booksWarning, setBooksWarning] = React.useState(false);

  const handleChange = (name, value) => {
    if (onUpdateAuthor) {
      onUpdateAuthor(name, value);
    }
  };

  const valueChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    if (onDeleteAuthor) {
      onDeleteAuthor();
    }
  };

  const handleDeleteClick = () => {
    if (author.books.length > 0) {
      setBooksWarning(true);
      return;
    }
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      {booksWarning && (
        <Backdrop sx={{ color: "#fff", zIndex: 500 }} open={true} onClick={() => setBooksWarning(false)}>
          <Alert severity="warning" sx={{ height: '60px', pt: 1.5 }}>
            Can't delete author when books assigned.
          </Alert>
        </Backdrop>
      )}
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you wish to delete this author?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            startIcon={<WarningIcon />}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            autoFocus
            onClick={() => setShowDeleteConfirmation(false)}
            startIcon={<CancelIcon />}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
      <form>
        <Grid container spacing={2}>
          <Grid item md={1}>
            <PeopleIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
          </Grid>
          <Grid item md={3}>
            <Typography variant="h4" sx={{ pt: 1 }}>
              {isNew ? "Create Author" : "Edit Author"}
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
                onClick={onSaveAuthor}
              >
                Save
              </Button>

              {!isNew && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
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
    </>
  );
};

export default AuthorEdit;
