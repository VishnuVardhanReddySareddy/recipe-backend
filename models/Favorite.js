// models/Favorite.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Favorite = sequelize.define("Favorite", {
  favoriteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Recipes",
      key: "recipeId",
    },
  },
});

module.exports = Favorite;
