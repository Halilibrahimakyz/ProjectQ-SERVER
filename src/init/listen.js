module.exports = async (app, http) => {

  const {PORT, NODE_ENV} = process.env;

  http.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m',`🚀 Server running in ${NODE_ENV} mode on port ${PORT} Beam me up, Scotty! 🛠️`);
  });

  process.on('uncaughtException', function (err) {
    console.log(err);
  });
};
