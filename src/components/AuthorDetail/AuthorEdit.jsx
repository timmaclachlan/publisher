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
  Alert,
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

import ViewChip from "../ViewChip";

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

  const checkedChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
  };

  const toggleChange = (name) => {
    handleChange(name, !author[name]);
  };

  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    if (onDeleteAuthor) {
      onDeleteAuthor();
    }
  };

  // const handleDeleteClick = () => {
  //   if (author.books.length > 0) {
  //     setBooksWarning(true);
  //     return;
  //   }
  //   setShowDeleteConfirmation(true);
  // };

  return (
    <>
      {booksWarning && (
        <Backdrop
          sx={{ color: "#fff", zIndex: 500 }}
          open={true}
          onClick={() => setBooksWarning(false)}
        >
          <Alert severity="warning" sx={{ height: "60px", pt: 1.5 }}>
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
                  onClick={() => setShowDeleteConfirmation(true)}
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

          <Grid item md={8}>
            <TextField
              label="Real Name"
              name="realname"
              variant="outlined"
              value={author.realname}
              onChange={valueChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item md={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="taxuk"
                    onChange={checkedChange}
                    checked={author.taxuk}
                  />
                }
                label="UK"
              />
            </FormGroup>
          </Grid>

          <Grid item md={3}>
            <Stack spacing={2} direction="row">
              <ViewChip
                label="Active"
                value={author.active}
                color="primary"
                width={100}
                onClick={() => toggleChange("active")}
              />
              <ViewChip
                label="Retained"
                value={author.retained}
                color="primary"
                width={100}
                onClick={() => toggleChange("retained")}
              />
            </Stack>
          </Grid>

          <Grid item md={9}>
            <Card>
              <CardHeader subheader="Personal Details"></CardHeader>
              <CardContent>
                <Grid container columnSpacing={2}>
                  <Grid item md={4}>
                    <Stack spacing={2}>
                      <TextField
                        label="Pen Name"
                        name="penname"
                        variant="outlined"
                        value={author.penname}
                        onChange={valueChange}
                        fullWidth
                      />
                      <TextField
                        label="Website"
                        name="website"
                        variant="outlined"
                        value={author.website}
                        onChange={valueChange}
                        fullWidth
                      />
                    </Stack>
                  </Grid>

                  <Grid item md={5}>
                    <Stack spacing={2}>
                      <TextField
                        label="Email 1"
                        name="email"
                        variant="outlined"
                        value={author.email}
                        onChange={valueChange}
                        fullWidth
                        required
                      />
                      <TextField
                        label="Email 2"
                        name="email2"
                        variant="outlined"
                        value={author.email2}
                        onChange={valueChange}
                        fullWidth
                      />
                    </Stack>
                  </Grid>

                  <Grid item md={3}>
                    <Stack spacing={2}>
                      <TextField
                        label="Phone 1"
                        name="phonenumber"
                        variant="outlined"
                        value={author.phonenumber}
                        onChange={valueChange}
                        fullWidth
                      />
                      <TextField
                        label="Phone 2"
                        name="phonenumber2"
                        variant="outlined"
                        value={author.phonenumber2}
                        onChange={valueChange}
                        fullWidth
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardHeader subheader="Banking Details"></CardHeader>
              <CardContent>
                <Stack spacing={2}>
                  <Stack spacing={1} direction="row">
                    <TextField
                      label="Sort Code"
                      name="sortcode"
                      variant="outlined"
                      value={author.sortcode}
                      onChange={valueChange}
                      fullWidth
                    />
                    <TextField
                      label="Account"
                      name="accountno"
                      variant="outlined"
                      value={author.accountno}
                      onChange={valueChange}
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    label="Paypal"
                    name="paypal"
                    variant="outlined"
                    value={author.paypal}
                    onChange={valueChange}
                    fullWidth
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Card>
              <CardHeader subheader="Address Details" />
              <CardContent>
                <Stack spacing={1}>
                  <TextField
                    label="Building/Apartment"
                    name="address1"
                    variant="outlined"
                    value={author.address1}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="Street"
                    name="address2"
                    variant="outlined"
                    value={author.address2}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="Town/City"
                    name="address3"
                    variant="outlined"
                    value={author.address3}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="County/State"
                    name="address4"
                    variant="outlined"
                    value={author.address4}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="Post/Zip Code"
                    name="postcode"
                    variant="outlined"
                    value={author.postcode}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="Location"
                    name="location"
                    variant="outlined"
                    value={author.location}
                    onChange={valueChange}
                    fullWidth
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Stack spacing={1}>
              <Card sx={{ height: 470 }}>
                <CardHeader subheader="Notes"></CardHeader>
                <CardContent>
                  <TextField
                    label="Notes"
                    name="notes"
                    variant="outlined"
                    multiline
                    rows={14}
                    value={author.notes}
                    onChange={valueChange}
                    fullWidth
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthorEdit;
