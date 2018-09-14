const Sequelize = require('sequelize');

let database;

const { DATABASE_URL } = process.env 


if (DATABASE_URL) { // for production
  database = new Sequelize(DATABASE_URL, {
    logging: false
  });
} else { // for development
  database = new Sequelize({
    database: 'shoex',
    password: process.env.PG_PASSWORD,
    dialect: 'postgres'
  });
}

const Shoe = database.define('shoe', {
  brand: Sequelize.STRING,
  style: Sequelize.STRING,
  size: Sequelize.STRING,
  upc: Sequelize.STRING
})

module.exports = {
  database,
  Shoe
}