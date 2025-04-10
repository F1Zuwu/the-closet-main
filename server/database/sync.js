require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000
    }
  });

const FitAccessories = require('./models/FitAccessories')(sequelize, Sequelize.DataTypes);
const FitClothing = require('./models/FitClothing')(sequelize, Sequelize.DataTypes);
const FitTags = require('./models/FitTags')(sequelize, Sequelize.DataTypes);
const clothing = require('./models/clothing')(sequelize, Sequelize.DataTypes);
const fits = require('./models/fits')(sequelize, Sequelize.DataTypes);
const user = require('./models/user')(sequelize, Sequelize.DataTypes);
const tags = require('./models/tags')(sequelize, Sequelize.DataTypes);
const accessories = require('./models/accessories')(sequelize, Sequelize.DataTypes);

sequelize.sync({ force: true }).then(() => {
  console.log('Tables created!');
  process.exit();
});
