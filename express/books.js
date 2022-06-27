const express = require("express");
const router = express.Router();
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;

const TABLE_BOOKS = "books";
const TABLE_SERVICES = "services";
const TABLE_SERVICESASSIGNED = "servicesassigned";
const TABLE_AUTHORS = "authors";
const TABLE_BOOKS_FORMATS = "booksformats";
const TABLE_BOOKS_EDITORIAL = "bookseditorial";

const TABLEQUAL_BOOKS = `"timm2006/athena"."${TABLE_BOOKS}"`;
const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLEQUAL_SERVICES = `"timm2006/athena"."${TABLE_SERVICES}"`;
const TABLEQUAL_SERVICESASSIGNED = `"timm2006/athena"."${TABLE_SERVICESASSIGNED}"`;
const TABLEQUAL_BOOKSFORMATS = `"timm2006/athena"."${TABLE_BOOKS_FORMATS}"`;
const TABLEQUAL_BOOKSEDITORIAL = `"timm2006/athena"."${TABLE_BOOKS_EDITORIAL}"`;

let routeBuilder = (path) => {
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

  router.post("/books", (req, res) => {
    let bookid = v4();
    let sql = '';
    let data = [];

    if (req.body.editorial) {
      sql = `INSERT INTO ${TABLEQUAL_BOOKSEDITORIAL}
    (id,bookid,editlevel,wordcount,blurblevel)
    VALUES($1,$2,$3,$4,$5)`;
      data = [
        v4(),
        bookid,
        req.body.editorial.editlevel,
        req.body.editorial.wordcount,
        req.body.editorial.blurblevel,
      ];
      updateQuery(sql, data);
    }

    let formats = req.body.formats;
    Object.entries(formats).forEach(([k, v]) => {
      sql = `INSERT INTO ${TABLEQUAL_BOOKSFORMATS}
      (id, bookid, format, price, isbn, width, height, 
        pagecount, estpagecount, unitcost, estunitcost, paperstock, coverlaminate, distributor)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`;
      data = [
        v4(),
        bookid,
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
    });

    sql = `INSERT INTO ${TABLEQUAL_BOOKS} 
  (id, title,authorid,genreid,royalty,published,
    officeabb,publicationdate,stillselling,maturecontent,
    onhold,terminated
  )
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`;
    data = [
      bookid,
      req.body.title,
      req.body.author?.id,
      req.body.genreid,
      req.body.royalty,
      req.body.published,
      req.body.officeabb,
      req.body.publicationdate,
      req.body.stillselling,
      req.body.maturecontent,
      req.body.onhold,
      req.body.terminated,
    ];
    return updateQuery(sql, data, res);
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

  return router;
};

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

function getQueryWithStatus(sql, res) {
  console.log(sql);
  console.log(
    "ENV: (user)" +
      process.env.PGUSER +
      " pghost:" +
      process.env.PGHOST +
      " SSL:" +
      process.env.PGSSLMODE
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

module.exports = routeBuilder;
