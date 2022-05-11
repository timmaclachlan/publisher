const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

router.post('/authors', (req, res) => {
  res.json({ realName: 'hello', penName: 'goodbye' });
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


module.exports = app;
module.exports.handler = serverless(app);
