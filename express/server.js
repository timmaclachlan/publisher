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
var bookRoutes = require("./books");

router.use(authorRoutes("/authors"));
router.use(bookRoutes("/books"));

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
const TABLE_ROYALTIESHISTORY = "royaltieshistory";
const TABLE_PAYMENTS = "payments";


const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLEQUAL_BOOKS = `"timm2006/athena"."${TABLE_BOOKS}"`;
const TABLEQUAL_GENRES = `"timm2006/athena"."${TABLE_GENRES}"`;
const TABLEQUAL_ORDERS = `"timm2006/athena"."${TABLE_ORDERS}"`;
const TABLEQUAL_CONSUMERORDERS = `"timm2006/athena"."${TABLE_CONSUMERORDERS}"`;
const TABLEQUAL_KBPORDERS = `"timm2006/athena"."${TABLE_KBPORDERS}"`;
const TABLEQUAL_SERVICES = `"timm2006/athena"."${TABLE_SERVICES}"`;
const TABLEQUAL_SERVICESASSIGNED = `"timm2006/athena"."${TABLE_SERVICESASSIGNED}"`;
const TABLEQUAL_ROYALITESHISTORY = `"timm2006/athena"."${TABLE_ROYALTIESHISTORY}"`;
const TABLEQUAL_PAYMENTS = `"timm2006/athena"."${TABLE_PAYMENTS}"`;

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

router.get("/dashboardstats", (req, res) => {
  let sql = `SELECT ROUND(SUM(amountreceived)::DECIMAL, 2) AS "totalsales", 
  ROUND(SUM(royaltypublisher)::DECIMAL, 2) AS "totalincome",
  ROUND(SUM(royaltyauthor)::DECIMAL, 2) AS "totalroyalties",
  SUM(quantity) AS "totalpaidsales"
  FROM ${TABLEQUAL_ORDERS}
  UNION
  SELECT ROUND(SUM(amountreceived)::DECIMAL, 2) AS "totalsales", 
  ROUND(SUM(royaltypublisher)::DECIMAL, 2) AS "totalincome",
  ROUND(SUM(royaltyauthor)::DECIMAL, 2) AS "totalroyalties",
  SUM(quantity) AS "totalpaidsales"
  FROM ${TABLEQUAL_CONSUMERORDERS}
  UNION
  SELECT ROUND(SUM(amountreceived)::DECIMAL, 2) AS "totalsales", 
  ROUND(SUM(royaltypublisher)::DECIMAL, 2) AS "totalincome",
  ROUND(SUM(royaltyauthor)::DECIMAL, 2) AS "totalroyalties",
  SUM(quantity) AS "totalpaidsales"
  FROM ${TABLEQUAL_KBPORDERS}`;

  getQueryWithStatus(sql, res);
});

