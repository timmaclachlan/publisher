import React from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  Typography
} from "@mui/material";

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

const BookView = ({book, onUpdateEditMode}) => {
  const navigate = useNavigate();
  
  return (
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
          onClick={() => onUpdateEditMode(true)}
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
          <Link to={"/authors/" + book.author?.id}>{book.author?.name}</Link>
        </label>
      </Grid>
    </Grid>
  );
};

export default BookView;
