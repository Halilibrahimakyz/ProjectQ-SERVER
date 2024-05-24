const { commonTableColumns } = require('./commonTableColumns'); // Gerekiyorsa yolunu düzenleyin

module.exports = (sequelize, DataTypes) => {
    const project = sequelize.define(
      'project',
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
            model: 'students',
            key: 'id',
          },
          field: 'student_id',
        },
        title: {
          type: DataTypes.STRING,
          allowNull: true,
          field: 'title',
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: 'description',
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'start_date',
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: 'end_date',
        },
        goalAmount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          field: 'goal_amount',
        },
        currentAmount: {
          type: DataTypes.FLOAT,
          allowNull: true,
          field: 'current_amount',
        },
        projectTypesId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'project_types', // 'User' modeline referans verir
            key: 'id', // 'User' modelindeki anahtar
          },
          field: 'project_types_id',
        },
        ...commonTableColumns,
      },
      {
        tableName: 'projects',
        timestamps: false, // Adjust based on whether you use Sequelize timestamps
      }
    );
  
    return project;
  };
  