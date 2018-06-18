'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log('__SERVER UP__', process.env.PORT);
});

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/index.html`);
});

app.use(express.static(`${__dirname}/build`));
