const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const databaseConfig = require('./config/databaseConfig.js');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(databaseConfig.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
