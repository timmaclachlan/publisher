// Create a client using the connection information provided on bit.io.
const Pool = require("pg").Pool;

const postgresOptions = {
  user: "timm2006_demo_db_connection",
  host: "db.bit.io",
  database: "bitdotio",
  password: "3nEd6_jhhm4h3xLRwbUbcQJQQSYX4",
  port: 5432,
};

const dbpool = new Pool(postgresOptions);

export default dbpool;