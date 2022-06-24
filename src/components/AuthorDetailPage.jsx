import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Snackbar,
  Backdrop,
  Alert as MuiAlert,
  Typography,
} from "@mui/material";

import Books from "./Books";
import AuthorEdit from "./AuthorDetail/AuthorEdit";
import AuthorView from "./AuthorDetail/AuthorView";

import {
  create,
  readById,
  updateById,
  deleteById,
  readByIdAll,
} from "../fetcher";
import { isEmptyObject, isFavorite, toggleFavorite } from "../utils";

const AuthorDetail = ({ onRecordChange }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });
  const [favorite, setFavorite] = useState(isFavorite(id));

  useEffect(() => {
    const retrieveAuthor = async () => {
      let authorRecord = {};
      try {
        let response = await readById("author", id);
        if (Array.isArray(response.result) && response.result.length > 0) {
          authorRecord = response.result[0];
        }
        if (isEmptyObject(authorRecord)) {
          navigate("/notfound");
        }

        setAuthor(authorRecord);
        onRecordChange(authorRecord.realname);

        response = await readByIdAll("author", "book", id);
        setBooks(response.result);
      } catch (error) {
        console.log(error);
      }
    };
    if (id && id.length === 36) {
      retrieveAuthor();
    }
    if (id === undefined) {
      setCreateMode(true);
    }
  }, [id, navigate, onRecordChange]);

  const makeChange = (method) => {
    const callApi = async () => {
      await method("author");
    };
    callApi();
  };

  const makeUpdate = () => {
    const callApi = async () => {
      await updateById(author, id, "author");
    };
    callApi();
  };

  const saveAuthor = (ev) => {
    ev.preventDefault();

    if (createMode) {
      makeChange(create.bind(null, author));
    } else {
      makeUpdate();
      //makeChange(updateById.bind(null, author, id));
    }
    setNotification((prevState) => ({
      ...prevState,
      show: true,
      severity: "success",
      autoHide: true,
      message: "Changes saved successfully",
    }));
    if (onRecordChange) {
      onRecordChange(author.realname);
    }
  };

  const updateAuthor = (field, value) => {
    setAuthor((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const deleteAuthor = () => {
    makeChange(deleteById.bind(null, id));
    setNotification((prevState) => ({
      ...prevState,
      show: true,
      severity: "warning",
      autoHide: false,
      message: "Author deleted successfully",
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

  const favoriteToggle = () => {
    toggleFavorite(id, "authors", author.realname);
    setFavorite(!favorite);
  };

  const isOneBookPublished = () => {
    return books.some((book) => book.published);
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
          <Alert severity="warning">Author has been deleted</Alert>
        </Backdrop>
      )}

      <Box>
        <Grid container spacing={2}>
          <Grid item md={10}>
            {!editMode && !createMode && (
              <AuthorView
                author={author}
                onUpdateEditMode={setEditMode}
                onUpdateAuthor={updateAuthor}
                onFavoriteToggle={favoriteToggle}
                isFavorite={favorite}
                isOneBookPublished={isOneBookPublished()}
              />
            )}

            {(editMode || createMode) && (
              <AuthorEdit
                author={author}
                isNew={createMode}
                onUpdateAuthor={updateAuthor}
                onUpdateEditMode={setEditMode}
                onDeleteAuthor={deleteAuthor}
                onSaveAuthor={saveAuthor}
              />
            )}
          </Grid>

          <Grid item md={2}></Grid>

          <Grid item md={10}>
            <Typography variant="h5">Books</Typography>
            <Books books={books} hideAuthorColumn={true} gridHeight={400} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthorDetail;
