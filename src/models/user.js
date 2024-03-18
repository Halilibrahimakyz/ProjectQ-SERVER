const { commonTableColumns } = require('../helpers/database'); // Yolunuzu doğrulayın

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'name',
      },
      surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'surname',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'profile_photo',
      },
      usertype: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'usertype',
      },
      tcNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        field: 'tc_number',
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number',
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'gender',
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: 'city',
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'age',
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'bio',
      },
      identificate: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'identificate',
      },
      ...commonTableColumns,
    },
    {
      tableName: 'users',
      timestamps: false
    }
  );

  return user;
};
