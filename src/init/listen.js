module.exports = async (app, http) => {

  const {PORT, NODE_ENV} = process.env;

  http.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });

  process.on('uncaughtException', function (err) {
    console.log(err);
  });
};
