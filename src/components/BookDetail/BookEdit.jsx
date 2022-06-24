import React from "react";

import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  FormGroup,
  Switch,
  Stack,
} from "@mui/material";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import AutoSuggest from "../AutoSuggest";

import { getRemainingPercentage } from "../../utils";

const BookEdit = ({ book, authors, onUpdateBook, getAuthors, genres }) => {
  const handleChange = (name, value) => {
    if (onUpdateBook) {
      onUpdateBook(name, value);
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

  const dateChange = (name, value) => {
    handleChange(name, value);
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
      <form>
        <Grid container spacing={2}>
          <Grid item md={9}>
            <Grid container spacing={2}>
              <Grid item md={7}>
                <TextField
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={book.title}
                  fullWidth
                  onChange={valueChange}
                />
              </Grid>

              <Grid item md={2}>
                <TextField
                  label="Office Abb"
                  name="officeabb"
                  variant="outlined"
                  value={book.officeabb}
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

              <Grid item md={5}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  label="Genre"
                  name="genreid"
                  value={book.genreid}
                  fullWidth
                  onChange={valueChange}
                >
                  <MenuItem value={undefined}>
                    <em>[Not Set]</em>
                  </MenuItem>
                  {renderGenres()}
                </Select>
              </Grid>

              <Grid item md={2}>
                <InputLabel id="service-label">Service</InputLabel>
                <FormControl fullWidth>
                  <Select
                    label="Service"
                    name="service"
                    value={book.service}
                    labelId="service-label"
                    onChange={valueChange}
                  >
                    <MenuItem value={undefined}>
                      <em>[Not Set]</em>
                    </MenuItem>
                    <MenuItem value="EPS">EPS</MenuItem>
                    <MenuItem value="EPPS">EPPS</MenuItem>
                    <MenuItem value="PPS">PPS</MenuItem>
                    <MenuItem value="CPS">CPS</MenuItem>
                    <MenuItem value="EPHPS">EPHPS</MenuItem>
                    <MenuItem value="HPS">HPS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={4}>
                <DesktopDatePicker
                  label="Publication Date"
                  value={book.publicationdate}
                  onChange={(value) => dateChange("publicationdate", value)}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>

              <Grid item md={4}>
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
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <Grid container spacing={2}>
              <Grid item md={12}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default BookEdit;
