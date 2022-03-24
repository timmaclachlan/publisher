import { createServer, Model } from "miragejs";

import { authors as authorsdb } from './seed/db.js';


export function makeServer() {

  return createServer({
    models: {
      author: Model,
    },
    seeds(server) {
      authorsdb.forEach((item) => {
        server.create("author", item);
      })
    },

    routes() {
      this.namespace = "api";

      this.get("/authors", (schema, request) => {
        let data = schema.authors.all();
        return data.models;
      });

      this.get("/authors/:id", (schema, request) => {
        return schema.authors.find(request.params.id);
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
    },
  });
}
