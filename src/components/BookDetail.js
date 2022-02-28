import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { getBookById } from '../api/books';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  
  useEffect(() => {
    const retrieveBook = async () => {
      try {
        const bookRecord = await getBookById(id);
        console.log('bookrecord:' + bookRecord);
        setBook(bookRecord);
      }
      catch (error) {
        console.log(error);
      }
    }
    retrieveBook();
    
  }, [id])

  return (
    <div>BookDetail title: {book.title}</div>
  )
}

export default BookDetail