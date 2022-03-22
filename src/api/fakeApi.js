import { createServer, Response } from "miragejs";

import {
  getAuthorById,
  getAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "./authors.js";

export function makeServer() {
  const callApi = (apiMethod) => {
    let result;

    const callApi = async () => {
      try {
        const data = await apiMethod();
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    result = callApi();
    return result;
  };

  return createServer({
    routes() {
      this.namespace = "api";

      this.get("/authors", (schema, request) => {
        return callApi(getAuthors);
      });

      this.get("/authors/:id", (schema, request) => {
        return callApi(getAuthorById.bind(null, request.params.id));
      });

      this.post("/authors", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return callApi(createAuthor.bind(null, attrs));
      });

      this.patch("/authors/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return callApi(updateAuthor.bind(null, attrs));
      });

      this.delete("/authors/:id", (schema, request) => {
        return callApi(deleteAuthor.bind(null, request.params.id));
      });
    },
  });
}
