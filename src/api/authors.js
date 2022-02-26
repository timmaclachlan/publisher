import { authors } from '../db/db.js';

// synchronous
export const getAuthors = () => Object.values(authors);

export const getAuthorById = (id) => authors.find(x => x.id === parseInt(id));
