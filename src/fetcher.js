const BASE_URL = "/api";

const getSchemaUrl = (schema) => `${schema}s`;

const makeRequest = async (schema, isLookup = false, id = 0, method = 'GET', body = undefined) => {
  let responseObject = { errorMessage: '', data: [] };

  const requestInit = { method: method, body: JSON.stringify(body) };
  let url = `${BASE_URL}/`;
  if (isLookup) {
    url = `${url}lookup/`;
  }

  url = `${url}${getSchemaUrl(schema)}`;
  
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

export const readLookupAll = (schema) => {
  return makeRequest(schema, true);
}

export const readById = (schema, id) => {
  return makeRequest(schema, false, id)
}

export const updateById = (model, id, schema) => {
  return makeRequest(schema, false, id, 'PATCH', model);
}

export const deleteById = (id, schema) => {
  return makeRequest(schema, false, id, 'DELETE');
}

export const create = (model, schema) => {
  return makeRequest(schema, false, 0, 'POST', model);
}
