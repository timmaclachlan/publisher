const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;
const config = require('dotenv').config();

const DBPATH = "timm2006/athena";
const TABLE = "authors";
const TABLEQUAL = `"${DBPATH}"."${TABLE}"`;

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

router.get('/authors', (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL}`;

  console.log(sql);
  console.log(process.env.PGUSER);

  const pool = new Pool();
  pool.query(sql, (error, results) => {
    res.json({ message: "success", data: results.rows });
  });
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);
