const { DataTypes } = require("sequelize");
const sequelize = require("./dbConfig");
const User = require("./usersModel");

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
});

User.belongsToMany(Group, { through: "User_Groups" });
Group.belongsToMany(User, { through: "User_Groups" });

Group.sync();
module.exports = Group;
