import React, { useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Input,
  Typography,
} from "@mui/material";

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import BookEdit from "./BookDetail/BookEdit";

import { readById, updateById } from "../fetcher";

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
  }, [id, onRecordChange]);

  const makeChange = (method) => {
    debugger;
    const callApi = async () => {
      await method("book");
    };
    callApi();
  };

  const saveBook = (ev) => {
    ev.preventDefault();    
    debugger;
    makeChange(updateById.bind(null, book, id))
  }

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
              <BookEdit
                book={book}
                id={id}
                onUpdateBook={setBook}
                onUpdateEditMode={setEditMode}
                onSaveBook={saveBook}
              />
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
