const app = require('./express/server');

const DEFAULT_PORT = 8000;

const port = process.env.PORT || DEFAULT_PORT;

 app.listen(port, () => {
   console.log(`Local app listening on port ${port}`);
 })

