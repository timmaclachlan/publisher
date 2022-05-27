const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");
const v4 = require("uuid").v4;

const bodyParser = require("body-parser");
const Pool = require("pg").Pool;

require("dotenv").config();

var authorRoutes = require('./authors');
router.use(authorRoutes('/authors'));  

app.use(
  cors({
    origin: "*", // TODO: lock down
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
//app.use(express.json());
app.use(bodyParser.json());

const TABLE_AUTHORS = "authors";
const TABLE_BOOKS = "books";
const TABLE_GENRES = "genres";
const TABLE_ORDERS = "retailorders";
const TABLE_SERVICES = "services";
const TABLE_SERVICESASSIGNED = "servicesassigned";
const TABLE_BOOKS_FORMATS = "booksformats";

//const TABLEQUAL_AUTHORS = `"${process.env.DBPATH}"."${TABLE_AUTHORS}"`;
//const TABLEQUAL_BOOKS = `"${process.env.DBPATH}"."${TABLE_BOOKS}"`;

const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLEQUAL_BOOKS = `"timm2006/athena"."${TABLE_BOOKS}"`;
const TABLEQUAL_GENRES = `"timm2006/athena"."${TABLE_GENRES}"`;
const TABLEQUAL_ORDERS = `"timm2006/athena"."${TABLE_ORDERS}"`;
const TABLEQUAL_SERVICES = `"timm2006/athena"."${TABLE_SERVICES}"`;
const TABLEQUAL_SERVICESASSIGNED = `"timm2006/athena"."${TABLE_SERVICESASSIGNED}"`;
const TABLEQUAL_BOOKSFORMATS = `"timm2006/athena"."${TABLE_BOOKS_FORMATS}"`;

router.get("/authors/:id/books", (req, res) => {
  console.log("get books for authors");
  let sql = `SELECT id, title, publicationdate,
  (SELECT array_to_string(array_agg(services.service), ',') 
  FROM ${TABLEQUAL_SERVICESASSIGNED} assigned
  JOIN ${TABLEQUAL_SERVICES} services ON services.id = assigned.serviceid
  WHERE bookid = books.id) AS "service"
  FROM ${TABLEQUAL_BOOKS} WHERE authorid='${req.params.id}'`;
  
  return getQuery(sql, res);
});




router.get("/genres", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} ORDER BY genre`;
  return getQuery(sql, res);
});

router.get("/genres/:id", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} WHERE id='${req.params.id}'`;
  return getQuery(sql, res);
});



router.get("/books", (req, res) => {
  console.log("calling books");
  console.log("DBPATH from env:" + process.env.DBPATH);

  let sql = `SELECT books.*, authors.realname AS "authorname",
  (SELECT array_to_string(array_agg(services.service), ',') 
  FROM ${TABLEQUAL_SERVICESASSIGNED} assigned
  JOIN ${TABLEQUAL_SERVICES} services ON services.id = assigned.serviceid
  WHERE bookid = books.id) AS "service"
  FROM ${TABLEQUAL_BOOKS} books 
  JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
  ORDER BY publicationdate DESC, title`;


  console.log(sql);
  return getQuery(sql, res);
});

router.get("/books/:id", (req, res) => {
  let sql = `SELECT books.*, authors.realname AS "author_name", authors.penname AS "author_penname" 
  FROM ${TABLEQUAL_BOOKS} books JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid 
  WHERE books.id='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/books/:id/services", (req, res) => {
  let sql = `SELECT id, service FROM ${TABLEQUAL_SERVICESASSIGNED} WHERE bookid='${req.params.id}'`;
  return getQuery(sql, res);
});

router.get("/books/:id/formats", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_BOOKSFORMATS} WHERE bookid='${req.params.id}'`;
  return getQuery(sql, res);
})

router.patch("/books/:id", (req, res) => {
  console.log("in Patch for Books");
  console.log(req.body);

  let formats = req.body.formats;
  console.log(formats);

  let sql = '';
  let data = [];
  Object.entries(formats).forEach(([k, v]) => {
    if (v.id === null) {
      sql = `INSERT INTO ${TABLEQUAL_BOOKSFORMATS}
      (id, bookid, format, price, isbn, width, height, pagecount)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8)`;
      data = [
        v4(),
        v.bookid,
        v.format,
        v.price,
        v.isbn,
        v.width,
        v.height,
        v.pagecount
      ];
      updateQuery(sql, data);
    }
    else {
      if (v.enabled === false) {
        sql = `DELETE FROM ${TABLEQUAL_BOOKSFORMATS} WHERE id='${v.id}'`;
        deleteQuery(sql);
      }
      else {
        sql = `UPDATE ${TABLEQUAL_BOOKSFORMATS} 
      SET price=$1,isbn=$2,width=$3,height=$4,pagecount=$5
      WHERE id='${v.id}'`;
        data = [
          v.price,
          v.isbn,
          v.width,
          v.height,
          v.pagecount
        ]
        updateQuery(sql, data);
      }
    }
  });
  
  sql = `UPDATE ${TABLEQUAL_BOOKS} SET 
    title = $1, publicationdate = $2, authorid = $3,
    genreid = $4,
    stillselling = $5, terminated = $6,
    maturecontent = $7, onhold = $8,
    published = $9, royalty=$10
    WHERE id='${req.params.id}'`;
  data = [
    req.body.title,
    req.body.publicationdate,
    req.body.author.id,
    req.body.genreid,
    req.body.stillselling,
    req.body.terminated,
    req.body.maturecontent,
    req.body.onhold,
    req.body.published,
    req.body.royalty
  ];
  
  updateQueryWithStatus(sql, data, res);


});

router.get("/orders", (req, res) => {
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
});


function updateQueryWithStatus(sql, data, res) {
  try {
    updateQuery(sql, data);
  }
  catch (error) {
      res.statusCode = 500;
      return res.json({ errors: ["Failed to create/update record:" + error] });
  }
  res.statusCode = 200;
  res.json({ message: "success" });
}

function updateQuery(sql, data) {
  const pool = new Pool();
  console.log("UPDATE QUERY:" + sql);
  console.log(data);
  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      throw error;
    }
  });
}

function deleteQuery(sql) {
  const pool = new Pool();
  console.log("DELETE QUERY:" + sql);
  pool.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      throw error;
    }
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
