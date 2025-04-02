const cors = require('cors');

const corsOptions = {
    origin: ['https://seivitest.vocoprojektid.ee', 'https://seivi.vocoprojektid.ee', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);