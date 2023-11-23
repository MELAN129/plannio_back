const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:1626@localhost:5432/plannio"
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to the DB"))
  .catch(() => console.log("Error while connecting to the DB"));

module.exports = sequelize;
