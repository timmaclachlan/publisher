import React from "react";
import { useForm, Controller } from "react-hook-form";

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
  Box,
  Chip,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

import ViewChip from "../ViewChip";

const myHelper = {
  realname: {
    required: "Author must have a name!",
    minLength: "Author real name must be more than 3 characters!",
    alphanumeric: "Author name should only have letters and numbers",
    nospaces: "Author name should not just contain spaces",
  },
  email: {
    required: "Email address is required",
    pattern: "Email address must be in valid format",
  },
};

const AuthorEdit = ({
  author,
  isNew,
  onUpdateEditMode,
  onDeleteAuthor,
  onSaveAuthor,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const [booksWarning, setBooksWarning] = React.useState(false);

  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    if (onDeleteAuthor) {
      onDeleteAuthor();
    }
  };

  const onSuccess = (evt) => {
    const newAuthor = {
      ...author,
      realname: evt.realname,
      penname: evt.penname,
      email: evt.email,
      email2: evt.email2,
      phonenumber: evt.phonenumber,
      phonenumber2: evt.phonenumber2,
      website: evt.website,
      sortcode: evt.sortcode,
      accountno: evt.accountno,
      paypal: evt.paypal,
      address1: evt.address1,
      address2: evt.address2,
      address3: evt.address3,
      address4: evt.address4,
      location: evt.location,
      notes: evt.notes,
      notax: evt.notax,
      active: evt.active,
      retained: evt.retained,
      terminated: evt.terminated
    };

    if (onSaveAuthor) {
      onSaveAuthor(newAuthor);
    }
  };

  const onFailure = (evt) => {
    debugger;
  };

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

      <form onSubmit={handleSubmit(onSuccess, onFailure)}>
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
                type="submit"
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

          <Grid item md={7}>
            <Controller
              name="realname"
              control={control}
              defaultValue={author.realname}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Author Real Name"
                  error={error !== undefined}
                  placeholder="Enter author name"
                  fullWidth
                  autoFocus
                  required
                  helperText={error ? myHelper.realname[error.type] : ""}
                />
              )}
              rules={{
                required: true,
                minLength: 3,
                validate: {
                  nospaces: (value) => {
                    const spacesOnlyPattern = /^[^\s]+(?:$|.*[^\s]+$)/;
                    return spacesOnlyPattern.test(value);
                  },
                  alphanumeric: (value) => {
                    const alphanumeric = /^[\w\s]+$/;
                    return alphanumeric.test(value);
                  },
                },
              }}
            />
          </Grid>

          <Grid item md={1}>
            <Controller
              name="notax"
              control={control}
              defaultValue={author.notax}
              render={({ field: { onChange, value, ...field } }) => (
                <ViewChip
                  {...field}
                  label="In Uk"
                  color="success"
                  value={value}
                  onClick={() => onChange(!value)}
                />
              )}
            />
          </Grid>

          <Grid item md={4}>
            <Stack spacing={2} direction="row">
              <Controller
                name="active"
                control={control}
                defaultValue={author.active}
                render={({ field: { onChange, value, ...field } }) => (
                  <ViewChip
                    {...field}
                    label="Active"
                    color="primary"
                    value={value}
                    onClick={() => onChange(!value)}
                    width={100}
                  />
                )}
              />
              <Controller
                name="retained"
                control={control}
                defaultValue={author.retained}
                render={({ field: { onChange, value, ...field } }) => (
                  <ViewChip
                    {...field}
                    label="Retained"
                    color="primary"
                    value={value}
                    onClick={() => onChange(!value)}
                    width={100}
                  />
                )}
              />
              <Controller
                name="terminated"
                control={control}
                defaultValue={author.terminated}
                render={({ field: { onChange, value, ...field } }) => (
                  <ViewChip
                    {...field}
                    label="Terminated"
                    color="primary"
                    value={value}
                    onClick={() => onChange(!value)}
                    width={120}
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item md={9}>
            <Card>
              <CardTopHeader title="Personal Details" />
              <CardContent>
                <Grid container columnSpacing={2}>
                  <Grid item md={4}>
                    <Stack spacing={2}>
                      <Controller
                        name="penname"
                        control={control}
                        defaultValue={author.penname}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Pen Name"
                            placeholder="Enter pen name"
                            fullWidth
                          />
                        )}
                      />
                      <Controller
                        name="website"
                        control={control}
                        defaultValue={author.website}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Website"
                            placeholder="Enter author's website"
                            fullWidth
                          />
                        )}
                      />
                    </Stack>
                  </Grid>

                  <Grid item md={5}>
                    <Stack spacing={2}>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue={author.email}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Email 1"
                            error={error !== undefined}
                            placeholder="Enter email address"
                            fullWidth
                            required
                            helperText={error ? myHelper.email[error.type] : ""}
                          />
                        )}
                        rules={{
                          required: true,
                          pattern:
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        }}
                      />

                      <Controller
                        name="email2"
                        control={control}
                        defaultValue={author.email2}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Email 2"
                            error={error !== undefined}
                            placeholder="Enter any other email if any"
                            fullWidth
                            helperText={error ? myHelper.email[error.type] : ""}
                          />
                        )}
                        rules={{
                          pattern:
                            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                        }}
                      />
                    </Stack>
                  </Grid>

                  <Grid item md={3}>
                    <Stack spacing={2}>
                      <Controller
                        name="phonenumber"
                        control={control}
                        defaultValue={author.phonenumber}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Phone 1"
                            placeholder="Enter main phone number"
                            fullWidth
                          />
                        )}
                      />
                      <Controller
                        name="phonenumber2"
                        control={control}
                        defaultValue={author.phonenumber2}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            variant="outlined"
                            label="Phone 2"
                            placeholder="Enter 2nd phone number"
                            fullWidth
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card>
              <CardTopHeader title="Banking Details" />
              <CardContent>
                <Stack spacing={2}>
                  <Stack spacing={1} direction="row">
                    <Controller
                      name="sortcode"
                      control={control}
                      defaultValue={author.sortcode}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          label="Sort Code"
                          placeholder="Enter sort code"
                          fullWidth
                        />
                      )}
                    />
                    <Controller
                      name="accountno"
                      control={control}
                      defaultValue={author.accountno}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          variant="outlined"
                          label="Account"
                          placeholder="Enter account number"
                          fullWidth
                        />
                      )}
                    />
                  </Stack>
                  <Controller
                    name="paypal"
                    control={control}
                    defaultValue={author.paypal}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Paypal"
                        placeholder="Enter paypal address"
                        fullWidth
                      />
                    )}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Card>
              <CardTopHeader title="Address Details" />
              <CardContent>
                <Stack spacing={1}>
                  <Controller
                    name="address1"
                    control={control}
                    defaultValue={author.address1}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Building/Apartment"
                        placeholder="Enter first address line"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="address2"
                    control={control}
                    defaultValue={author.address2}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Street"
                        placeholder="Enter second address line"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="address3"
                    control={control}
                    defaultValue={author.address3}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Town/City"
                        placeholder="Enter town/city"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="address4"
                    control={control}
                    defaultValue={author.address4}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="County/State"
                        placeholder="Enter county/state"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="postcode"
                    control={control}
                    defaultValue={author.postcode}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Post/Zip Code"
                        placeholder="Enter post/zip code"
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="location"
                    control={control}
                    defaultValue={author.location}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Location"
                        placeholder="Enter location"
                        fullWidth
                      />
                    )}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Stack spacing={1}>
              <Card sx={{ height: 470 }}>
                <CardTopHeader title="Notes" />
                <CardContent>
                  <Controller
                    name="notes"
                    control={control}
                    defaultValue={author.notes}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        label="Notes"
                        multiline
                        rows={14}
                        placeholder="Enter any notes"
                        fullWidth
                      />
                    )}
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

const CardTopHeader = (props) => {
  return (
    <CardHeader
      sx={{ p: 0, m: 0 }}
      subheader={<CardTop title={props.title} />}
    />
  );
};

const CardTop = (props) => {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" color="white" sx={{ pl: 1 }}>
          {props.title}
        </Typography>
      </Stack>
    </Box>
  );
};
