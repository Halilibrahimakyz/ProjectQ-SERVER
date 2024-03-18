const { commonTableColumns } = require('../helpers/database'); // Adjust the path as necessary

module.exports = (sequelize, DataTypes) => {
  const newTable = sequelize.define(
    'new_table',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      name: {
        type: DataTypes.STRING(100),
        field: 'name',
      },
      ...commonTableColumns,
    },
    {tableName: 'tbl_new_table', timestamps: false}
  );

  return newTable;
};
