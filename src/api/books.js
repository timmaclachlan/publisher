import { books } from '../db/db.js';

// synchronous
export const getBooks = () => Object.values(books);