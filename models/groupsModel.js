const { DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");

const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  head: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Group;
