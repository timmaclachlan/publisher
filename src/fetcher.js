//const BASE_URL = "/api";

const BASE_URL = ".netlify/functions/server";

const getSchemaUrl = (schema) => `${schema}s`;

const makeRequest = async (
  schema,
  isLookup = false,
  id = null,
  subschema = null,
  method = "GET",
  body = undefined
) => {
  const SERVER_URL = process.env.REACT_APP_SERVERHOST;
  console.log("Server URL:" + SERVER_URL);
  console.log("Environment:" + process.env.NODE_ENV);

  const requestInit = {
    method: method,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  console.log(JSON.stringify(body));

  let url = `${SERVER_URL}/${BASE_URL}/`;
  console.log("url:" + url);

  if (isLookup) {
    url = `${url}lookup/`;
  }

  url = `${url}${getSchemaUrl(schema)}`;

  if (id && id.length > 0) {
    url = `${url}/${id}`;
  }

  if (subschema) {
    url = `${url}/${getSchemaUrl(subschema)}`;
  }
  console.log("urlagain:" + url);

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

export const readByIdAll = (schema, subschema, id) => {
  return makeRequest(schema, false, id, subschema);
};

export const updateById = (model, id, schema) => {
  debugger;
  return makeRequest(schema, false, id, null, "PATCH", model);
};

export const deleteById = (id, schema) => {
  return makeRequest(schema, false, id, null, "DELETE");
};

export const create = (model, schema) => {
  debugger;
  return makeRequest(schema, false, 0, null, "POST", model);
};
