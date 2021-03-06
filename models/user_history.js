'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_History extends Model {
    
    static associate(models) {
      
      User_History.belongsTo(models.User, {
        foreignKey: 'user_uuid',
        as: 'user'
      })
    }
  }
  User_History.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    win: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0
    },
    lose: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0
    },
    draw: {
      type: DataTypes.INTEGER(32),
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User_History',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true
  });
  return User_History;
};