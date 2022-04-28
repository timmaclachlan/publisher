import { createServer, Model, belongsTo, hasMany, Response } from "miragejs";

import { authors as authorsdb, books as booksdb } from "./seed/db.js";
import { AuthorFactory } from "./seed/AuthorFactory.js";
import { BookFactory } from "./seed/BookFactory.js";
import { OrdersB2BFactory } from "./seed/OrdersB2BFactory.js";

import { selectProps } from "../utils.js";

const NOAUTHORS = 10;
const NOBOOKS = 10;
const NOORDERS = 50;

const NOT_FOUND = 404;

export function makeServer() {
  return createServer({
    models: {
      author: Model.extend({
        books: hasMany(),
      }),
      book: Model.extend({
        author: belongsTo(),
        orders: hasMany()
      }),
      order: Model.extend({
        book: belongsTo()
      })
    },
    factories: {
      author: AuthorFactory,
      book: BookFactory,
      order: OrdersB2BFactory
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
        if (author) {
          let newAuthor = { ...author.attrs, books: [...author.books?.models] };
          return newAuthor;
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
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
        if (author) {
          let updateAuthor = author.update(
            {
              realName: attrs.realName,
              penName: attrs.penName,
              email: attrs.email,
              phoneNumber: attrs.phoneNumber,
              location: attrs.location,

              address1: attrs.address,
              address2: attrs.address2,
              address3: attrs.address3,
              address4: attrs.address4,
              postCode: attrs.postCode,

              sortCode: attrs.sortCode,
              accountNo: attrs.accountNo,
              iban: attrs.iban,
              bic: attrs.bic,
              retainedClient: attrs.retainedClient,
              gender: attrs.gender,
              notes: attrs.notes,
              active: attrs.active
            }
          )
          return updateAuthor;
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
      });

      this.delete("/authors/:id", (schema, request) => {
        let author = schema.authors.find(request.params.id);
        if (author) {
          author.destroy();
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
      });

      this.get("/books", (schema, request) => {
        let data = schema.books.all();
        return data.models;
      });

      this.get("/books/:id", (schema, request) => {
        let book = schema.books.find(request.params.id);
        if (book) {
          let newBook = { ...book.attrs, author: { ...book.author?.attrs } };
          return newBook;
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
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
        if (book) {
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
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
      });

      this.delete("/books/:id", (schema, request) => {
        let book = schema.books.find(request.params.id);
        if (book) {
          book.destroy();
        }
        return new Response(NOT_FOUND, { errors: 'Not found' });
      });

      this.get("/orders", (schema, request) => {
        let data = schema.orders.all();
        let newData = data.models.map((order) => {
          let newOrder = { ...order.attrs, title: order.book.title, author: order.book.author.penName };
          return newOrder;
        });
        return newData;
      })
    },
  });
}


