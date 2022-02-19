import { authors } from '../db/db.js';

// synchronous
export const getAuthors = () => Object.values(authors);