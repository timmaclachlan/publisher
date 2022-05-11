"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateById = exports.getById = exports.getAllLookup = exports.getAll = exports.deleteById = exports.create = void 0;

var _pg = require("pg");

var _uuid = require("uuid");

/* eslint-disable no-template-curly-in-string */
var DBPATH = "timm2006/athena";
var TABLE = "authors";
var TABLEQUAL = "\"".concat(DBPATH, "\".\"").concat(TABLE, "\"");

var getAll = function getAll(req, res, next) {
  var sql = "SELECT * FROM ".concat(TABLEQUAL);
  var pool = new _pg.Pool();
  console.log(sql);
  pool.query(sql, function (error, results) {
    res.json({
      message: "success",
      data: results.rows
    });
  });
};

exports.getAll = getAll;

var getAllLookup = function getAllLookup(req, res, next) {
  var sql = "SELECT id, realName FROM ".concat(TABLEQUAL);
  var pool = new _pg.Pool();
  console.log(sql);
  pool.query(sql, function (error, results) {
    res.json({
      message: "success",
      data: results.rows
    });
  });
};

exports.getAllLookup = getAllLookup;

var getById = function getById(req, res, next) {
  var sql = "SELECT * FROM ".concat(TABLEQUAL, " WHERE id='").concat(req.params.id, "'");
  var pool = new _pg.Pool();
  console.log(sql);
  pool.query(sql, function (error, results) {
    res.json({
      message: "success",
      data: results.rows
    });
  });
};

exports.getById = getById;

var create = function create(req, res, next) {
  var sql = "INSERT INTO ".concat(TABLEQUAL, " (id, realName,penName) VALUES($1,$2,$3) RETURNING id");
  var data = [(0, _uuid.v4)(), req.body.realName, req.body.penName];
  var pool = new _pg.Pool();
  pool.query(sql, data, function (error, results) {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({
        errors: ["Failed to create record"]
      });
    }

    res.statusCode = 201;
    res.json({
      message: "success",
      id: results.rows[0].id
    });
  });
}; //https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
// TODO: handle errors Errors array, standarise code like getting pool etc


exports.create = create;

var updateById = function updateById(req, res, next) {
  var sql = "UPDATE ".concat(TABLEQUAL, " SET realname = $1, penName=$2 WHERE id='").concat(req.params.id, "'");
  console.log(sql);
  var data = [req.body.realName, req.body.penName];
  var pool = new _pg.Pool();
  pool.query(sql, data, function (error, results) {
    res.json({
      message: "success",
      id: req.params.id
    });
  });
};

exports.updateById = updateById;

var deleteById = function deleteById(req, res, next) {
  var sql = "DELETE FROM ".concat(TABLEQUAL, " WHERE id='").concat(req.params.id, "'");
  var pool = new _pg.Pool();
  pool.query(sql, function (error, results) {
    res.json({
      message: "success",
      id: req.params.id
    });
  });
};

exports.deleteById = deleteById;