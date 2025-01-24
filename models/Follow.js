// models/Follow.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Follow = sequelize.define("Follow", {
  followId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
});

module.exports = Follow;
