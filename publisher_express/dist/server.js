"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyParser = require('body-parser');

var serverless = require('serverless-http');

var authorRoutes = require('./routes/authors'); //const bookRoutes = require('./routes/books');


var app = (0, _express.default)();
app.use(_express.default.json()); // parses incoming requests with JSON payloads

app.use(bodyParser.json({
  type: 'application/json'
}));
app.use("/authors", authorRoutes); //app.use("/books", bookRoutes);
//app.use(cors);

app.use('/.netlify/functions/server', authorRoutes); //https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/
//https://node-postgres.com/features/queries
//https://blog.logrocket.com/free-services-deploy-node-js-app/
// https://www.netlify.com/blog/2018/09/13/how-to-run-express.js-apps-with-netlify-functions/
// https://node-postgres.com/features/pooling

module.exports = app;
module.exports.handler = serverless(app);