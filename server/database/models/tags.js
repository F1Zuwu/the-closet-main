module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    "tags",
    {
      tag_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tag_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Tags.associate = (models) => {
    Tags.belongsToMany(models.fits, {
      through: "FitTags",
      foreignKey: "tag_id",
    });
  };

  return Tags;
};
