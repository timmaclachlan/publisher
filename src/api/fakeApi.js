import { createServer, Model, belongsTo, hasMany, Response } from "miragejs";

import { authors as authorsdb, books as booksdb } from './seed/db.js';


export function makeServer() {

  return createServer({
    models: {
      author: Model.extend({
        books: hasMany()
      }),
      book: Model.extend({
        author: belongsTo()
      })
    },
    seeds(server) {
      authorsdb.forEach((item) => {
        server.create("author", item);
      });
      booksdb.forEach((item) => {
        server.create("book", item);
      })
    },

    routes() {
      this.namespace = "api";

      this.get("/authors", (schema, request) => {
        let data = schema.authors.all();
        return data.models;
      });

      this.get("/authors/:id", (schema, request) => {
        let author = schema.authors.find(request.params.id);

        let newAuthor = {...author.attrs, books: [...author.books.models]}
        return newAuthor;
      });

      this.post("/authors", (schema, request) => {
        const data = schema.authors.all();
        const maxId = Math.max.apply(Math, data.models.map(x => x.id));
        let attrs = JSON.parse(request.requestBody);
        let result = schema.authors.create({ ...attrs, id: maxId + 1 });        
        return result;
      });

      this.patch("/authors/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);        
        let data = schema.authors.find(request.params.id);
        return data.update(attrs);
      });

      this.delete("/authors/:id", (schema, request) => {
        return schema.authors.find(request.params.id).destroy();
      });

      this.get("/books", (schema, request) => {
        let data = schema.books.all();
        debugger;
        return data.models;
      });

      this.get("/books/:id", (schema, request) => {
        return schema.books.find(request.params.id);
      });
    },
  });
}
