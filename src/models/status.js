const { commonTableColumns } = require('./commonTableColumns'); 

module.exports = (sequelize, DataTypes) => {
    const status = sequelize.define(
      'status',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'id',
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          field: 'status',
        },
        ...commonTableColumns,
      },
      {
        tableName: 'statuses',
        timestamps: false,
      }
    );
  
    return status;
  };
  