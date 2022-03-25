const BASE_URL = "/api";

const getSchemaUrl = (schema) => `${BASE_URL}/${schema}s`;

const makeRequest = async (schema, id = 0, method = 'GET', body = undefined) => {
  let responseObject = { errorMessage: '', data: [] };

  const requestInit = { method: method, body: JSON.stringify(body) };
  let url = getSchemaUrl(schema);
  if (id > 0) {
    url = `${url}/${id}`;
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

export const readAll = (schema) => {
  return makeRequest(schema);
}

export const readById = (schema, id) => {
  return makeRequest(schema, id)
}

export const updateById = (model, id, schema) => {
  return makeRequest(schema, id, 'PATCH', model);
}

export const deleteById = (id, schema) => {
  return makeRequest(schema, id, 'DELETE');
}

export const create = (model, schema) => {
  return makeRequest(schema, 0, 'POST', model);
}
