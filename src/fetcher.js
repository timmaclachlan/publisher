//const BASE_URL = "/api";


const BASE_URL = ".netlify/functions/server";

const getSchemaUrl = (schema) => `${schema}s`;

const makeRequest = async (
  schema,
  isLookup = false,
  id = 0,
  method = "GET",
  body = undefined
) => {

  const SERVER_URL = process.env.REACT_APP_SERVERHOST;
  debugger;
  const requestInit = { method: method, body: JSON.stringify(body) };
  let url = `${SERVER_URL}/${BASE_URL}/`;
  if (isLookup) {
    url = `${url}lookup/`;
  }

  url = `${url}${getSchemaUrl(schema)}`;

  if (id.length === 36) {
    url = `${url}/${id}`;
  }

  const response = await fetch(url, requestInit);
  if (!response.ok) {
    if (response.status !== 404)
      throw new Error(`HTTP Error ${response.status} - ${response.message}`);
  }
  const responseData = await response.json();
  return responseData;
};

export const readAll = (schema) => {
  return makeRequest(schema);
};

export const readLookupAll = (schema) => {
  return makeRequest(schema, true);
};

export const readById = (schema, id) => {
  return makeRequest(schema, false, id);
};

export const updateById = (model, id, schema) => {
  return makeRequest(schema, false, id, "PATCH", model);
};

export const deleteById = (id, schema) => {
  return makeRequest(schema, false, id, "DELETE");
};

export const create = (model, schema) => {
  return makeRequest(schema, false, 0, "POST", model);
};
