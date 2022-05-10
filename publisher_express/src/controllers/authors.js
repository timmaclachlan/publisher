import { Pool } from "pg";

const getAll = (req, res, next) => {
  let sql = `SELECT * FROM "${"timm2006/athena"}"."authors"`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ "message": "success", "data": results.rows });
  });
};

const getAllLookup = (req, res, next) => {
  let sql = `SELECT id, realName FROM "${"timm2006/athena"}"."authors"`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ "message": "success", "data": results.rows });
  });
};

const getById = (req, res, next) => {
  let sql = `SELECT * FROM "${"timm2006/athena"}"."authors" WHERE id=${1}`;
  const pool = new Pool();

  console.log(sql);

  pool.query(sql, (error, results) => {
    res.json({ "message": "success", "data": results.rows });
  });
};

const create = (req, res, next) => {
  res.json({ message: "create authors" });
};

const updateById = (req, res, next) => {
  res.json({ message: "updateById authors" });
};

const deleteById = (req, res, next) => {
  res.json({ message: "deleteById authors" });
};

module.exports = {
  getAll,
  getAllLookup,
  getById,
  create,
  updateById,
  deleteById,
};
