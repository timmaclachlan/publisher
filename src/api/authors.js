// synchronous
const getAuthors = () => Object.values(authors);

// asynchronous
const getAuthorsAsync = () => Promise.resolve(getAuthors());
