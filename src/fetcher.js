const BASE_URL = "http://localhost:3000/api";

export const fetcher = async (url) => {
  let responseObject = { errorMessage: '', data: [] };

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const responseData = await response.json();
    responseObject.errorMessage = '';
    responseObject.data = responseData;

    return responseObject;
  }
  catch (err) {
    responseObject.errorMessage = err.message;
    return responseObject;
  }
}

export const poster = async (url, body) => {
  let responseObject = { errorMessage: '', data: [] };

  let requestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const responseData = await response.json();
    responseObject.errorMessage = '';
    responseObject.data = responseData;

    return responseObject;
  }
  catch (err) {
    responseObject.errorMessage = err.message;
    return responseObject;
  }
}

export const patcher = async (url, body) => {
  let responseObject = { errorMessage: '', data: [] };

  let requestInit = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestInit);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const responseData = await response.json();
    responseObject.errorMessage = '';
    responseObject.data = responseData;

    return responseObject;
  }
  catch (err) {
    responseObject.errorMessage = err.message;
    return responseObject;
  }
}

export const getAuthors = () => {
  return fetcher('/api/authors');
}

export const getAuthorById = id => {
  return fetcher('/api/authors/' + id);
}

export const createAuthor = (author) => {
  return poster('/api/authors', author);
}

export const updateAuthor = (author) => {
  return patcher('/api/authors/' + author.id, author);
}