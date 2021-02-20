require('dotenv').config();

const port = require('./config/app').server.port || 3030;

require('./app').listen(port, () => {
  console.log(`Server is running at http:/localhost:${port}`);
});
