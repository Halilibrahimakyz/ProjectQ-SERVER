const { commonTableColumns } = require('../helpers/database'); // Gerekli yolu ayarlayın

module.exports = (sequelize, DataTypes) => {
  const projectType = sequelize.define(
    'projectType',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'category',
      },
      ...commonTableColumns,
    },
    {
      tableName: 'project_types', // Veritabanındaki tablo ismi
      timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    }
  );

  return projectType;
};
