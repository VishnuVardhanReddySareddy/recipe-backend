// models/Collection.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Collection = sequelize.define("Collection", {
  collectionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
});

module.exports = Collection;
