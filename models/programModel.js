const { DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");

const Program = sequelize.define("Program", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // recurrence: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  fields: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Program;
