'use strict';

module.exports = (sequelize, DataTypes) => {
  var Invites = sequelize.define('Invites', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    },
    recipient: {
      type: DataTypes.STRING,
      required: true
    },
    reminders: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    }
  });

  Invites.associate = function(models) {
    Invites.belongsTo(models.Pool);
  };

  return Invites;
};

