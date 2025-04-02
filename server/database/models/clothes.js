const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Clothes = sequelize.define("Clothes", {
    item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  });

  Clothes.associate = (models) => {
    Clothes.hasMany(models.Fits, { foreignKey: "clothes_id" });
  };

  return Clothes;
};
