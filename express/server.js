const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;
require("dotenv").config();
const cors = require("cors");

const TABLE_AUTHORS = "authors";
const TABLE_BOOKS = "books";

const TABLEQUAL_AUTHORS = `"${process.env.DBPATH}"."${TABLE_AUTHORS}"`;
const TABLEQUAL_BOOKS = `"${process.env.DBPATH}"."${TABLE_BOOKS}"`;

const router = express.Router();

router.post("/authors", cors(), (req, res) => {
  let sql = `INSERT INTO ${TABLEQUAL_AUTHORS} (id, realName,penName) VALUES($1,$2,$3) RETURNING id`;
  let data = [v4(), req.body.realName, req.body.penName];
  return updateQuery(sql, data, res);
});


router.get("/authors/:id", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} WHERE id='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/authors", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
  return getQuery(sql, res);
});

router.get("/authors/lookup", cors(), (req, res) => {
  let sql = `SELECT id,realname FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
  return getQuery(sql, res);
});

router.patch("/author/:id", cors(), (req, res) => {
  let sql = `UPDATE ${TABLEQUAL_AUTHORS} SET realname = $1, penName=$2 WHERE id='${req.params.id}'`;
  let data = [req.body.realName, req.body.penName];
  return updateQuery(sql, data, res);
});

router.get("/books", cors(), (req, res) => {
  console.log("calling books");
  let sql = `SELECT books.*, authors.realname AS "authorname" FROM ${TABLEQUAL_BOOKS} books 
  JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
  ORDER BY publicationdate DESC`;

  console.log(sql);
  return getQuery(sql, res);
});

router.get("/books/:id", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_BOOKS} WHERE id='${req.params.id}'`;
  return getQuery(sql, res);
});



function updateQuery(sql, data, res) {
  const pool = new Pool();
  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to create/update record:" + error] });
    }
    res.statusCode = 201;
    res.json({ message: "success", result: results.rows[0].id });
  });
}

function getQuery(sql, res) {
  console.log(sql);
  console.log(
    "ENV: (user)" + process.env.PGUSER + " pghost:" + process.env.PGHOST
  );

  const pool = new Pool();
  pool.query(sql, (error, results) => {
    if (error) {
      res.statusCode = 500;
      return res.json({ errors: ["Failed to retrieve: " + error.message] });
    }
    res.statusCode = 200;
    res.json({ message: "success", result: results.rows });
  });
}

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
