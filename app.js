const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
require('dotenv').config();

const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const rateLimiter = require('./utils/rate-limiter');
const corsHandler = require('./middlewares/cors-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongodbURL, mongodbOptions } = require('./utils/mongodb-config');
const messages = require('./utils/messages');

const { NODE_ENV, PORT = 3000, DB_URL } = process.env;

mongoose
  .connect(NODE_ENV === 'production' ? DB_URL : mongodbURL, mongodbOptions)
  .then(() => {
    console.log(messages.databaseUp);
  });

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHandler);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(messages.serverUp(PORT));
});
