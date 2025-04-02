const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Fits = sequelize.define("Fits", {
    fit_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    clothes_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    accessory_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  });

  Fits.associate = (models) => {
    Fits.belongsTo(models.Clothes, { foreignKey: "clothes_id" });
    Fits.belongsTo(models.Tags, { foreignKey: "tag_id" });
  };

  return Fits;
};
