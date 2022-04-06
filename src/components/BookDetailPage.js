import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { readById, updateById, deleteById } from "../fetcher";

const BookDetail = ({onRecordChange}) => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [editMode, setEditMode] = useState(false);

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
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBook((prevState) => {
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
      await method("book");
    };
    callApi();
  };

  return (
    <>
      <div>
        <section className="detailsContainer">
          {!editMode && (
            <section className="details">
              
              <button
                className="detailsEditButton"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <label>Title</label>
              <label className="details">{book.title}</label>
              <label>Author</label>
              <label className="details">
                <Link to={"/authors/" + book.author?.id}>{book.author?.name}</Link>
              </label>
            </section>
          )}

          {editMode && (
            <form>
              <section className="details">
                <button
                  className="detailsCancelButton"
                  onClick={() => setEditMode(false)}
                >Cancel</button>
                <button
                className="detailsSaveButton"
                onClick={ev => makeChange(ev, updateById.bind(null, book, id))}
              >
                Save
              </button>

                <label htmlFor="name">Title</label>
                <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className="details"
              />

                <label htmlFor="address">Author</label>
                <select className="details">
                  <option>Enid Blyton</option>
                  <option>John Doe</option>
                </select>
              </section>
            </form>
          )}
        </section>
      </div>
    </>
  );
};

export default BookDetail;
