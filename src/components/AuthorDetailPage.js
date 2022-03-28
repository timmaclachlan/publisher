import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

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
    <div>
        <section className="authorDetailsContainer">
        {!editMode && (
          <section className="authorDetails">
            <button
                className="authorDetailsDeleteButton"
                onClick={ev => makeChange(ev, deleteById.bind(null, id))}
              >Delete</button>
            <button className="authorDetailsEditButton" onClick={() => setEditMode(true)}>
              Edit
            </button>
            <label>Name</label>
            <label className="authorDetails">{author.name}</label>
            <label>Address</label>
            <label className="authorDetails">{author.address}</label>
          </section>
        )}

        {editMode && (
          <form>
            <section className="authorDetails">
              <button className="authorDetailsCancelButton" 
              onClick={() => setEditMode(false)}>Cancel</button>
              <button
                className="authorDetailsSaveButton"
                onClick={ev => makeChange(ev, updateById.bind(null, author, id))}
              >
                Save
              </button>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={author.name}
                onChange={handleChange}
                className="authorDetails"
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                value={author.address}
                onChange={handleChange}
                className="authorDetails"
              />
            </section>
          </form>
        )}

        <section className="bookDetails">
          <Books books={author.books} />
        </section>
      </section>

      <div>
        <button onClick={() => navigate("/authors")}>Authors</button>
      </div>
    </div>
  );
};

export default AuthorDetail;
