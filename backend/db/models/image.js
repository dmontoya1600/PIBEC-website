'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    location: DataTypes.STRING,
    comment: DataTypes.STRING,
    subLocation: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    arrayId: {
       type:  DataTypes.INTEGER,
       references: {
         model: 'Array'
       }
    }

  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Array, { foreignKey: 'arrayId' })
  };
  return Image;
};
