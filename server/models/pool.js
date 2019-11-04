'use strict';

module.exports = (sequelize, DataTypes) => {
  var Pool = sequelize.define('Pool', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    workplaceId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN,
    numInvited: DataTypes.INTEGER,
    numAccepted: DataTypes.INTEGER,
    numDeclined: DataTypes.INTEGER,
    budget: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    closeDate: DataTypes.DATE
  });

  Pool.associate = function(models) {
    Pool.belongsTo(models.User);
  };

  return Pool;
};

