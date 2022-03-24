import { books } from './seed/db.js';

export const getBooks = () => new Promise((resolve, reject) => {
  if (!books) {
    reject(new Error('Books not found'));
  }
  setTimeout(() => resolve(Object.values(books)), 500);
})

export const getBookById = (id) => new Promise((resolve, reject) => {
  let user = books.find(x => x.id === parseInt(id));
  if (!user) {
    reject(new Error('Book not found'));
  }
  setTimeout(() => resolve(user), 500);
})
  
  