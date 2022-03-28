import React, { useEffect, useState} from 'react'

import { useParams, Link } from 'react-router-dom'

import { readById } from "../fetcher";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  
  useEffect(() => {
    const retrieveBook = async () => {
      try {
        const bookRecord = await readById('book', id);
        console.log('bookrecord:' + bookRecord);
        setBook(bookRecord.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    retrieveBook();
    
  }, [id])

  return (
    <>
      <div>BookDetail title: {book.title}</div>
      {book.author &&
        <div>Author: <Link to={"/authors/" + book.author.id}>{book.author.name}</Link></div>
      }
      </>
  )
}

export default BookDetail