import { books } from '../db/db.js';

// synchronous
export const getBooks = () => Object.values(books);

export const getBookById = (id) => books.find(x => x.id === parseInt(id));