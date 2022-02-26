import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { getBookById } from '../api/books';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  
  useEffect(() => {
    const bookRecord = getBookById(id);

    setBook(bookRecord);
  }, [id])

  return (
    <div>BookDetail title: {book.title}</div>
  )
}

export default BookDetail