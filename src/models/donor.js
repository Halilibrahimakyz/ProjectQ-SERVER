const { commonTableColumns } = require('../helpers/database'); // Gerekli yolu ayarlayın

module.exports = (sequelize, DataTypes) => {
  const donor = sequelize.define(
    'donor',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // 'User' modeline referans verir
          key: 'id', // 'User' modelindeki anahtar
        },
        field: 'user_id',
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true, // Meslek zorunlu olmayabilir
        field: 'occupation',
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true, // Şirket ismi zorunlu olmayabilir
        field: 'company',
      },
      behalfCompany: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Birey adına mı yoksa şirket adına mı yapıldığını belirtir
        field: 'behalf_company',
      },
      wantsAnonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Bağışın anonim olarak yapılıp yapılmadığını belirtir
        field: 'wants_anoymous',
      },
      ...commonTableColumns,
    },
    {
      tableName: 'donors', // Veritabanındaki tablo ismi
      timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırak
    }
  );

  return donor;
};
