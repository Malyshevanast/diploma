const path = require('path');
const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./routes');
const corsConfig = require('./utilities/corsConfig');
require('dotenv').config();

const server = express();
const PORT = process.env.PORT || 8080;

// Function to serve all static files
// inside public directory.
server.use(express.static('public'));
server.use('/images', express.static(path.join('public', 'data', 'uploads')));

server.use(corsConfig);
server.use(express.json());
server.use('/api/v1', apiRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database is connected');
  } catch (error) {
    console.error(new Error(error));
    process.exit(1);
  }
})();

server.listen(PORT, () => {
  console.log(`Started on http://localhost:${PORT}`);
});
