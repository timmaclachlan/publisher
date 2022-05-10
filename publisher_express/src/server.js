import express from "express";
import cors from "cors";
import 'dotenv/config';

const { Pool } = require('pg');
const routes = require('./routes/authors');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/", routes);
//app.use(cors);

let db = require('./database');

 const pool = new Pool();

 //https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/ 
 //https://node-postgres.com/features/queries
app.get('/', (req, res) => {
  let sql = `SELECT * FROM "${"timm2006/athena"}"."authors"`;
  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json(results.rows);
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

