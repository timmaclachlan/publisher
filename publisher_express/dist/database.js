"use strict";

var _require = require('express'),
    text = _require.text;

var sqlite3 = require('sqlite3').verbose();

var DBSOURCE = "db.sqlite";
var db = new sqlite3.Database(DBSOURCE, function (err) {
  if (err) {
    console.log(err.message);
    throw err;
  }

  console.log('Connected to SQLite database');
  db.run("CREATE TABLE authors (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    realName text,\n    penName text)", function (err) {
    if (err) {// table already created
    } else {
      // insert rows
      var insert = 'INSERT INTO (realName, penName) VALUES (?, ?)';
      db.run(insert, ["test1", "test1pen"]);
      db.run(insert, ["test2", "test2pen"]);
    }
  });
});
module.exports = db;