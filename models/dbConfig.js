const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:1626@localhost:5432/plannio"
);

sequelize
  .authenticate()
  .then(() => console.log("Yo B-)"))
  .catch(() => console.log("bah ?"));

module.exports = sequelize;
