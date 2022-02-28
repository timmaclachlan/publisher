import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { getAuthorById } from '../api/authors';

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

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={author.name} onChange={handleChange} />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" value={author.address} onChange={handleChange} />
    </form>
  )
}

export default AuthorDetail