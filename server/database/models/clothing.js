const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Clothing = sequelize.define("clothing", {
    clothing_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

  },{
    freezeTableName: true, 
    timestamps: false
  });

  Clothing.associate = (models) => {
    Clothing.hasMany(models.Fits, { foreignKey: "clothing_id" });
  };

  return Clothing;
};
