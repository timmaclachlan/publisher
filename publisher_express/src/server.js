import express from "express";
import cors from "cors";
import 'dotenv/config';

const routes = require('./routes/authors');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/", routes);
//app.use(cors);

//https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/ 
 //https://node-postgres.com/features/queries

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

