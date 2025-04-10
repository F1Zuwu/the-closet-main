module.exports = (sequelize, DataTypes) => {
    const FitClothing = sequelize.define("FitClothing", {
      fit_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      clothing_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    return FitClothing;
  };
  