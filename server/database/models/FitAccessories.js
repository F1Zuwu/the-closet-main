module.exports = (sequelize, DataTypes) => {
    return sequelize.define("FitAccessories", {
      fit_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      accessory_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  };
  