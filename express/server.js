const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;
const config = require("dotenv").config();

const DBPATH = "timm2006/athena";
const TABLE = "authors";
const TABLEQUAL = `"${DBPATH}"."${TABLE}"`;

const postgresConfig = {
  user: "timm2006_demo_db_connection",
  host: "db.bit.io",
  database: "bitdotio",
  password: "3nEd6_jhhm4h3xLRwbUbcQJQQSYX4",
  port: 5432,
};

const router = express.Router();

router.post("/authors", (req, res) => {
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
    res.json({ message: "success", id: results.rows[0].id });
  });
});

router.get("/authors", (req, res) => {
  let sql = `SELECT * FROM ${TABLEQUAL}`;

  console.log(sql);
  console.log(process.env.PGUSER);

  //res.json({ pguserenv: process.env.PGUSER, pguser: postgresConfig.user });

  const pool = new Pool();
  pool.query(sql, (error, results) => {
    if (error) {
      res.statusCode = 500;
      return res.json({errors: ['Failed to retrieve: ' + error.message]})
    }
    res.statusCode = 200;
    res.json({ message: "success", data: results.rows });
  });
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
