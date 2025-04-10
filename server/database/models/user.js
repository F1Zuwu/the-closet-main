module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.fits, { foreignKey: "user_id" });
  };

  return User;
};
