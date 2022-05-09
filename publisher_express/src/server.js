import express from "express";
import cors from "cors";
import 'dotenv/config';

const { Client } = require('pg');
const routes = require('./routes/authors');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use("/", routes);
app.use(cors);

let db = require('./database');

const client = new Client({
    user: 'timm2006_demo_db_connection',
    host: 'db.bit.io',
    database: 'bitdotio',
    password: '3nEd6_jhhm4h3xLRwbUbcQJQQSYX4',
    port: 5432,
});

app.get('/', (req, res) => {
  client.connect();

  client.query('SELECT * FROM "timm2006/athena"."authors"', (err, result) => {
    res.json(result.rows);
  });
});

app.get('/sqllite', (req, res) => {
  db.all("select * from authors", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success", "data": rows });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

