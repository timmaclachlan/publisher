import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { getAuthorById, updateAuthor, createAuthor } from '../api/authors';

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({name: '', address: ''});

  useEffect(() => {
    const retrieveAuthor = async () => {
      try {
        const authorRecord = await getAuthorById(id);
        setAuthor(authorRecord);
      }
      catch (error) {
        console.log(error);
      }
    }
    retrieveAuthor();
  }, [id]);

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

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={author.name} onChange={handleChange} />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" value={author.address} onChange={handleChange} />

      <button onClick={updateClick}>Update</button>
      <button onClick={createClick}>Create</button>
    </form>
  )
}

export default AuthorDetail