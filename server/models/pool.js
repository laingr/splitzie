'use strict';

module.exports = (sequelize, DataTypes) => {
  var Pool = sequelize.define('Pool', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    workplaceId: DataTypes.STRING,
    adminId: DataTypes.STRING,
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    numInvited: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numAccepted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    numDeclined: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    budget: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    closeDate: DataTypes.DATE
  });

  Pool.associate = function(models) {
    Pool.belongsTo(models.User);
  };

  return Pool;
};

