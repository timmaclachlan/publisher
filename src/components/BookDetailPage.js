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
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
} from "@mui/material";

import LayersIcon from "@mui/icons-material/Layers";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import BookEdit from "./BookDetail/BookEdit";

import { readLookupAll, readById, updateById, deleteById } from "../fetcher";

const BookDetail = ({ onRecordChange }) => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [authors, setAuthors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });
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

  const getAuthors = () => {
    const retrieveAuthors = async () => {
      try {
        const authorRecords = await readLookupAll("author");
        setAuthors(authorRecords.data);
      } catch (error) {
        console.log(error);
      }
    };
    retrieveAuthors();
  };

  const makeChange = (method) => {
    const callApi = async () => {
      await method("book");
    };
    callApi();
  };

  const saveBook = (ev) => {
    ev.preventDefault();
    makeChange(updateById.bind(null, book, id));
    setNotification((prevState) => ({
      ...prevState,
      show: true,
      severity: "success",
      autoHide: true,
      message: "Changes saved successfully",
    }));
  };

  const updateBook = (field, value) => {
    setBook((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const deleteBook = () => {
    makeChange(deleteById.bind(null, id));
    setNotification((prevState) => ({
      ...prevState,
      show: true,
      severity: "warning",
      autoHide: false,
      message: "Book deleted successfully",
    }));
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={20} ref={ref} variant="filled" {...props} />;
  });

  const handleCloseNotification = (event, reason) => {
    setNotification((prevState) => ({ ...prevState, show: false }));
    if (notification.severity === 'warning') {
      navigate("/authors");
    }
  };


  return (
    <>
      <Snackbar
        open={notification.show}
        autoHideDuration={notification.autoHide ? 5000 : null}
        onClose={handleCloseNotification}
        
      >
        <Alert
          severity={notification.severity}
          onClose={handleCloseNotification}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      {notification.show && notification.severity === "warning" && (
        <Backdrop sx={{ color: "#fff", zIndex: 500 }} open={true} >
          <Alert
          severity="warning"         
        >Book has been deleted</Alert>
        </Backdrop>
      )}

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
                authors={authors}
                id={id}
                onUpdateBook={updateBook}
                onUpdateEditMode={setEditMode}
                onDeleteBook={deleteBook}
                onSaveBook={saveBook}
                getAuthors={getAuthors}
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
