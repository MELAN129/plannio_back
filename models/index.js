const sequelize = require("./dbConfig");
const User = require("./usersModel");
const Group = require("./groupsModel");
const Program = require("./programModel");

const User_Groups = sequelize.define("User_Groups", {}, { timestamps: false });
User.belongsToMany(Group, { through: User_Groups });
Group.belongsToMany(User, { through: User_Groups });

User.sync();
Group.sync();
Program.sync();
User_Groups.sync();

module.exports = { User, Group, User_Groups, Program };
