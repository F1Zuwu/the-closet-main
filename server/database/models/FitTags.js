module.exports = (sequelize, DataTypes) => {
    const FitTags = sequelize.define("FitTags", {
      fit_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      tag_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    });
  
    return FitTags;
  };
  