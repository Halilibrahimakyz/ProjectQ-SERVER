const { commonTableColumns } = require('./commonTableColumns'); 

module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    'student',
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
            model: 'users',
            key: 'id',
          },
        field: 'user_id',
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'school',
      },
      class: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'class',
      },
      gpa: {
        type: DataTypes.FLOAT,
        allowNull: true,
        field: 'gpa',
      },
      verification: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'verification',
      },
      goals: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'goals',
      },
      ...commonTableColumns,
    },
    {
      tableName: 'students',
      timestamps: false,
    }
  );

  return student;
};
