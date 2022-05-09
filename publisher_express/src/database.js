const { text } = require('express');

const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  }
  console.log('Connected to SQLite database');
  db.run(`CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    realName text,
    penName text)`,
    (err) => {
      if (err) {
        // table already created
      } else {
        // insert rows
        var insert = 'INSERT INTO (realName, penName) VALUES (?, ?)';
        db.run(insert, ["test1", "test1pen"]);
        db.run(insert, ["test2", "test2pen"]);
      }
    });
  }
  );

module.exports = db;