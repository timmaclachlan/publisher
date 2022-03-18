import { createServer, Response } from "miragejs";

import { getAuthorById, getAuthors, createAuthor, updateAuthor } from "./authors.js";

export function makeServer() {
    return createServer({
        routes() {
            this.namespace = "api";

            this.get("/authors", (schema, request) => {
                let result = [];

                const retrieveAuthors = async () => {
                    try {
                        const data = await getAuthors();
                        return data;
                    } catch (error) {
                        console.log(error);
                    }
                };
                result = retrieveAuthors();
                return result;
            });

            this.get("/authors/:id", (schema, request) => {
                let result = {};

                const retrieveAuthor = async () => {
                    try {
                        const data = await getAuthorById(request.params.id);
                        return data;
                    } catch (error) {
                        console.log(error);
                    }
                };
                result = retrieveAuthor();
                return result;
            });

            this.post("/authors", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                let result = false;
                const saveAuthor = async () => {
                    try {
                        const result = await createAuthor(attrs);
                        return result;
                    } catch (error) {
                        console.log(error);
                    }
                };
                result = saveAuthor();
                return result;
            });

            this.patch("/authors/:id", (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                let result = false;
                const saveAuthor = async () => {
                    try {
                        const result = await updateAuthor(attrs);
                        return result;
                    } catch (error) {
                        console.log(error);
                    }
                };
                result = saveAuthor();
                return result;
            });
        },
    });
}
