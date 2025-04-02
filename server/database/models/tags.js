const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Tags = sequelize.define("Tags", {
    tag_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tag_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  });

  Tags.associate = (models) => {
    Tags.hasMany(models.Fits, { foreignKey: "tag_id" });
  };

  return Tags;
};
