'use strict';

module.exports = (sequelize, DataTypes) => {
  var Invites = sequelize.define('Invites', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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
    reminders: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    closeDate: {
      type: DataTypes.DATE,
      required: true
    },
    budget: DataTypes.INTEGER,
    desc: DataTypes.STRING
  });

  Invites.associate = function(models) {
    Invites.belongsTo(models.Pool);
  };

  return Invites;
};

