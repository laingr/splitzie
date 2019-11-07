'use strict';

module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define('Log', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      type: DataTypes.STRING,
      subtype: DataTypes.STRING,
      text: DataTypes.STRING,
      ts: DataTypes.DATE,
      username: DataTypes.STRING,
      bot_id: DataTypes.STRING,
      channel: DataTypes.STRING,
      event_ts: DataTypes.DATE,
      channel_type: DataTypes.STRING,
      in_reply_to: DataTypes.STRING,
      in_reply_text: DataTypes.STRING
    });
  return Log;
};

