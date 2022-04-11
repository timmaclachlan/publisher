import React, { useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
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
  CardMedia,
  CardContent,
  Input,
  OutlinedInput,
  Chip,
  FormGroup,
  FormLabel,
  Switch,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { readById, updateById, deleteById } from "../fetcher";

const BookDetail = ({ onRecordChange }) => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveBook = async () => {
      try {
        const bookRecord = await readById("book", id);
        console.log("bookrecord:" + bookRecord);
        setBook(bookRecord.data);
        onRecordChange(bookRecord.data.title);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveBook();
  }, [id]);

  const handleChange = (event) => {
    debugger;
    const { name, value } = event.target;
    setBook((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleDatePickerChange = (value) => {
    debugger;
    setBook((prevState) => {
      return {
        ...prevState,
        publicationDate: value,
      };
    });
  };

  const makeChange = (event, method) => {
    event.preventDefault();
    setEditMode(false);

    const callApi = async () => {
      await method("book");
    };
    callApi();
  };

  const authors = [{ label: "Enid Blyton" }, { label: "John Doe" }];

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={10}>
            {!editMode && (
              <Grid container spacing={2}>
                <Grid item md={1}>
                  <LayersIcon color="primary" sx={{ fontSize: 60, mr: 2 }} />
                </Grid>
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
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </Button>
                </Grid>

                <Grid item md={8}></Grid>

                <Grid item md={2}>
                  <label>Title</label>
                </Grid>
                <Grid item md={10}>
                  <label className="details">{book.title}</label>
                </Grid>

                <Grid item md={2}>
                  <label>Author</label>
                </Grid>

                <Grid item md={10}>
                  <label className="details">
                    <Link to={"/authors/" + book.author?.id}>
                      {book.author?.name}
                    </Link>
                  </label>
                </Grid>
              </Grid>
            )}

            {editMode && (
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
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item md={2}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => setEditMode(false)}
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
                      onClick={() => setEditMode(true)}
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
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item md={3}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Published"
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
                          onChange={handleChange}
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
                            onChange={handleChange}
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
                          name="publicationDate"
                          value={book.publicationDate}
                          onChange={handleDatePickerChange}
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
                                    <InputAdornment position="start">
                                      £
                                    </InputAdornment>
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
                                    <InputAdornment position="start">
                                      £
                                    </InputAdornment>
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
                                    <InputAdornment position="start">
                                      £
                                    </InputAdornment>
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
                                    <InputAdornment position="start">
                                      %
                                    </InputAdornment>
                                  ),
                                }}
                              />
                              <TextField
                                label="Publisher"
                                name="royaltyPublisher"
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      %
                                    </InputAdornment>
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
                                control={<Checkbox defaultChecked />}
                              />
                              <FormControlLabel
                                label="Terminated"
                                labelPlacement="start"
                                control={<Checkbox defaultChecked />}
                              />
                              <FormControlLabel
                                label="On Hold"
                                labelPlacement="start"
                                control={<Checkbox defaultChecked />}
                              />
                              <FormControlLabel
                                label="Mature Content"
                                labelPlacement="start"
                                control={<Checkbox defaultChecked />}
                              />
                            </FormGroup>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>

          <Grid item md={2}>
            <Card>
              <CardMedia
                component="img"
                image="/assets/The_Magic_Faraway_Tree.jpg"
              ></CardMedia>
              <CardContent>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    sx={{ display: "none" }}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BookDetail;
