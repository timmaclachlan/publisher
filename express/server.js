const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;
require("dotenv").config();


app.use(cors({
  origin: '*', // TODO: lock down
  methods: ["GET","POST", "PATCH", "DELETE"]
}));
//app.use(express.json());
app.use(bodyParser.json());



const TABLE_AUTHORS = "authors";
const TABLE_BOOKS = "books";
const TABLE_GENRES = "genres";
const TABLE_ORDERS = "retailorders";

//const TABLEQUAL_AUTHORS = `"${process.env.DBPATH}"."${TABLE_AUTHORS}"`;
//const TABLEQUAL_BOOKS = `"${process.env.DBPATH}"."${TABLE_BOOKS}"`;

const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLEQUAL_BOOKS = `"timm2006/athena"."${TABLE_BOOKS}"`;
const TABLEQUAL_GENRES = `"timm2006/athena"."${TABLE_GENRES}"`;
const TABLEQUAL_ORDERS = `"timm2006/athena"."${TABLE_ORDERS}"`;

const router = express.Router();

router.post("/authors", (req, res) => {
  let sql = `INSERT INTO ${TABLEQUAL_AUTHORS} (id, realName,penName) VALUES($1,$2,$3) RETURNING id`;
  let data = [v4(), req.body.realname, req.body.penname];
  return updateQuery(sql, data, res);
});


router.get("/authors/:id", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} WHERE id='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/authors/:id/books", cors(), (req, res) => {
  console.log("get books for authors");
  let sql = `SELECT id, title, publicationdate FROM ${TABLEQUAL_BOOKS} WHERE authorid='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/authors", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
  return getQuery(sql, res);
});

router.get("/lookup/authors", cors(), (req, res) => {
  let sql = `SELECT id,realname FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
  return getQuery(sql, res);
});

router.get("/genres", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} ORDER BY genre`;
  return getQuery(sql, res);
});

router.get("/genres/:id", cors(), (req, res) => {  
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} WHERE id='${req.params.id}'`;
  return getQuery(sql, res);
});

router.patch("/authors/:id", (req, res) => {
  console.log('in Patch');
  console.log(req.body);


  let sql = `UPDATE ${TABLEQUAL_AUTHORS} SET 
    realname = $1, penname = $2,
    email = $3, phonenumber = $4,
    location = $5, address1 = $6,
    address2 = $7, address3 = $8,
    address4 = $9, postcode = $10,
    website = $11, notes = $12,
    retained = $13, sortcode = $14,
    accountno = $15, paypal = $16
    WHERE id='${req.params.id}'`;
  let data = [
    req.body.realname, req.body.penname,
    req.body.email, req.body.phonenumber,
    req.body.location, req.body.address1,
    req.body.address2, req.body.address3,
    req.body.address4, req.body.postcode,
    req.body.website, req.body.notes,
    req.body.retained, req.body.sortcode,
    req.body.accountno, req.body.paypal];

  return updateQuery(sql, data, res);
});

router.get("/books", cors(), (req, res) => {
  console.log("calling books");
  console.log("DBPATH from env:" + process.env.DBPATH);

  let sql = `SELECT books.*, authors.realname AS "authorname" FROM ${TABLEQUAL_BOOKS} books 
  JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
  ORDER BY publicationdate DESC`;

  console.log(sql);
  return getQuery(sql, res);
});

router.get("/books/:id", cors(), (req, res) => {
  let sql = `SELECT books.*, authors.realname AS "author_name", authors.penname AS "author_penname" 
  FROM ${TABLEQUAL_BOOKS} books JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid 
  WHERE books.id='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/orders", cors(), (req, res) => {
  console.log("GET ORDERS");
  let sql = `SELECT *, authors.realname as "author" FROM ${TABLEQUAL_ORDERS} orders 
    JOIN ${TABLEQUAL_BOOKS} books ON books.id = orders.bookid
    JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
    ORDER BY orderdate DESC`;
  return getQuery(sql, res);
});

router.get("/reports/book", (req, res) => {
  let sql = `SELECT authors.realname, books.title, books.id FROM ${TABLEQUAL_BOOKS} books
  JOIN ${TABLEQUAL_AUTHORS} authors
  ON authors.id = books.authorid
  ORDER BY authors.realname`;
  return getQuery(sql, res);

})

function updateQuery(sql, data, res) {
  const pool = new Pool();
  console.log('UPDATE QUERY:' + sql);
  console.log(data);
  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to create/update record:" + error] });
    }
     res.statusCode = 200;
     res.json({ message: "success" });
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

app.use("/.netlify/functions/server", router); // path must route to lambda
module.exports = app;
module.exports.handler = serverless(app);
