module.exports = (sequelize, DataTypes) => {
  const Accessory = sequelize.define("accessory", {
    accessory_id: {
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

  Accessory.associate = (models) => {
    Accessory.belongsToMany(models.fits, {
      through: "FitAccessories",
      foreignKey: "accessory_id",
    });
  };

  return Accessory;
};
