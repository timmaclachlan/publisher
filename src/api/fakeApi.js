import { createServer, Model, belongsTo, hasMany, Factory } from "miragejs";
import faker from "@faker-js/faker";

import { authors as authorsdb, books as booksdb } from "./seed/db.js";

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
      author: Factory.extend({
        name() {
          return faker.name.findName();
        },
        address() {
          return faker.address.streetAddress(true);
        },
        active() {
          return faker.random.arrayElement([true, false]);
        },
      }),
      book: Factory.extend({
        price() {
          return faker.finance.amount(3, 10);
        },
        title() {
          const capitalize = (sentence) => {
            const words = sentence.split(" ");
            return words
              .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
              })
              .join(" ");
          };

          return capitalize(
            `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`
          );
        },
        authorId() {
          function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          //https://www.w3schools.com/js/js_random.asp
          return randomNum(3, NOAUTHORS);
        },
      }),
    },
    seeds(server) {
      authorsdb.forEach((item) => {
        server.create("author", item);
      });
      booksdb.forEach((item) => {
        server.create("book", item);
      });

      server.createList("author", NOAUTHORS);
      server.createList("book", NOBOOKS);
    },

    routes() {
      this.namespace = "api";

      this.get("/authors", (schema, request) => {
        let data = schema.authors.all();
        return data.models;
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
        let data = schema.authors.find(request.params.id);
        return data.update(attrs);
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
        debugger;
        let newBook = { ...book.attrs, author: { ...book.author?.attrs } };
        return newBook;
      });
    },
  });
}
