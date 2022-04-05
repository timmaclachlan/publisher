import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Grid, Box, TextField, Button } from "@mui/material";

import Books from "./Books";

import { readById, updateById, deleteById } from "../fetcher";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({ id: 0, name: "", address: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const retrieveAuthor = async () => {
      try {
        const authorRecord = await readById("author", id);
        setAuthor(authorRecord.data);
      } catch (error) {
        console.log(error);
        navigate("/notfound");
      }
    };
    if (id > 0) {
      retrieveAuthor();
    } else if (id !== undefined) {
      navigate("/notfound");
    }
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthor((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const makeChange = (event, method) => {
    event.preventDefault();
    setEditMode(false);

    const callApi = async () => {
      await method("author");
    };
    callApi();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={8}>
          {!editMode && (
            <Grid container spacing={2}>
              <Grid item md={8}></Grid>

              <Grid item md={2}>
                <Button
                  variant="outlined"
                  onClick={(ev) => makeChange(ev, deleteById.bind(null, id))}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button variant="contained" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              </Grid>

              <Grid item md={2}>
                <label>Name</label>
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
          )}

          {editMode && (
            <form>
              <Grid container spacing={2}>
                <Grid item md={8} />

                <Grid item md={2}>
                  <Button variant="outlined" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </Grid>

                <Grid item md={2}>
                  <Button
                    variant="contained"
                    onClick={(ev) =>
                      makeChange(ev, updateById.bind(null, author, id))
                    }
                  >
                    Save
                  </Button>
                </Grid>

                <Grid item md={6}>
                  <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    value={author.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    label="Address"
                    name="address"
                    variant="outlined"
                    value={author.address}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>

        <Grid item md={4}>
          <Books books={author.books} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthorDetail;
