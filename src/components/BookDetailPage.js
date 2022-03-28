import React, { useEffect, useState} from 'react'

import { useParams } from 'react-router-dom'

import { readById } from "../fetcher";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  
  useEffect(() => {
    const retrieveBook = async () => {
      try {
        const bookRecord = await readById('book', id);
        console.log('bookrecord:' + bookRecord);
        setBook(bookRecord.data.book);
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