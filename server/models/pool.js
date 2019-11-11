'use strict';

module.exports = (sequelize, DataTypes) => {
  var Pool = sequelize.define('Pool', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    workplaceId: {
      type: DataTypes.STRING,
      required: true
    },
    adminId: {
      type: DataTypes.STRING,
      required: true
    },
    adminChannel: {
      type: DataTypes.STRING,
      required: true
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    recapSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    invited: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    accepted: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    declined: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    budget: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    closeDate: DataTypes.DATE
    });

  Pool.associate = function(models) {
    Pool.belongsTo(models.User)
    };
  Pool.associate = function(models) {
    models.Pool.hasMany(models.Invites);
  };

  return Pool;
};

