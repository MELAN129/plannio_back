const { DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

module.exports = User;
