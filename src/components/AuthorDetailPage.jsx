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
  requestAuth
} from "../fetcher";
import { isEmptyObject, isFavorite, toggleFavorite } from "../utils";

const AuthorDetail = ({ onRecordChange }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const [financials, setFinancials] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });
  const [favorite, setFavorite] = useState(isFavorite(id));
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);

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

        setIsLoadingBooks(true);
        response = await readByIdAll("author", "book", id);
        setIsLoadingBooks(false);
        setBooks(response.result);

        response = await readByIdAll("author", "financial", id);
        if (Array.isArray(response.result) && response.result.length > 0) {
          setFinancials(response.result[0]);
        }
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

  const makeCreate = (method, newauthor) => {
    const callApi = async () => {
      let results = await method("author");
      newauthor.id = results.id;
      setAuthor(newauthor);
      setCreateMode(false);
      setEditMode(true);
    };
    callApi();
  };

  const makeUpdate = (author) => {
    const callApi = async () => {
      await updateById(author, id, "author");
    };
    callApi();
  };

  const makeDelete = (method) => {
    const callApi = async () => {
      await method("author");
    };
    callApi();
  }

  const saveAuthor = (author) => {
    if (createMode) {
      makeCreate(create.bind(null, author), author);
    } else {
      makeUpdate(author);
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

  const deleteAuthor = () => {
    makeDelete(deleteById.bind(null, id));
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

  const onCreateLogin = () => {
    const callApi = async () => {
      const body = {
        email: "peterdhull2@talktalk.net",
        connection: "Username-Password-Authentication",
        password: "OmNsaWVudF",
      };
      let results = await requestAuth(body);
    };
    debugger;
    callApi();
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
                financials={financials}
                onUpdateEditMode={setEditMode}
                onFavoriteToggle={favoriteToggle}
                onCreeateLogin={onCreateLogin}
                isFavorite={favorite}
                isOneBookPublished={isOneBookPublished()}
              />
            )}

            {(editMode || createMode) && (
              <AuthorEdit
                author={author}
                isNew={createMode}
                onUpdateEditMode={setEditMode}
                onDeleteAuthor={deleteAuthor}
                onSaveAuthor={saveAuthor}
              />
            )}
          </Grid>

          <Grid item md={2}></Grid>

          <Grid item md={10}>
            <Typography variant="h5">Books</Typography>
            <Books
              books={books}
              isLoadingBooks={isLoadingBooks}
              hideAuthorColumn={true}
              gridHeight={400}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthorDetail;
