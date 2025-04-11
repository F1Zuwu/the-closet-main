module.exports = (sequelize, DataTypes) => {
  const Fits = sequelize.define("fits", {
    fit_id: {
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });

  Fits.associate = (models) => {
    Fits.belongsToMany(models.clothing, {
      through: "FitClothing",
      foreignKey: "fit_id",
      otherKey: "clothing_id",
    });
    
    Fits.belongsToMany(models.tags, {
      through: "FitTags",
      foreignKey: "fit_id",
      otherKey: "tag_id",
    });
    
    Fits.belongsToMany(models.accessory, {
      through: "FitAccessories",
      foreignKey: "fit_id",
      otherKey: "accessory_id",
    });

    Fits.belongsTo(models.users, {
      foreignKey: "user_id",
    });
    
  };

  return Fits;
};
