import { books } from '../db/db.js';

// synchronous
export const getBooks = () => Promise.resolve(Object.values(books));

export const getBookById = (id) => books.find(x => x.id === parseInt(id));