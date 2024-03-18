const { commonTableColumns } = require('../helpers/database'); // Adjust the path as necessary

module.exports = (sequelize, DataTypes) => {
    const donorTransaction = sequelize.define(
      'donorTransaction',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'id',
        },
        donorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'donors', // 'donor' modeline referans verir
            key: 'id', // 'donor' modelindeki anahtar
          },
          field: 'donor_id',
        },
        projectId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'projects', // 'project' modeline referans verir, bu modelin tanımını siz yapmalısınız
            key: 'id', // 'project' modelindeki anahtar
          },
          field: 'project_id',
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2), // Miktar için ondalık tipi, örneğin 10000.99 gibi bir değeri destekler
          allowNull: false,
          field: 'amount',
        },
        statusId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'statuses', // 'status' modeline referans verir, bu modelin tanımını siz yapmalısınız
            key: 'id', // 'status' modelindeki anahtar
          },
          field: 'status_id',
        },
        ...commonTableColumns,
      },
      {
        tableName: 'donor_transactions', // Veritabanındaki tablo ismi
        timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
      }
    );
  
    return donorTransaction;
  };
  