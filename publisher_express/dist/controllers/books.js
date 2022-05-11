"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateById = exports.getById = exports.getAllLookup = exports.getAll = exports.deleteById = exports.create = void 0;

var getAll = function getAll(req, res, next) {
  res.json({
    message: "getAll books"
  });
};

exports.getAll = getAll;

var getAllLookup = function getAllLookup(req, res, next) {
  res.json({
    message: "getAllLookup books"
  });
};

exports.getAllLookup = getAllLookup;

var getById = function getById(req, res, next) {
  res.json({
    message: "getById books"
  });
};

exports.getById = getById;

var create = function create(req, res, next) {
  res.json({
    message: "create books"
  });
};

exports.create = create;

var updateById = function updateById(req, res, next) {
  res.json({
    message: "updateById books"
  });
};

exports.updateById = updateById;

var deleteById = function deleteById(req, res, next) {
  res.json({
    message: "deleteById books"
  });
};

exports.deleteById = deleteById;