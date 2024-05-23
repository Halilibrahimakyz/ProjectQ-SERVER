const cors = require('cors');

module.exports = async (app) => {
  const corsOptions = {
    // origin: 'http://example.com', // Sadece http://example.com'dan gelen isteklere izin ver
    // optionsSuccessStatus: 200 // Bazı tarayıcılarda 204 yerine 200 döndürmek için
  };

  app.use(cors(corsOptions));
}