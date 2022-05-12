const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;
require("dotenv").config();
const cors = require('cors');


const DBPATH = "timm2006/athena";
const TABLE = "authors";
const TABLEQUAL = `"${DBPATH}"."${TABLE}"`;

const router = express.Router();

router.post("/authors", cors(), (req, res) => {
  let sql =
    `INSERT INTO ${TABLEQUAL} (id, realName,penName) VALUES($1,$2,$3) RETURNING id`;
  
  let data = [v4(), req.body.realName, req.body.penName];

  const pool = new Pool();

  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to create record:" + error] });
    }
    res.statusCode = 201;
    res.json({ message: "success", result: results.rows[0].id });
  });
});

router.get("/authors", cors(), (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL}`;

  console.log(sql);
  console.log("ENV: (user)" + process.env.PGUSER + " pghost:" + process.env.PGHOST);

  //res.json({ pguserenv: process.env.PGUSER, pguser: postgresConfig.user });

  const pool = new Pool();
  pool.query(sql, (error, results) => {
    if (error) {
      res.statusCode = 500;
      return res.json({errors: ['Failed to retrieve: ' + error.message]})
    }
    res.statusCode = 200;
    res.json({ message: "success", result: results.rows });
  });
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
