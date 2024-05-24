const { commonTableColumns } = require('./commonTableColumns'); 

module.exports = (sequelize, DataTypes) => {
  const studentTransaction = sequelize.define(
    'studentTransaction',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students', // 'student' modeline referans verir
          key: 'id', // 'student' modelindeki anahtar
        },
        field: 'student_id',
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'projects', // 'project' modeline referans verir
          key: 'id', // 'project' modelindeki anahtar
        },
        field: 'project_id',
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'amount',
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'statuses', // 'status' modeline referans verir
          key: 'id', // 'status' modelindeki anahtar
        },
        field: 'status_id',
      },
      ...commonTableColumns,
    },
    {
      tableName: 'student_transaction',
      timestamps: false,
    }
  );

  return studentTransaction;
};