router.get("/royalties", (req, res) => {
  console.log("GET ROYALTIES");
  let query = "";

  console.log(req.query.query);

  query = `WHERE ${req.query.query}`;

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

router.get("/royaltiess/:id", (req, res) => {
  console.log("ROYALTIES BY ID");

  let sql = `SELECT rh.*, authors.notax FROM ${TABLEQUAL_ROYALITESHISTORY} rh
   JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = rh.authorid
     WHERE rh.authorid = '${req.params.id}' ORDER BY startperiod`;

  getQueryWithStatus(sql, res);
});

router.get("/saless/:id", (req, res) => {
  let sql = `SELECT books.title, ro.amountreceived, ro.royaltyauthor,
  ro.dateamountreceived, ro.quantity, ro.isfree, books.royalty
  FROM ${TABLEQUAL_ORDERS} ro
  JOIN ${TABLEQUAL_BOOKS} books ON books.id = ro.bookid
  WHERE books.authorid = '${req.params.id}'`;

  getQueryWithStatus(sql, res);
});

  router.get("/sales/byquery", (req, res) => {
    console.log("GET ORDERS BY QUERY");
    console.log(req.query.authorid);
    console.log(req.query.startperiod);
    console.log(req.query.endperiod);

    let sql = `
      SELECT books.title, 
      ro.orderdate, ro.dateamountreceived,
      ro.amountreceived,ro.origcurrency,ro.amountgross,ro.amountnet,ro.royaltyauthor,
      ro.quantity,ro.fxrate,ro.salessource,ro.salesmethod, 'RETAIL' as ordertype
      FROM ${TABLEQUAL_ORDERS} ro
      JOIN ${TABLEQUAL_BOOKS} books ON books.id = ro.bookid
      JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
      WHERE dateamountreceived >= ${req.query.startperiod}
      AND dateamountreceived <= ${req.query.endperiod}
      AND authors.id = '${req.query.authorid}'

      UNION

      SELECT books.title, 
      ro.orderdate, ro.dateamountreceived,
      ro.amountreceived,ro.origcurrency,ro.amountgross,ro.amountnet,ro.royaltyauthor,
      ro.quantity,ro.fxrate,ro.salessource,ro.salesmethod, 'CONSUMER' as ordertype
      FROM ${TABLEQUAL_CONSUMERORDERS} ro
      JOIN ${TABLEQUAL_BOOKS} books ON books.id = ro.bookid
      JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
      WHERE dateamountreceived >= ${req.query.startperiod}
      AND dateamountreceived <= ${req.query.endperiod}
      AND authors.id = '${req.query.authorid}'
    `;

    return getQueryWithStatus(sql, res);
  });

router.get("/royalties/quarters", (req, res) => {
  console.log(req.query.thisperiod);
  console.log(req.query.nextperiod);

  let sql = `CALL UpdateRoyalties(${req.query.thisperiod}, ${req.query.nextperiod})`;
  
  getQueryWithStatus(sql, res);
});

router.patch("/royaltiess", (req, res) => {
  console.log("PATCH ROYALTIES");

  let sql = "";

  for (let i = 0; i < req.body.length; i++) {
    console.log(req.body[i]);
    sql = `UPDATE ${TABLEQUAL_ROYALITESHISTORY}
    SET paymentsthisperiod=${req.body[i].paymentsthisperiod},
    paymentstotal = ${req.body[i].paymentstotal} + ${req.body[i].paymentsthisperiod},
    balance = ROUND(netowed::DECIMAL - ${req.body[i].paymentsthisperiod}, 2)
    WHERE id='${req.body[i].id}'`
    updateQuery(sql, undefined);

    sql = `INSERT INTO ${TABLEQUAL_PAYMENTS}
    (id, authorid, author, paymentdate, amount)
    SELECT '${v4()}', '${req.body[i].authorid}', '${req.body[i].author}',
    TO_DATE('${req.body[i].endperiod}', 'YYYY-MM-DD'),
    ${req.body[i].paymentsthisperiod}
    WHERE NOT EXISTS (SELECT 1 FROM ${TABLEQUAL_PAYMENTS}
      WHERE TO_DATE(paymentdate, 'YYYY-MM-DD') = TO_DATE('${req.body[i].endperiod}', 'YYYY-MM-DD'))`;
    console.log(sql);
    updateQuery(sql, undefined);
    
    sql = `UPDATE ${TABLEQUAL_PAYMENTS}
    SET amount=${req.body[i].paymentsthisperiod}
    WHERE TO_DATE(paymentdate, 'YYYY-MM-DD') = TO_DATE('${req.body[i].endperiod}', 'YYYY-MM-DD')`;
       
    console.log(sql);
    updateQuery(sql, undefined);
  }

  res.statusCode = 200;
  res.json({ message: "success", result: true });
})



const getOrders = (orderTable, req) => {
console.log("GET ORDERS");
  let query = "";
  if (!isEmptyObject(req.query)) {
    console.log(req.query);
    query = `WHERE ${Object.keys(req.query)[0]}`;
    console.log(query);
  }

  let sql = `SELECT orders.*, books.title, authors.realname as "author" FROM ${orderTable} orders 
    JOIN ${TABLEQUAL_BOOKS} books ON books.id = orders.bookid
    JOIN ${TABLEQUAL_AUTHORS} authors ON authors.id = books.authorid
    ${query}
    ORDER BY orderdate DESC`;
  return sql;
}

router.get("/orders/retails", (req, res) => {
  let sql = getOrders(TABLEQUAL_ORDERS, req);
  console.log("GET ORDER RETAILS");
  console.log(sql);
  return getQueryWithStatus(sql, res);
});

router.get("/orders/consumers", (req, res) => {
  let sql = getOrders(TABLEQUAL_CONSUMERORDERS, req);
  console.log("GET ORDER CONSUMER");
  console.log(sql);
  return getQueryWithStatus(sql, res);
});

router.get("/orders/kbps", (req, res) => {
  let sql = getOrders(TABLEQUAL_KBPORDERS, req);
  console.log("GET ORDER KBP");
  console.log(sql);
  return getQueryWithStatus(sql, res);
});

router.get("/reports/book", (req, res) => {
  let sql = `SELECT authors.realname, books.title, books.id FROM ${TABLEQUAL_BOOKS} books
  JOIN ${TABLEQUAL_AUTHORS} authors
  ON authors.id = books.authorid
  ORDER BY authors.realname`;
  return getQueryWithStatus(sql, res);
});





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



// CREATE OR REPLACE PROCEDURE UpdateRoyalties(thisperiod text, nextperiod text)
// LANGUAGE SQL
// AS $$
// ;

//     DELETE FROM "timm2006/athena"."royaltieshistory" WHERE period=nextperiod;

//     INSERT INTO "timm2006/athena"."royaltieshistory"
//     (id, authorid, author, period, 
//     startperiod, endperiod,
//     royaltiesprevperiod, royaltiesthisperiod, royaltiestotal, 
//     grossowed, netowed, tax, taxtotal, 
//     paymentsprevperiod, paymentsthisperiod, paymentstotal,
//     balance, paidsalesprevperiod, paidsalesthisperiod, paidsalestotal,    
//     freesalesprevperiod, freesalesthisperiod, freesalestotal,
//     pagesreadprevperiod, pagesreadthisperiod, pagesreadtotal)

//     SELECT gen_random_uuid(), authorid, author, nextperiod,
//     TO_CHAR((TO_DATE(startperiod, 'YYYY-MM-DD') + interval '3 months'), 'YYYY-MM-DD'),
//     TO_CHAR((TO_DATE(endperiod, 'YYYY-MM-DD') + interval '3 months'), 'YYYY-MM-DD'),
//     royaltiesthisperiod, 0, royaltiestotal, 
//     grossowed, netowed, tax, taxtotal, 
//     paymentsthisperiod, 0, paymentstotal,
//     balance, paidsalesthisperiod, 0, paidsalestotal,
//     freesalesthisperiod, 0, freesalestotal,
//     pagesreadthisperiod, 0, pagesreadtotal
//     FROM "timm2006/athena"."royaltieshistory"
//     WHERE period = thisperiod
//     AND NOT EXISTS 
//         (SELECT authorid FROM "timm2006/athena"."royaltieshistory" 
//         WHERE period = nextperiod);
    
// $$;

