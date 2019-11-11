'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    workplaceId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    channelId: DataTypes.STRING,
    poolsInvited: DataTypes.ARRAY(DataTypes.INTEGER),
    poolsAccepted: DataTypes.ARRAY(DataTypes.INTEGER),
    poolsCompleted: DataTypes.ARRAY(DataTypes.INTEGER)
  });

  User.associate = function(models) {
    models.User.hasMany(models.Pool);//,{foreignKey: 'userUuid', as:'Pools'};
    // User.hasMany(models.Invites) //{foreignKey: 'userUuid', as:'Invites'}
  };

  return User;
};