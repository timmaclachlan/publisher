/* eslint-disable no-template-curly-in-string */
import { Pool } from "pg";
import { v4 as uuid4 } from "uuid";

const DBPATH = "timm2006/athena";
const TABLE = "authors";
const TABLEQUAL = `"${DBPATH}"."${TABLE}"`;

export const getAll = (req, res, next) => {
  let sql = `SELECT * FROM ${TABLEQUAL}`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ message: "success", data: results.rows });
  });
};

export const getAllLookup = (req, res, next) => {
  let sql = `SELECT id, realName FROM ${TABLEQUAL}`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ message: "success", data: results.rows });
  });
};

export const getById = (req, res, next) => {
  let sql = `SELECT * FROM ${TABLEQUAL} WHERE id='${req.params.id}'`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ message: "success", data: results.rows });
  });
};

export const create = (req, res, next) => {
  let sql =
    `INSERT INTO ${TABLEQUAL} (id, realName,penName) VALUES($1,$2,$3) RETURNING id`;

  let data = [uuid4(), req.body.realName, req.body.penName];

  const pool = new Pool();

  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ error: "Failed to create record" });
    }
    res.statusCode = 201;
    res.json({ message: "success", id: results.rows[0].id });
  });
};

//https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
export const updateById = (req, res, next) => {
  let sql = `UPDATE ${TABLEQUAL} SET realname = $1, penName=$2 WHERE id='${req.params.id}'`;

  console.log(sql);
  
  let data = [req.body.realName, req.body.penName];

  const pool = new Pool();

  pool.query(sql, data, (error, results) => {
    res.json({ message: "success", id: req.params.id });
  });
};

export const deleteById = (req, res, next) => {
  let sql = `DELETE FROM ${TABLEQUAL} WHERE id='${req.params.id}'`;
  
  const pool = new Pool();

  pool.query(sql, (error, results) => {
    res.json({ message: "success", id: req.params.id });
  });
};
