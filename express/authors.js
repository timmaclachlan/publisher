const express = require("express");
const router = express.Router();
const Pool = require("pg").Pool;

const TABLE_AUTHORS = "authors";
const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;

let routeBuilder = path => {

  router.get(`${path}`, (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
  return getQuery(sql, res);
  });
  
  return router;
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

module.exports = routeBuilder;