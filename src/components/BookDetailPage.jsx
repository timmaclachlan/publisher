import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import BookEdit from "./BookDetail/BookEdit";
import BookView from "./BookDetail/BookView";
import TabPanel from "./TabPanel";

import BookTabViewFormats from "./BookDetail/BookTabViewFormats";
import BookDetailHeader from "./BookDetail/BookDetailHeader";

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
  const [currentTab, setCurrentTab] = useState(0);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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

      <BookDetailHeader
        createMode={createMode}
        editMode={editMode}
        onUpdateEditMode={setEditMode}
        onSaveBook={saveBook}
      />

      <Box>
        <Grid item md={12}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Book Details"></Tab>
            <Tab label="Editorial"></Tab>
            <Tab label="Design"></Tab>
            <Tab label="Marketing"></Tab>
            <Tab label="Formats"></Tab>
          </Tabs>
        </Grid>
      </Box>

      <TabPanel value={currentTab} index={0}>
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
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <Typography variant="h5">Editorial</Typography>
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Typography variant="h5">Design</Typography>
      </TabPanel>

      <TabPanel value={currentTab} index={3}>
        <Typography variant="h5">Marketing</Typography>
      </TabPanel>

      <TabPanel value={currentTab} index={4}>
        <BookTabViewFormats book={book} />
      </TabPanel>
    </>
  );
};

export default BookDetail;
