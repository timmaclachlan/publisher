import express from "express";
import cors from "cors";
import 'dotenv/config';

const bodyParser = require('body-parser');
const serverless = require('serverless-http');

const authorRoutes = require('./routes/authors');
//const bookRoutes = require('./routes/books');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

const app = express();
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(bodyParser.json({ type: 'application/json' }));
app.use("/authors", authorRoutes);
//app.use("/books", bookRoutes);
//app.use(cors);
app.use('/.netlify/functions/server', authorRoutes);

//https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
 //https://node-postgres.com/features/queries
 //https://blog.logrocket.com/free-services-deploy-node-js-app/
 // https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/
 // https://node-postgres.com/features/pooling

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })

module.exports = app;
module.exports.handler = serverless(app);

