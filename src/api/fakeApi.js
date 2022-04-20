import { createServer, Model, belongsTo, hasMany } from "miragejs";

import { authors as authorsdb, books as booksdb } from "./seed/db.js";
import { AuthorFactory } from "./seed/AuthorFactory.js";
import { BookFactory } from "./seed/BookFactory.js";

const NOAUTHORS = 10;
const NOBOOKS = 10;

export function makeServer() {
  return createServer({
    models: {
      author: Model.extend({
        books: hasMany(),
      }),
      book: Model.extend({
        author: belongsTo(),
      }),
    },
    factories: {
      author: AuthorFactory,
      book: BookFactory,
    },
    seeds(server) {
      authorsdb.forEach((item) => {
        server.create("author", item);
      });
      booksdb.forEach((item) => {
        server.create("book", item);
      });

      //server.createList("author", NOAUTHORS);
      //server.createList("book", NOBOOKS);
    },

    routes() {
      this.namespace = "api";

      this.get("/authors", (schema, request) => {
        let data = schema.authors.all();
        return data.models;
      });

      this.get("/lookup/authors", (schema, request) => {
        let data = schema.authors.all();
        let subData = data.models.map(selectProps("id", "fullName"));
        return subData;
      });

      this.get("/authors/:id", (schema, request) => {
        let author = schema.authors.find(request.params.id);

        let newAuthor = { ...author.attrs, books: [...author.books?.models] };
        return newAuthor;
      });

      this.post("/authors", (schema, request) => {
        const data = schema.authors.all();
        const maxId = Math.max.apply(
          Math,
          data.models.map((x) => x.id)
        );
        let attrs = JSON.parse(request.requestBody);
        let result = schema.authors.create({ ...attrs, id: maxId + 1 });
        return result;
      });

      this.patch("/authors/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let author = schema.authors.find(request.params.id);
        let updateAuthor = author.update(
          {
            name: attrs.name,
            address: attrs.address
          }
        )
        return updateAuthor;
      });

      this.delete("/authors/:id", (schema, request) => {
        return schema.authors.find(request.params.id).destroy();
      });

      this.get("/books", (schema, request) => {
        let data = schema.books.all();
        return data.models;
      });

      this.get("/books/:id", (schema, request) => {
        let book = schema.books.find(request.params.id);
        let newBook = { ...book.attrs, author: { ...book.author?.attrs } };
        return newBook;
      });

      this.post("/books", (schema, request) => {
        const data = schema.books.all();
        const maxId = Math.max.apply(
          Math,
          data.models.map((x) => x.id)
        );
        let attrs = JSON.parse(request.requestBody);
        let result = schema.books.create({ ...attrs, id: maxId + 1 });
        return result;
      });

      this.patch("/books/:id", (schema, request) => {
        debugger;
        let attrs = JSON.parse(request.requestBody);
        let book = schema.books.find(request.params.id);

        let updateBook = book.update({
          title: attrs.title,
          authorId: attrs.authorId,
          genre: attrs.genre,
          published: attrs.published,
          publicationDate: attrs.publicationDate,
          service: attrs.service,
          stillSelling: attrs.stillSelling,
          terminated: attrs.terminated,
          onHold: attrs.onHold,
          matureContent: attrs.matureContent,
        });
        return updateBook;
      });

      this.delete("/books/:id", (schema, request) => {
        return schema.books.find(request.params.id).destroy();
      });
    },
  });
}

// levelup.gitconnected.com/how-to-select-specific-properties-from-an-array-of-objects-bd9f6c15dbd0
const selectProps = (...props) => {
  return function (obj) {
    const newObj = {};
    props.forEach(name => {
      newObj[name] = obj[name];
    });
    return newObj;
  }
}
