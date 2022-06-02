import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Snackbar,
  Alert as MuiAlert,
  Backdrop,
  Tabs,
  Tab,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";

import BookEdit from "./BookDetail/BookEdit";
import BookView from "./BookDetail/BookView";
import TabEditorial from "./BookDetail/Tabs/Editorial/TabEditorial";
import TabFormats from "./BookDetail/Tabs/Formats/TabFormats";
import BookTabDesign from "./BookDetail/Tabs/BookTabDesign";
import TabPanel from "./TabPanel";

import BookDetailHeader from "./BookDetail/BookDetailHeader";

import {
  readLookupAll,
  readById,
  updateById,
  deleteById,
  readAll,
  readByIdAll,
} from "../fetcher";
import { isEmptyObject, isFavorite, toggleFavorite } from "../utils";

const getSingleResult = (result) => {
  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }
  return result;
};

const TAB_EDITORIAL = 1;
const TAB_FORMATS = 4;

const blankFormat = (bookid, format) => {
  return {
    id: null,
    bookid,
    enabled: false,
    format,
    price: 0,
    isbn: "",
    width: 0,
    height: 0,
    pagecount: 0,
    estpagecount: 0,
    unitcost: 0,
    estunitcost: 0,
    paperstock: "",
    coverlaminate: "",
  };
};

const BookDetail = ({ onRecordChange }) => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState({});
  const [editorial, setEditorial] = useState({});
  const [bookServices, setBookServices] = useState([]);
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
  const [favorite, setFavorite] = useState(isFavorite(id));
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    if (newValue === TAB_FORMATS && isEmptyObject(formats)) {
      const retrieveFormats = async () => {
        let response = await readByIdAll("book", "format", id);
        setFormats(response.result);
      };
      retrieveFormats();
    }

    if (newValue === TAB_EDITORIAL && isEmptyObject(editorial)) {
      const retrieveEditorial = async () => {
        let response = await readByIdAll("book", "editorial", id);
        setEditorial(response.result);
      };
      retrieveEditorial();
    }
  };

  const getFormatData = (format) => {
    if (Array.isArray(formats)) {
      let selectedFormats = formats.filter((item) => item.format === format);
      if (selectedFormats.length > 0) {
        return selectedFormats[0];
      }
    }
    return null;
  };

  const onChangeFormats = (ev, format, field) => {
    let newFormats = [...formats];
    let selectedFormat = getFormatData(format);
    if (selectedFormat === null) {
      newFormats.push(blankFormat(id, format));
    } else {
      selectedFormat[field] = ev.target.value;
    }

    setFormats(newFormats);
  };

  const onEnableChangeFormats = (format, enabled) => {
    debugger;
    let newFormats = [...formats];
    let selectedFormat = getFormatData(format);
    if (selectedFormat !== null) {
      selectedFormat.enabled = enabled;
    }
    setFormats(newFormats);
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

        response = await readByIdAll("book", "service", id);
        setBookServices(response.result);
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
    debugger;
    book.formats = formats;
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

  const handleCloseDeleteConfirmation = () => setShowDeleteConfirmation(false);

  const handleConfirmDelete = () => {
    setShowDeleteConfirmation(false);
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
    toggleFavorite(id, "books", book.title);
    setFavorite(!favorite);
  };

  return (
    <>
      <Dialog
        open={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Are you sure you wish to delete this book?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            startIcon={<WarningIcon />}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            autoFocus
            onClick={() => setShowDeleteConfirmation(false)}
            startIcon={<CancelIcon />}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
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

      <Grid container spacing={2}>
        <Grid item md={10}>
          <BookDetailHeader
            createMode={createMode}
            editMode={editMode}
            onUpdateEditMode={setEditMode}
            onSaveBook={saveBook}
            onFavoriteToggle={favoriteToggle}
            isFavorite={favorite}
            onShowDeleteDialog={() => setShowDeleteConfirmation(true)}
          />
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Book Details"></Tab>
                <Tab label="Editorial"></Tab>
                <Tab label="Design"></Tab>
                <Tab label="Marketing"></Tab>
                <Tab label="Formats"></Tab>
              </Tabs>
            </Grid>

            <Grid item md={12}>
              <TabPanel value={currentTab} index={0}>
                {!editMode && !createMode && (
                  <BookView
                    book={book}
                    bookServices={bookServices}
                    onUpdateEditMode={setEditMode}
                  />
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
                <TabEditorial editorial={editorial} editMode={editMode} />
              </TabPanel>

              <TabPanel value={currentTab} index={2}>
                <BookTabDesign book={book} editMode={editMode} />
              </TabPanel>

              <TabPanel value={currentTab} index={3}>
                <Typography variant="h5">Marketing</Typography>
              </TabPanel>

              <TabPanel value={currentTab} index={TAB_FORMATS}>
                <TabFormats
                  book={book}
                  editMode={editMode}
                  formats={formats}
                  onChange={onChangeFormats}
                  onEnableChange={onEnableChangeFormats}
                />
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </>
  );
};

export default BookDetail;
