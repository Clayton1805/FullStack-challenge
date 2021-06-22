require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./databases/connectionMongo');

const app = express();

const {
  LoginController,
  RegisterController,
} = require('./controllers');

const { SERVER_ERROR } = require('./utils/allStatusCode');

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(express.json());

app.use('/login', LoginController);

app.use('/register', RegisterController);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error({ error: err.message });
  res.status(SERVER_ERROR).json({ error: 'erro interno' });
});

app.listen(PORT, () => console.log('running port', PORT));
