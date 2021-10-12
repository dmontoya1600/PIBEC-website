'use strict';
module.exports = (sequelize, DataTypes) => {
  const Embedded = sequelize.define('Embedded', {
    location: DataTypes.STRING,
    position: DataTypes.INTEGER,
    code: DataTypes.STRING
  }, {});
  Embedded.associate = function(models) {
    // associations can be defined here
  };
  return Embedded;
};