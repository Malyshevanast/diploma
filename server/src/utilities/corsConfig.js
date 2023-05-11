const cors = require('cors');

// ? Read more about options for cors
const corsOptions = {
  // origin: 'https://localhost:90',
  'Access-Control-Allow-Origin': '*',
  // origin: '*',
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;
