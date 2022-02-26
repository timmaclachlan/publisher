import { authors } from '../db/db.js';


export const getAuthors = () => new Promise((resolve, reject) => {
  if (!authors) {
    reject(new Error('Authors not found'));
  }
  setTimeout(resolve(Object.values(authors)), 500);
})

export const getAuthorById = (id) => authors.find(x => x.id === parseInt(id));
