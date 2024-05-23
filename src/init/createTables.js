const { sequelize } = require('./database');

const models = ['newTable'];

console.log(models);
models.forEach(async (model) => {
  console.log("buras", `./models/${model}.js`);
  const eachModule = require(`../models/${model}.js`).default;
  await eachModule.sync({ alter: true });

//  Important
//   try {
//     // ------------------------------- TG_UPD_DEL_<TABLE_NAME>  ------------------- TABLE_NAME ---------------------------------------------------------
//     await sequelize.query(
//       'CREATE TRIGGER TG_UPD_DEL_' +
//       eachModule.tableName +
//       ' AFTER update or DELETE  ON  ' +
//       eachModule.tableName +
//       '  FOR EACH ROW  EXECUTE PROCEDURE procedure_name_db_log();'
//     );
//   } catch (error) { }
});

// service();
