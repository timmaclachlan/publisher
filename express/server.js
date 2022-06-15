const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");
const v4 = require("uuid").v4;

const bodyParser = require("body-parser");
const Pool = require("pg").Pool;

require("dotenv").config();

var authorRoutes = require("./authors");
router.use(authorRoutes("/authors"));

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
const TABLE_CONSUMERORDERS = "consumerorders";
const TABLE_KBPORDERS = "kbporders";
const TABLE_SERVICES = "services";
const TABLE_SERVICESASSIGNED = "servicesassigned";
const TABLE_BOOKS_FORMATS = "booksformats";
const TABLE_BOOKS_EDITORIAL = "bookseditorial";
const TABLE_BOOKS_ROYALTIESHISTORY = "royaltieshistory";

//const TABLEQUAL_AUTHORS = `"${process.env.DBPATH}"."${TABLE_AUTHORS}"`;
//const TABLEQUAL_BOOKS = `"${process.env.DBPATH}"."${TABLE_BOOKS}"`;

const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLEQUAL_BOOKS = `"timm2006/athena"."${TABLE_BOOKS}"`;
const TABLEQUAL_GENRES = `"timm2006/athena"."${TABLE_GENRES}"`;
const TABLEQUAL_ORDERS = `"timm2006/athena"."${TABLE_ORDERS}"`;
const TABLEQUAL_CONSUMERORDERS = `"timm2006/athena"."${TABLE_CONSUMERORDERS}"`;
const TABLEQUAL_KBPORDERS = `"timm2006/athena"."${TABLE_KBPORDERS}"`;
const TABLEQUAL_SERVICES = `"timm2006/athena"."${TABLE_SERVICES}"`;
const TABLEQUAL_SERVICESASSIGNED = `"timm2006/athena"."${TABLE_SERVICESASSIGNED}"`;
const TABLEQUAL_BOOKSFORMATS = `"timm2006/athena"."${TABLE_BOOKS_FORMATS}"`;
const TABLEQUAL_BOOKSEDITORIAL = `"timm2006/athena"."${TABLE_BOOKS_EDITORIAL}"`;
const TABLEQUAL_ROYALITESHISTORY = `"timm2006/athena"."${TABLE_BOOKS_ROYALTIESHISTORY}"`;

router.get("/authors/:id/books", (req, res) => {
  console.log("get books for authors");
  let sql = `SELECT id, title, publicationdate, published, 
  (SELECT array_to_string(array_agg(services.service), ',') 
  FROM ${TABLEQUAL_SERVICESASSIGNED} assigned
  JOIN ${TABLEQUAL_SERVICES} services ON services.id = assigned.serviceid
  WHERE bookid = books.id) AS "service"
  FROM ${TABLEQUAL_BOOKS} WHERE authorid='${req.params.id}'`;

  return getQueryWithStatus(sql, res);
});

router.get("/genres", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} ORDER BY genre`;
  return getQueryWithStatus(sql, res);
});

router.get("/genres/:id", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_GENRES} WHERE id='${req.params.id}'`;
  return getQueryWithStatus(sql, res);
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
  return getQueryWithStatus(sql, res);
});

router.get("/books/:id", (req, res) => {
  let sql = `SELECT books.*, authors.realname AS "author_name", authors.penname AS "author_penname" 
  FROM ${TABLEQUAL_BOOKS} books JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid 
  WHERE books.id='${req.params.id}'`;
  return getQueryWithStatus(sql, res);
});

router.get("/books/:id/services", (req, res) => {
  let sql = `SELECT assigned.id, services.service, stage FROM ${TABLEQUAL_SERVICESASSIGNED} assigned 
  JOIN ${TABLEQUAL_SERVICES} services ON services.id = assigned.serviceid WHERE bookid='${req.params.id}'`;
  return getQueryWithStatus(sql, res);
});

router.get("/books/:id/formats", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_BOOKSFORMATS} WHERE bookid='${req.params.id}'`;
  return getQueryWithStatus(sql, res);
});

router.get("/books/:id/editorials", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_BOOKSEDITORIAL} WHERE bookid='${req.params.id}'`;
  return getQueryWithStatus(sql, res);
});

