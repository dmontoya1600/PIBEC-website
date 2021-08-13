'use strict';
module.exports = (sequelize, DataTypes) => {
  const Array = sequelize.define('Array', {
    location: DataTypes.STRING
  }, {});
  Array.associate = function(models) {
   Array.hasMany(models.Image, { foreignKey: 'arrayId'})
  };
  return Array;
};
