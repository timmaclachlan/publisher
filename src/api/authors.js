import { authors } from '../db/db.js';


export const getAuthors = () => new Promise((resolve, reject) => {
  if (!authors) {
    reject(new Error('Authors not found'));
  }
  setTimeout(resolve(Object.values(authors)), 500);
})

export const getAuthorById = (id) => new Promise((resolve, reject) => {
  let author = authors.find(x => x.id === parseInt(id));
  if (!author) {
    reject(new Error('Author not found'));
  }
  setTimeout(() => resolve(author), 500);
})
  
export const updateAuthor = (data) => new Promise((resolve, reject) => {
  let index = authors.findIndex(x => x.id === parseInt(data.id));
  if (index === -1) {
    reject(new Error('Author not found'));
  }
  authors[index] = { ...authors[index], ...data };

  setTimeout(() => resolve(true), 500);
})

export const createAuthor = (data) => new Promise((resolve, reject) => {
  if (!data.name) {
    reject(new Error('Name should be provided'));
  }
  debugger;
  const maxId = Math.max.apply(Math, authors.map(x => x.id));
  authors.push({ ...data, id: maxId + 1 });

  setTimeout(() => resolve(maxId + 1), 500);
})

