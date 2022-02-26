import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { getAuthorById } from '../api/authors';

const AuthorDetail = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const authorRecord = getAuthorById(id);

    setAuthor(authorRecord);
  }, [id]);

  return (
    <div>AuthorDetail name: {author.name}</div>
  )
}

export default AuthorDetail