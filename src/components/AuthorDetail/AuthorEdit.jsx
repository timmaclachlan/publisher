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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const checkedChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
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

          <Grid item md={9}>
            <Grid container spacing={2}>
              <Grid item md={4}>
                <TextField
                  label="Real Name"
                  name="realname"
                  variant="outlined"
                  value={author.realname}
                  onChange={valueChange}
                  fullWidth
                />
              </Grid>
              <Grid item md={4}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={author.email}
                  onChange={valueChange}
                  fullWidth
                />
              </Grid>

              <Grid item md={2}></Grid>

              <Grid item md={2}>
                <FormControlLabel
                  control={<Switch />}
                  label="Active"
                  name="active"
                  checked={author.active}
                  onChange={checkedChange}
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  label="Pen Name"
                  name="penname"
                  variant="outlined"
                  value={author.penname}
                  onChange={valueChange}
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  label="Phone"
                  name="phonenumber"
                  variant="outlined"
                  value={author.phonenumber}
                  onChange={valueChange}
                  fullWidth
                />
              </Grid>

              <Grid item md={4}>
                <TextField
                  label="Location"
                  name="location"
                  variant="outlined"
                  value={author.location}
                  onChange={valueChange}
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <Card>
                  <CardHeader subheader="Address Details" />
                  <CardContent>
                    <Stack spacing={2}>
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
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item md={6}>
                <Stack spacing={2}>
                  <TextField
                    label="Website"
                    name="Website"
                    variant="outlined"
                    value={author.website}
                    onChange={valueChange}
                    fullWidth
                  />
                  <TextField
                    label="Notes"
                    name="notes"
                    variant="outlined"
                    multiline
                    rows={8}
                    value={author.notes}
                    onChange={valueChange}
                    fullWidth
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Banking Details
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
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
                      <TextField
                        label="IBAN"
                        name="iban"
                        variant="outlined"
                        value={author.iban}
                        onChange={valueChange}
                        fullWidth
                      />
                      <TextField
                        label="SwiftBic"
                        name="bic"
                        variant="outlined"
                        value={author.bic}
                        onChange={valueChange}
                        fullWidth
                      />
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Grid>

              <Grid item md={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Options
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <FormGroup>
                        <FormControlLabel
                          label="Retained Client"
                          labelPlacement="start"
                          control={<Checkbox />}
                          name="retainedClient"
                          checked={author.retainedClient}
                          onChange={checkedChange}
                        />
                      </FormGroup>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthorEdit;
