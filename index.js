const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express(); // ← this must be declared before using 'app'
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes/users'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
