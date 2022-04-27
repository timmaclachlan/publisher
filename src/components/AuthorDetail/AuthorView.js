import React from "react";

import { useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  Typography
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

const AuthorView = ({author, onUpdateEditMode}) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <PeopleIcon color="primary" sx={{ fontSize: 60 }} />
      </Grid>
      <Grid item md={4}>
        <Typography variant="h4" sx={{ pt: 1 }}>
          View Author
        </Typography>
      </Grid>
      <Grid item md={3} />
      <Grid item md={2}>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={() => navigate("/authors")}
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

      <Grid item md={2}>
        <label>Real Name</label>
      </Grid>
      <Grid item md={10}>
        <label className="details">{author.name}</label>
      </Grid>

      <Grid item md={2}>
        <label>Address</label>
      </Grid>
      <Grid item md={10}>
        <label className="details">{author.address}</label>
      </Grid>
    </Grid>
  );
};

export default AuthorView;
