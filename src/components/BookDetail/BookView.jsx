import React from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
  Grid,
  Button,
  Typography,
  Link,
  Card,
  CardContent,
  Stack
} from "@mui/material";

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import BookViewOptions from "./BookViewOptions";

const LinkWithRouter = (props) => <Link {...props} component={RouterLink} />;

const BookView = ({ book, onUpdateEditMode }) => {
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

      <Grid item md={12}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item md={10}>
                <Typography variant="h5">{book.title}</Typography>
                <LinkWithRouter
                  to={"/authors/" + book.author?.id}
                  underline="hover"
                  color="secondary"
                >
                  <Typography color="primary" variant="h6">
                    {book.author?.name}
                  </Typography>
                </LinkWithRouter>
                <Typography variant="subtitle1">{book.genre}</Typography>
              </Grid>
              <Grid item md={2}>
                
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>



      <Grid item md={12}>
        <BookViewOptions book={book} />
      </Grid>
      
    </Grid>
  );
};

export default BookView;
