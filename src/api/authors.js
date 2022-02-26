import { authors } from '../db/db.js';

// synchronous
export const getAuthors = () => Promise.resolve(Object.values(authors));

export const getAuthorById = (id) => authors.find(x => x.id === parseInt(id));
