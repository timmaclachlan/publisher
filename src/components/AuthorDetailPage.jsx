import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Snackbar,
  Backdrop,
  Alert as MuiAlert,
} from "@mui/material";

import Books from "./Books";
import AuthorEdit from "./AuthorDetail/AuthorEdit";
import AuthorView from "./AuthorDetail/AuthorView";

import { readById, updateById, deleteById } from "../fetcher";
import { isEmptyObject } from "../utils";

const AuthorDetail = ({ onRecordChange }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({ id: 0, realName: "", address: "" });
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    severity: "",
    message: "",
    autoHide: false,
  });

  useEffect(() => {
    const retrieveAuthor = async () => {
      let authorRecord = {};
      try {
        const response = await readById("author", id);
        if (Array.isArray(response.result) && response.result.length > 0) {
          authorRecord = response.result[0];
        }
        if (isEmptyObject(authorRecord)) {
          navigate("/notfound");
        }

        setAuthor(authorRecord);
        onRecordChange(authorRecord.realname);
      } catch (error) {
        console.log(error);
      }
    };
    if (id.length === 36) {
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

  const saveAuthor = (ev) => {
    ev.preventDefault();
    makeChange(updateById.bind(null, author, id));
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
              <AuthorView author={author} onUpdateEditMode={setEditMode} />
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

          <Grid item md={2}>
            <Books books={author.books} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AuthorDetail;
