//const BASE_URL = "/api";

const BASE_URL = ".netlify/functions/server";

const getSchemaUrl = (schema) => `${schema}s`;

const makeRequest = async (
  schema,
  isLookup = false,
  id = null,
  subschema = null,
  method = "GET",
  body = undefined,
  querypath = null,
  query = null
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

  if (schema) {
    url = `${url}${getSchemaUrl(schema)}`;
  }

  if (id && id.length > 0) {
    url = `${url}/${id}`;
  }

  if (subschema) {
    url = `${url}/${getSchemaUrl(subschema)}`;
  }

  if (querypath) {
    url = `${url}${querypath}?${query}`;
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

const makeRequestAuth = async (
  path,
  body = undefined
) => {
  const requestInit = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjRoUEg0cHQzTnltSFkyNXJLb2diZiJ9.eyJpc3MiOiJodHRwczovL3Jvd2FudmFsZS5ldS5hdXRoMC5jb20vIiwic3ViIjoic3hPeFQ2S1IzWlVmU1luRE5DRFd1UGJFZWlPaUE2Q1NAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcm93YW52YWxlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNjU4OTEwNjY0LCJleHAiOjE2NTg5OTcwNjQsImF6cCI6InN4T3hUNktSM1pVZlNZbkROQ0RXdVBiRWVpT2lBNkNTIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.DxY8srgPe1GFJ2lIiHy7u2floBzaL2vEi-3yq-enOVCGFWiL31GPTDfPjz-881wbIaoMKzZoLZQfuhYG-2_UsvO61idUbfzM4zMeiB9pmJqib1P6sv9cnuLM4SHTa8fuM1DnJ7-7bFQmpUQ9FRHF5DmsxmxRIrpDgui0od9GGMgQFiLMH8DC7HRJoGjDU-EqyfBHysgO3VO4W9MUUWReEhvVX6bOd8NpkZWq7yAsu7q2EEs9vhFg-vMmF4mWevrzwpDrlm7HgqNyYay7J3fwGlayeWJZHA_tBTw00YoImZBLIrPtCMSsbelXLQ6jj6eD68jhdyScw_fyUtfW67"
   },
    body: JSON.stringify(body),
  };
  console.log(JSON.stringify(body));

  let url = `https://rowanvale.eu.auth0.com/api/v2/${path}`;
  console.log("url:" + url);

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

export const readAllSubAll = (schema, subschema) => {
  return makeRequest(schema, false, undefined, subschema);
}

export const readAllByQuery = (querypath, query) => {
  return makeRequest(null, false, false, "", "GET", undefined, querypath, query);
}


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

export const updateAll = (model, schema) => {
  return makeRequest(schema, false, undefined, null, "PATCH", model);
}

export const deleteById = (id, schema) => {
  return makeRequest(schema, false, id, null, "DELETE");
};

export const create = (model, schema) => {
  return makeRequest(schema, false, 0, null, "POST", model);
};

export const requestAuth = (model) => {
  debugger;
  return makeRequestAuth('users', model);
}