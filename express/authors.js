const express = require("express");
const router = express.Router();
const Pool = require("pg").Pool;
const v4 = require("uuid").v4;

const TABLE_AUTHORS = "authors";
const TABLEQUAL_AUTHORS = `"timm2006/athena"."${TABLE_AUTHORS}"`;
const TABLE_BOOKS_ROYALTIESHISTORY = "royaltieshistory";
const TABLEQUAL_ROYALITESHISTORY = `"timm2006/athena"."${TABLE_BOOKS_ROYALTIESHISTORY}"`;

let routeBuilder = (path) => {
  router.get(`${path}`, (req, res) => {
    let sql = `SELECT * FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
    return getQuery(sql, res);
  });

  router.get("/authors/:id", (req, res) => {
    // calculate current quarter
    const now = new Date();
    const month = now.getMonth() + 1;
    const quarter = month / 3;
    const quarterString = `${quarter}${now.getFullYear()}`
 
    console.log(quarterString);

    let sql = `SELECT authors.*, 
    rh.balance,rh.netroyalties,rh.tax,
    rh.royaltiesthisperiod,rh.royaltiesprevperiod,rh.royaltiestotal,
    rh.paymentsthisperiod,rh.paymentsprevperiod,rh.paymentstotal,
    rh.paidsalesthisperiod,rh.paidsalesprevperiod,rh.paidsalestotal,
    rh.freesalesthisperiod,rh.freesalesprevperiod,rh.freesalestotal,
    rh.tax, rh.taxtotal
    FROM ${TABLEQUAL_AUTHORS} authors
    LEFT JOIN ${TABLEQUAL_ROYALITESHISTORY} rh ON rh.authorid = authors.id
    AND period='${quarterString}'
    WHERE authors.id='${req.params.id}'`;
    return getQuery(sql, res);
  });

  router.get("/authors/:id/royaltieshistorys", (req, res) => {
    console.log("GET ROYALTIESHISTORY");

    let sql = `SELECT * FROM ${TABLEQUAL_ROYALITESHISTORY} 
    WHERE authorid='${req.params.id}' ORDER BY startperiod DESC`;

    return getQuery(sql, res);
  });

  router.get("/lookup/authors", (req, res) => {
    let sql = `SELECT id,realname FROM ${TABLEQUAL_AUTHORS} ORDER BY realname`;
    return getQuery(sql, res);
  });

  router.delete("/authors/:id", (req, res) => {
    let sql = `DELETE FROM ${TABLEQUAL_AUTHORS} WHERE id='${req.params.id}'`;
    return deleteQuery(sql, res);
  });

  router.post("/authors", (req, res) => {
    let sql = `INSERT INTO ${TABLEQUAL_AUTHORS} 
  (id, realname,penname,email,phonenumber,location,
    address1,address2,address3,address4,postcode,
    website,notes,retained,sortcode,accountno,paypal,active,notax)
  VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING id`;
    let data = [
      v4(),
      req.body.realname,
      req.body.penname,
      req.body.email,
      req.body.phonenumber,
      req.body.location,
      req.body.address1,
      req.body.address2,
      req.body.address3,
      req.body.address4,
      req.body.postcode,
      req.body.website,
      req.body.notes,
      req.body.retained,
      req.body.sortcode,
      req.body.accountno,
      req.body.paypal,
      req.body.active,
      req.body.notax
    ];
    return updateQuery(sql, data, res);
  });

  router.patch("/authors/:id", (req, res) => {
    console.log("in Patch");
    console.log(req.body);

    let sql = `UPDATE ${TABLEQUAL_AUTHORS} SET 
    realname = $1, penname = $2,
    email = $3, phonenumber = $4,
    location = $5, address1 = $6,
    address2 = $7, address3 = $8,
    address4 = $9, postcode = $10,
    website = $11, notes = $12,
    retained = $13, sortcode = $14,
    accountno = $15, paypal = $16,
    active = $17, email2 = $18,
    phonenumber2 = $19, notax = $20
    WHERE id='${req.params.id}'`;
    let data = [
      req.body.realname,
      req.body.penname,
      req.body.email,
      req.body.phonenumber,
      req.body.location,
      req.body.address1,
      req.body.address2,
      req.body.address3,
      req.body.address4,
      req.body.postcode,
      req.body.website,
      req.body.notes,
      req.body.retained,
      req.body.sortcode,
      req.body.accountno,
      req.body.paypal,
      req.body.active,
      req.body.email2,
      req.body.phonenumber2,
      req.body.notax
    ];

    return updateQuery(sql, data, res);
  });

  return router;
};

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

function updateQuery(sql, data, res) {
  const pool = new Pool();
  console.log("UPDATE QUERY:" + sql);
  console.log(data);
  pool.query(sql, data, (error, results) => {
    if (error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to create/update record:" + error] });
    }
    res.statusCode = 200;
    res.json({ message: "success" });
  });
}

function deleteQuery(sql, res) {
  const pool = new Pool();
  console.log("DELETE QUERY:" + sql);
  pool.query(sql, (error) => {
    if(error) {
      console.error(error);
      res.statusCode = 500;
      return res.json({ errors: ["Failed to delete record:" + error] });
    }
    res.statusCode = 200;
    res.json({ message: "success" });
  })
}

module.exports = routeBuilder;
