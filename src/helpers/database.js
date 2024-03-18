const { DataTypes } = require('sequelize');

const commonTableColumns = {
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'creator_id',
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'created_date',
    defaultValue: Date.now,
  },
  modifierId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'modifier_id',
  },
  modifiedDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'modified_date',
    defaultValue: Date.now,
  },
};

module.exports = { commonTableColumns };
