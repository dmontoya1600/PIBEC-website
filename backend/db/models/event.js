'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    dayOfYear: DataTypes.NUMERIC,
    date: DataTypes.DATE,
    timeInMS: DataTypes.NUMERIC,
    timeOfEvent: DataTypes.STRING,
    weekday: DataTypes.NUMERIC,
    month: DataTypes.NUMERIC,
    dayOfMonth: DataTypes.NUMERIC
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};