import { books } from '../db/db.js';

export const getBooks = () => new Promise((resolve, reject) => {
  if (!books) {
    reject(new Error('Books not found'));
  }
  setTimeout(resolve(Object.values(books)), 500);
})

export const getBookById = (id) => books.find(x => x.id === parseInt(id));