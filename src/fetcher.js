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



export const getAuthors = () => {
  return fetcher('/api/authors');
}

export const getAuthorById = id => {
  return fetcher('/api/authors/' + id);
}
