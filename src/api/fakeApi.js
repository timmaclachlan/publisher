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

        
        },
    });
}
