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
  Autocomplete,
  InputAdornment,
  Card,
  CardContent,
  FormGroup,
  Switch,
  Typography,
  Stack,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LayersIcon from "@mui/icons-material/Layers";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const BookEdit = ({ book, onUpdateBook, onUpdateEditMode, onSaveBook }) => {
  const handleChange = (name, value) => {
    if (onUpdateBook) {
      onUpdateBook(name, value);
    }
  };

  const valueChange = (event) => {
    const { name, value } = event.target;    
    handleChange(name, value);
  }

  const checkedChange = (event) => {
    const { name, checked } = event.target;
    handleChange(name, checked);
  }

  const dateChange = (name, value) => {
    handleChange(name, value);
  };

  const authors = [{ label: "Enid Blyton" }, { label: "John Doe" }];

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item md={1}>
          <LayersIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
        </Grid>
        <Grid item md={3}>
          <Typography variant="h4" sx={{ pt: 1 }}>
            Edit Book
          </Typography>
        </Grid>
        <Grid item md={2} />
        <Grid item md={2}>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={() => onUpdateEditMode(false)}
          >
            Cancel
          </Button>
        </Grid>

        <Grid item md={2}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onUpdateEditMode(false)}
          >
            Delete
          </Button>
        </Grid>

        <Grid item md={2}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="success"
            sx={{ width: "100px" }}
            onClick={onSaveBook}
          >
            Save
          </Button>
        </Grid>

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
                control={<Switch  />}
                label="Published"
                name="published"
                checked={book.published}
                onChange={checkedChange}
              />
            </Grid>

            <Grid item md={4}>
              <Autocomplete
                options={authors}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Author" />
                )}
              />
            </Grid>

            <Grid item md={3}>
              <TextField
                label="Genre"
                name="genre"
                variant="outlined"
                value={book.genre}
                onChange={valueChange}
              />
            </Grid>

            <Grid item md={2}>
              <FormControl>
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
                value={book.publicationDate}
                onChange={(value) => dateChange("publicationDate", value)}
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item md={4}>
              <Card>
                <CardContent>
                  <FormGroup>
                    <Stack spacing={2}>
                      <FormControlLabel
                        label="Paperback"
                        labelPlacement="end"
                        control={<Checkbox defaultChecked />}
                      />
                      <TextField
                        name="pricePaperback"
                        label="Price"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">£</InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        name="isbnPaperback"
                        label="ISBN"
                        variant="outlined"
                      />
                    </Stack>
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card>
                <CardContent>
                  <FormGroup>
                    <Stack spacing={2}>
                      <FormControlLabel
                        label="Hardback"
                        labelPlacement="end"
                        control={<Checkbox defaultChecked />}
                      />
                      <TextField
                        name="priceHardback"
                        label="Price"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">£</InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        name="isbnHardback"
                        label="ISBN"
                        variant="outlined"
                      />
                    </Stack>
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card>
                <CardContent>
                  <FormGroup>
                    <Stack spacing={2}>
                      <FormControlLabel
                        label="E-Book"
                        labelPlacement="end"
                        control={<Checkbox defaultChecked />}
                      />
                      <TextField
                        name="pricePaperback"
                        label="Price"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">£</InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        name="isbnPaperback"
                        label="ISBN"
                        variant="outlined"
                      />
                    </Stack>
                  </FormGroup>
                </CardContent>
              </Card>
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
                      name="royaltyAuthor"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Publisher"
                      name="royaltyPublisher"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
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
                      control={<Checkbox  />}
                      name="stillSelling"
                      checked={book.stillSelling}
                      onChange={checkedChange}
                    />
                    <FormControlLabel
                      label="Terminated"
                      labelPlacement="start"
                      control={<Checkbox  />}
                      name="terminated"
                      checked={book.terminated}
                      onChange={checkedChange}
                    />
                    <FormControlLabel
                      label="On Hold"
                      labelPlacement="start"
                      control={<Checkbox  />}
                      name="onHold"
                      checked={book.onHold}
                      onChange={checkedChange}
                    />
                    <FormControlLabel
                      label="Mature Content"
                      labelPlacement="start"
                      control={<Checkbox  />}
                      name="matureContent"
                      checked={book.matureContent}
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
  );
};

export default BookEdit;
