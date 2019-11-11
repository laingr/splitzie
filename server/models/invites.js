'use strict';

module.exports = (sequelize, DataTypes) => {
  var Invites = sequelize.define('Invites', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    recipient: {
      type: DataTypes.STRING,
      required: true
    },
    channelId: {
      type: DataTypes.STRING,
      required: true
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    closeDate: {
      type: DataTypes.DATE,
      required: true
    },
    budget: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    paid : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Invites.associate = function(models) {
    models.Invites.belongsTo(models.Pool);
    // models.Invites.belongsTo(models.User)
  };

  return Invites;
};

