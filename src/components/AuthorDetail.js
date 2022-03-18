import React, { useEffect, useState} from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { getAuthorById, createAuthor, updateAuthor, deleteAuthor } from "../fetcher";

const AuthorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState({id: 0, name: '', address: ''});

  useEffect(() => {
    const retrieveAuthor = async () => {
      try {
        const authorRecord = await getAuthorById(id);
        setAuthor(authorRecord.data);
      }
      catch (error) {
        console.log(error);
        navigate('/notfound');
      }
    }
    if (id > 0) {
      retrieveAuthor();
    }
    else if (id !== undefined) {
      navigate('/notfound');
    }

  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAuthor((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  const updateClick = (event) => {
    event.preventDefault();

    const saveAuthor = async () => {    
       const result = await updateAuthor(author);
     }
    saveAuthor();
  }

  const createClick = (event) => {
    event.preventDefault();

    const saveAuthor = async () => {    
      const result = await createAuthor(author);
     }
    saveAuthor();
  }

  const deleteClick = (event) => {
    event.preventDefault();

    const removeAuthor = async () => {
      const result = await deleteAuthor(id);
    }
    removeAuthor();
  }

  return (
    <div>
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={author.name} onChange={handleChange} />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" value={author.address} onChange={handleChange} />

      {author.id === 0 &&
        <button onClick={createClick}>Create</button>
      }
      {author.id > 0 &&
        <button onClick={updateClick}>Update</button>
      }

      <button onClick={deleteClick}>Delete</button>
      </form>    
      <div><button onClick={() => navigate('/authors')}>
        Authors
      </button></div>
    </div>      
  )
}

export default AuthorDetail