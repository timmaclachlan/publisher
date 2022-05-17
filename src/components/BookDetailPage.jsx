import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Input,
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
} from "@mui/material";

import BookEdit from "./BookDetail/BookEdit";
import BookView from "./BookDetail/BookView";

import {
  readLookupAll,
  readById,
  updateById,
  deleteById,
  readAll,
} from "../fetcher";
import { isEmptyObject } from "../utils";

const getSingleResult = (result) => {
  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }
  return result;
};

const BookDetail = ({ onRecordChange }) => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveBook = async () => {
      let bookRecord = {};

      try {
        let response = await readById("book", id);
        bookRecord = getSingleResult(response.result);
        if (isEmptyObject(bookRecord)) {
          navigate("/notfound");
        }

        onRecordChange(bookRecord.title);

        response = await readById("genre", bookRecord.genreid);
        bookRecord.genre = getSingleResult(response.result);
        bookRecord.author = {
          realname: bookRecord.author_name,
          id: bookRecord.authorid,
        };
        setBook(bookRecord);

        response = await readAll("genre");
        setGenres(response.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (id.length === 36) {
      retrieveBook();
    }
    if (id === undefined) {
      setCreateMode(true);
    }
  }, [id, navigate, onRecordChange]);

  const getAuthors = () => {
    const retrieveAuthors = async () => {
      try {
        const authorRecords = await readLookupAll("author");
        setAuthors(authorRecords.result);
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
    if (onRecordChange) {
      onRecordChange(book.name);
    }
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
    if (notification.severity === "warning") {
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
        <Backdrop sx={{ color: "#fff", zIndex: 500 }} open={true}>
          <Alert severity="warning">Book has been deleted</Alert>
        </Backdrop>
      )}

      <Box>
        <Grid container spacing={2}>
          <Grid item md={10}>
            {!editMode && !createMode && (
              <BookView book={book} onUpdateEditMode={setEditMode} />
            )}

            {(editMode || createMode) && (
              <BookEdit
                book={book}
                authors={authors}
                isNew={createMode}
                onUpdateBook={updateBook}
                onUpdateEditMode={setEditMode}
                onDeleteBook={deleteBook}
                onSaveBook={saveBook}
                getAuthors={getAuthors}
                genres={genres}
              />
            )}
          </Grid>

          <Grid item md={2}>
            <Card>
              <CardMedia
                component="img"
                image="/assets/amber_a_fairy_tale.jpg"
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
