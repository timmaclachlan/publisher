import React from "react";

import {
  Grid,
  TextField,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  Card,
  CardContent,
  FormGroup,
  Switch,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import AutoSuggest from "../AutoSuggest";

import { getRemainingPercentage } from "../../utils";

const BookEdit = ({
  book,
  authors,
  isNew,
  onUpdateBook,
  onUpdateEditMode,
  onDeleteBook,
  onSaveBook,
  getAuthors,
  genres,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);

  const handleChange = (name, value) => {
    if (onUpdateBook) {
      onUpdateBook(name, value);
    }
  };

  const valueChange = (event) => {
    const { name, value } = event.target;
    debugger;
    handleChange(name, value);
  };

  const checkedChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
  };

  const dateChange = (name, value) => {
    handleChange(name, value);
  };

  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
    if (onDeleteBook) {
      onDeleteBook();
    }
  };

  const renderGenres = () => {
    if (genres) {
      return genres.map((genre) => {
        return <MenuItem value={genre.id}>{genre.genre}</MenuItem>;
      });
    }
  };

  return (
    <>
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you wish to delete this book?
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
          <Grid item md={9}>
            <Grid container spacing={2}>
              <Grid item md={9}>
                <TextField
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={book.title}
                  fullWidth
                  onChange={valueChange}
                />
              </Grid>

              <Grid item md={3}>
                <FormControlLabel
                  control={<Switch />}
                  label="Published"
                  name="published"
                  checked={book.published}
                  onChange={checkedChange}
                />
              </Grid>

              <Grid item md={4}>
                <InputLabel>Author</InputLabel>
                <AutoSuggest
                  data={authors}
                  value={book.author}
                  field="realname"
                  onOpenAutoSuggest={getAuthors}
                  onChange={(value) => handleChange("author", value)}
                />
              </Grid>

              <Grid item md={3}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  label="Genre"
                  name="genreid"
                  value={book.genreid}
                  fullWidth
                  onChange={valueChange}
                >
                  {renderGenres()}
                </Select>
              </Grid>

              <Grid item md={2}>
                <InputLabel id="service-label">Service</InputLabel>
                <FormControl fullWidth>
                  <InputLabel id="service-label">Service</InputLabel>
                  <Select
                    label="Service"
                    name="service"
                    value={book.service}
                    labelId="service-label"
                    onChange={valueChange}
                  >
                    <MenuItem value="EPPS">EPPS</MenuItem>
                    <MenuItem value="PPS">PPS</MenuItem>
                    <MenuItem value="EPS">EPS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={3}>
                <DesktopDatePicker
                  label="Publication Date"
                  value={book.publicationdate}
                  onChange={(value) => dateChange("publicationdate", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Royalties
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2} direction="row">
                      <TextField
                        label="Author"
                        name="royalty"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                        value={book.royalty}
                        onChange={valueChange}
                      />
                      <TextField
                        label="Publisher"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">%</InputAdornment>
                          ),
                        }}
                        defaultValue={getRemainingPercentage(book.royalty)}
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
                    <FormGroup>
                      <FormControlLabel
                        label="Still Selling"
                        labelPlacement="start"
                        control={<Checkbox />}
                        name="stillselling"
                        checked={book.stillselling}
                        onChange={checkedChange}
                      />
                      <FormControlLabel
                        label="Terminated"
                        labelPlacement="start"
                        control={<Checkbox />}
                        name="terminated"
                        checked={book.terminated}
                        onChange={checkedChange}
                      />
                      <FormControlLabel
                        label="On Hold"
                        labelPlacement="start"
                        control={<Checkbox />}
                        name="onhold"
                        checked={book.onhold}
                        onChange={checkedChange}
                      />
                      <FormControlLabel
                        label="Mature Content"
                        labelPlacement="start"
                        control={<Checkbox />}
                        name="maturecontent"
                        checked={book.maturecontent}
                        onChange={checkedChange}
                      />
                    </FormGroup>
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

export default BookEdit;