router.patch("/books/:id", (req, res) => {
  console.log("in Patch for Books");
  console.log(req.body);

  let formats = req.body.formats;
  console.log(formats);

  let sql = "";
  let data = [];
  Object.entries(formats).forEach(([k, v]) => {
    if (v.id === null) {
      sql = `INSERT INTO ${TABLEQUAL_BOOKSFORMATS}
      (id, bookid, format, price, isbn, width, height, 
        pagecount, estpagecount, unitcost, estunitcost, paperstock, coverlaminate, distributor)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`;
      data = [
        v4(),
        v.bookid,
        v.format,
        v.price,
        v.isbn,
        v.width,
        v.height,
        v.pagecount,
        v.estpagecount,
        v.unitcost,
        v.estunitcost,
        v.paperstock,
        v.coverlaminate,
        v.distributor,
      ];
      updateQuery(sql, data);
    } else {
      if (v.enabled === false) {
        sql = `DELETE FROM ${TABLEQUAL_BOOKSFORMATS} WHERE id='${v.id}'`;
        deleteQuery(sql);
      } else {
        sql = `UPDATE ${TABLEQUAL_BOOKSFORMATS} 
      SET price=$1,isbn=$2,width=$3,height=$4,pagecount=$5,estpagecount=$6,
      unitcost=$7,estunitcost=$8,paperstock=$9,coverlaminate=$10,distributor=$11
      WHERE id='${v.id}'`;
        data = [
          v.price,
          v.isbn,
          v.width,
          v.height,
          v.pagecount,
          v.estpagecount,
          v.unitcost,
          v.estunitcost,
          v.paperstock,
          v.coverlaminate,
          v.distributor,
        ];
        updateQuery(sql, data);
      }
    }
  });

  if (req.body.editorial.isnew === true) {
    sql = `INSERT INTO ${TABLEQUAL_BOOKSEDITORIAL}
    (id,bookid,editlevel,wordcount,blurblevel)
    VALUES($1,$2,$3,$4,$5)`;
    data = [
      v4(),
      req.body.editorial.bookid,
      req.body.editorial.editlevel,
      req.body.editorial.wordcount,
      req.body.editorial.blurblevel,
    ];
    updateQuery(sql, data);
  } else {
    sql = `UPDATE ${TABLEQUAL_BOOKSEDITORIAL} SET
    editlevel = $1, wordcount = $2, blurblevel = $3
    WHERE bookid='${req.params.id}'`;
    data = [
      req.body.editorial.editlevel,
      req.body.editorial.wordcount,
      req.body.editorial.blurblevel,
    ];
    updateQuery(sql, data);
  }

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
    req.body.royalty,
  ];

  updateQueryWithStatus(sql, data, res);
});

router.get("/royalties", (req, res) => {
  console.log("GET ROYALTIES");
  let query = "";

  query = `WHERE ${Object.keys(req.query)[0]}`;

  let sql = `SELECT rh.*, authors.notax FROM ${TABLEQUAL_ROYALITESHISTORY} rh
   JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = rh.authorid
     ${query} ORDER BY author`;


  getQueryWithPromise(sql).then(function (result) {
  res.statusCode = 200;
  res.json({ message: "success", result: result });
  }).catch(function (err) {
    console.log(err);
  })
});

router.patch("/royaltiess", (req, res) => {
  console.log("PATCH ROYALTIES");

  let sql = "";
  let data = [];

  for (let i = 0; i < req.body.length; i++) {
    console.log(req.body[i]);
    sql = `UPDATE ${TABLEQUAL_ROYALITESHISTORY}
    SET paymentsthisperiod=$1
    WHERE id='${req.body[i].id}'`
    data = [
      req.body[i].paymentsthisperiod
    ]
    updateQuery(sql, data);
  }

  res.statusCode = 200;
  res.json({ message: "success", result: true });
})


const getOrders = (orderTable, req, res) => {
console.log("GET ORDERS");
  let query = "";
  if (!isEmptyObject(req.query)) {
    console.log(req.query);
    query = `WHERE ${Object.keys(req.query)[0]}`;
    console.log(query);
  }

  let sql = `SELECT *, authors.realname as "author" FROM ${orderTable} orders 
    JOIN ${TABLEQUAL_BOOKS} books ON books.id = orders.bookid
    JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
    ${query}
    ORDER BY orderdate DESC`;
  return getQueryWithStatus(sql, res);
}

router.get("/orders/retails", (req, res) => {
  return getOrders(TABLEQUAL_ORDERS, req, res);
});

router.get("/orders/consumers", (req, res) => {
  return getOrders(TABLEQUAL_CONSUMERORDERS, req, res);
});

router.get("/orders/kbps", (req, res) => {
  return getOrders(TABLEQUAL_KBPORDERS, req, res);
});

router.get("/reports/book", (req, res) => {
  let sql = `SELECT authors.realname, books.title, books.id FROM ${TABLEQUAL_BOOKS} books
  JOIN ${TABLEQUAL_AUTHORS} authors
  ON authors.id = books.authorid
  ORDER BY authors.realname`;
  return getQueryWithStatus(sql, res);
});

function updateQueryWithStatus(sql, data, res) {
  try {
    updateQuery(sql, data);
  } catch (error) {
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

function getQueryWithPromise(sql) {
  console.log(sql);
  console.log(
    "ENV: (user)" +
      process.env.PGUSER +
      " pghost:" +
      process.env.PGHOST +
      " SSL:" +
      process.env.PGSSLMODE
  );

  return new Promise(function (resolve, reject) {
    const pool = new Pool();
    pool.query(sql, (error, result) => {
      if (error) {
        console.log("ERROR" + error.message);
        return reject(error);
      }
      resolve(result.rows);
    });
    pool.end();
  });
}


function getQueryWithStatus(sql, res) {
  console.log(sql);
  console.log(
    "ENV: (user)" + process.env.PGUSER + " pghost:" + process.env.PGHOST + " SSL:" + process.env.PGSSLMODE
  );

  const pool = new Pool();
  pool.query(sql, (error, results) => {
    if (error) {
      console.log("ERROR" + error.message);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to retrieve: " + error.message] });
    }
    res.statusCode = 200;
    res.json({ message: "success", result: results.rows });
  });
}

const isEmptyObject = (value) => {
  return (
    value && value.constructor === Object && Object.keys(value).length === 0
  );
}

app.use("/.netlify/functions/server", router); // path must route to lambda
module.exports = app;
module.exports.handler = serverless(app);
